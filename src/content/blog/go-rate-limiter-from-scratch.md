---
title: "Writing a Go Rate Limiter from Scratch: Token Bucket, Fixed Window, and Redis Lua Scripts"
slug: go-rate-limiter-from-scratch
tags: [Go, Redis, System Design, Concurrency]
date: "March 05, 2026"
readTime: "9 min read"
summary: "A deep dive into building a pluggable rate limiter in Go — interface design, sync.Mutex vs channels debate, atomic Lua scripts for Redis, and benchmark results comparing the two backends."
---

## Background

Rate limiting looks simple until you try to make it correct under concurrent load with distributed state. I built this library as a deliberate exercise: design the interfaces first, write the tests, then implement — with the constraint that algorithms must be pure functions with no I/O or side effects, and the storage backend must be swappable without touching algorithm code.

The two backends: in-memory with `sync.Mutex` for single-instance services, and Redis-backed for distributed deployments.

---

## Core Architecture

The key design decision: algorithms and storage are completely decoupled. An algorithm implements `Decide(now, state) → (result, newState)` — a pure function with no database access or time calls. A `StateStore` handles `Get(key)` and `CompareAndSwap(key, version, newState)`. The middleware wires them together.

For clarity, here's a simplified view of the interface:

```go
package ratelimiter

import "context"

type Limit struct {
    Rate   int64 // number of requests
    Period int64 // time window in seconds
}

type StateStore interface {
    Allow(ctx context.Context, key string, limit Limit) (bool, int64, error)
}
```

---

## Algorithm 1: Token Bucket (In-Memory with sync.Mutex)

Token Bucket allows bursts up to a maximum capacity and refills at a constant rate. Multiple goroutines will hit this concurrently, so bucket state needs mutex protection:

```go
type InMemoryBucket struct {
    mu         sync.Mutex
    tokens     float64
    lastRefill time.Time
}

func (b *InMemoryBucket) Allow(limit Limit) bool {
    b.mu.Lock()
    defer b.mu.Unlock()

    now := time.Now()
    elapsed := now.Sub(b.lastRefill).Seconds()
    b.lastRefill = now

    refillAmount := elapsed * (float64(limit.Rate) / float64(limit.Period))
    b.tokens = math.Min(float64(limit.Rate), b.tokens+refillAmount)

    if b.tokens >= 1 {
        b.tokens -= 1
        return true
    }
    return false
}
```

One subtlety: `lastRefill` is updated even if the request is denied, so the refill calculation stays correct on the next call. Only updating it on allowed requests is a common mistake.

---

## Algorithm 2: Distributed Fixed Window (Redis + Lua)

For a distributed system, in-memory state doesn't work — two instances can each permit up to the full limit independently, effectively doubling it. Redis centralises the state.

### The race condition

A naïve Read-Increment-Write approach breaks under concurrent load: two requests can both read count = 9, both decide they're within limit, and both proceed — violating the rate limit. The fix is atomicity.

### Lua scripts in Redis

Redis executes Lua scripts as a single atomic operation. No other client reads or writes between the script's GET and INCR:

```lua
local key     = KEYS[1]
local limit   = tonumber(ARGV[1])
local window  = tonumber(ARGV[2])

local current = redis.call('GET', key)

if current and tonumber(current) >= limit then
    return 0  -- denied
else
    local newVal = redis.call('INCR', key)
    if newVal == 1 then
        redis.call('EXPIRE', key, window)
    end
    return 1  -- allowed
end
```

The `EXPIRE` is set only on the first increment (`newVal == 1`). Setting it on every call would keep resetting the window — a subtle bug that lets a sustained burst run indefinitely.

---

## Benchmarks

```
go test -bench=. -benchmem
```

| Backend | ns/op | B/op | allocs/op |
| :--- | :--- | :--- | :--- |
| InMemoryStore | ~23 ns | 0 B | 0 |
| RedisStore (local) | ~1.1 ms | varies | varies |

The in-memory store is essentially free — 23 nanoseconds with zero allocations. The Redis store's cost is network round-trip latency, not algorithm overhead.

---

## When to Use Each

Use the in-memory store for high-throughput internal services where a single instance owns the limit state and extreme low latency matters. Use the Redis store for user-facing APIs distributed across multiple nodes where strict cross-instance correctness is required. The interface is identical — swapping backends is a one-line change at the callsite.
