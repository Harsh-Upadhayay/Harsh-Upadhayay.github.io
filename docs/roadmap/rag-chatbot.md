# RAG Chatbot — Design Doc (Planned / Nice-to-Have)

**Status:** Planned · deferred (nice-to-have)
**Owner:** Harsh Upadhayay
**Last updated:** 2026-06-24

A self-hosted, retrieval-augmented chatbot that answers questions about Harsh
(experience, projects, skills, blog posts) using a small local LLM served by the
existing homelab Ollama instance.

> **Non-negotiable design rule:** the chatbot is a *progressive enhancement*. The
> portfolio is statically hosted on GitHub Pages and must remain 100% functional
> with zero errors when the homelab backend is offline. If the backend is
> unavailable, the frontend silently hides the chat widget — no spinners, no
> error toasts, no console noise.

---

## 1. Goals & non-goals

**Goals**
- Answer factual questions about Harsh grounded *only* in his own content.
- Run fully self-hosted on the homelab; no third-party API, no data leaving the box.
- Zero hard dependency between the static site and the backend.
- Reuse existing infra: Ollama (already exposed), Traefik, Cloudflare Tunnel, and
  the in-house Go rate limiter.

**Non-goals**
- Not fine-tuning a model. Facts come from retrieval, not weights. (See §8.)
- Not a general-purpose assistant. Out-of-scope questions get "I can only answer
  questions about Harsh."
- Not a high-concurrency service. A single 6 GB GPU serves ~1 generation at a time.

---

## 2. Architecture overview

```
                          GitHub Pages (always up)
  [ Visitor ] ──────────► harshupadhayay.neovara.uk  (static React SPA)
                                   │
                                   │  (1) on mount: GET /health  (2s timeout)
                                   │      fail → widget never renders
                                   ▼
                          Cloudflare Tunnel + Traefik
                                   │
                                   ▼
                 ┌─────────────────────────────────────────┐
                 │  Homelab — RAG backend (Go)             │
                 │                                          │
                 │   POST /chat ──► rate limiter (in-house) │
                 │        │                                 │
                 │        ├─► embed query  ──┐              │
                 │        │                  ▼              │
                 │        │            vector index         │
                 │        │         (top-k retrieval)       │
                 │        │                  │              │
                 │        └─► build prompt ◄─┘              │
                 │                  │                       │
                 │                  ▼                       │
                 │            Ollama (3B model) ──► stream   │
                 └─────────────────────────────────────────┘
```

The backend is a **separate service on its own subdomain** (e.g.
`chat.harshupadhayay.neovara.uk` or `api.neovara.uk/chat`). It shares nothing with
the GitHub Pages deploy. The site can be rebuilt and redeployed without touching
the backend, and vice versa.

---

## 3. Frontend isolation (the important part)

The widget is a lazy-loaded, self-contained React component that defaults to
**invisible** and only appears if the backend proves itself reachable.

**Rules:**
1. **Runtime config, not build-time coupling.** Backend base URL comes from a
   single runtime constant (`VITE_CHAT_API_URL`). If unset/empty → widget never
   renders, full stop.
2. **Health-gated mount.** On first mount the widget does
   `fetch(`${base}/health`, { signal: AbortSignal.timeout(2000) })`. Any
   non-200, timeout, network error, or CORS failure → set `available = false` →
   render `null`. No retries that block UI, no visible failure state.
3. **Lazy load.** The widget is `React.lazy()`-imported so its JS isn't even in
   the critical path; a failed/absent backend costs the visitor nothing.
4. **No global state coupling.** The rest of the site never reads chatbot state.
   Deleting the widget entry point removes the feature cleanly.
5. **Graceful mid-session failure.** If the backend dies *during* a conversation,
   the in-flight request fails quietly and the widget can either disappear or show
   an inline "chat unavailable" message scoped to the widget only — never a global
   error boundary trip.

**Net effect:** homelab down → site is byte-identical to today, just without a
chat bubble. GitHub Pages guarantees the site stays up independently.

```tsx
// sketch — not final
const base = import.meta.env.VITE_CHAT_API_URL;
const ChatWidget = base ? lazy(() => import('./ChatWidget')) : null;

// inside ChatWidget: probe before showing anything
useEffect(() => {
  fetch(`${base}/health`, { signal: AbortSignal.timeout(2000) })
    .then(r => setAvailable(r.ok))
    .catch(() => setAvailable(false));
}, []);
if (!available) return null;
```

---

## 4. Backend (homelab) — endpoints still in dev

The backend is a small Go service (fits the existing stack and reuses the
in-house rate limiter). **Endpoints below are illustrative — they are still in
design and not built yet.**

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Liveness probe the frontend uses to decide whether to render the widget. Cheap, no model call. |
| `POST` | `/chat` | `{ message, history? }` → streamed answer (SSE / chunked). Runs the RAG pipeline. |

**Rate limiting:** handled by the in-house Go rate limiter
([go-rate-limiter blog](../../src/content/blog/go-rate-limiter-from-scratch.md)) —
likely the Redis fixed-window backend keyed by client IP for cross-restart
correctness, with a per-IP cap (e.g. N requests/min) plus a hard max input length
and max output tokens. Exact policy TBD once endpoints are built. **(Deferred —
mention only.)**

**Abuse hardening (to design later):** CORS locked to the portfolio origin,
max prompt length, output token cap, and a system-prompt guardrail against
injection ("ignore previous instructions" style attacks).

**Ollama:** already exposed on the homelab. The backend talks to it over HTTP —
`/api/embeddings` for vectors and `/api/chat` (or `/api/generate`) for streamed
generation. No new GPU service to stand up.

---

## 5. RAG pipeline

### 5.1 Content sources (already in this repo)
The corpus is small and lives entirely in the repo, so indexing is a build/offline
step:
- `src/content/blog/*.md` — 6 long-form posts (chunk by heading).
- `src/data/projects.ts`, `experience.ts`, `skills.ts`, `certifications.ts`,
  `education.ts`, `achievements.ts`, `personal.ts` — structured facts.
- `harsh-upadhayay-extended-resume-updated.yaml` — canonical resume.

Total corpus is on the order of a few thousand tokens → **dozens of chunks**, not
thousands. This smallness drives the retrieval recommendation in §6.

### 5.2 Indexing (offline)
1. Chunk content (blog posts by H2/H3; structured data one record per chunk).
2. Embed each chunk via Ollama embedding model (e.g. `nomic-embed-text` or
   `bge-small`, both fit alongside a 3B model in 6 GB).
3. Persist vectors + source metadata to a store (file/SQLite/vector DB — see §6).
4. Re-run on content change (a script, or wired into the existing build). Editing
   a markdown file and re-indexing is the entire "update the bot's knowledge" flow
   — no retraining.

### 5.3 Query time
1. Embed the user question.
2. Retrieve top-k chunks (k ≈ 3–5) via the chosen algorithm (§6).
3. Build a grounded prompt: system guardrail + retrieved context + question.
4. Stream the answer from Ollama back through the SSE endpoint.

### 5.4 Grounding guardrail (system prompt)
> "You are a helpful assistant that answers questions about Harsh Upadhayay using
> only the provided context. If the answer is not in the context, say you don't
> know. Do not invent facts."

This kills the vast majority of hallucination for a small model.

### 5.5 Model on 6 GB VRAM
Target a 4-bit/Q4 **3B instruct** model (Llama 3.2 3B, Qwen2.5 3B, or Phi-3.5-mini)
plus a small embedding model — both fit in 6 GB together. 7B Q4 is possible but
tight once KV cache for context is added; start at 3B since retrieval does the
heavy lifting and the model only has to summarize provided text.

---

## 6. Retrieval / matching — top 3 options (decide later)

The corpus is tiny, which makes the simplest option very attractive. Listed
best-fit-first with explicit trade-offs.

### Option A — Brute-force exact kNN (flat cosine over dense embeddings)
Store all chunk vectors in memory; on each query compute cosine similarity against
every chunk, sort, take top-k.
- **Pros:** trivial to implement; *exact* (zero recall loss); no extra infra or
  services; instant at this scale (dozens of vectors → microseconds); fewest
  moving parts to keep the "homelab can be down" story simple.
- **Cons:** O(N) per query — irrelevant for dozens of chunks, would matter only at
  100k+ vectors; no built-in persistence/metadata tooling (you write it).
- **Best when:** corpus stays small (this case). **Recommended default.**

### Option B — Approximate Nearest Neighbor (HNSW) via a vector DB
Use Qdrant / pgvector / Chroma with an HNSW graph index.
- **Pros:** sublinear queries; scales to millions of vectors; mature tooling,
  persistence, metadata filtering for free; a legitimate "real vector DB" homelab
  showpiece.
- **Cons:** another always-on service to run (RAM/ops, and it's another thing that
  can be "down"); approximate (small, tunable recall loss); clear overkill for a
  few dozen chunks.
- **Best when:** the corpus grows large, or you want the vector-DB experience on
  the resume.

### Option C — Hybrid lexical + dense, fused with Reciprocal Rank Fusion (RRF)
Run BM25 (keyword) and dense embedding search in parallel, merge with RRF.
- **Pros:** best retrieval *quality* — BM25 nails exact terms (cert names, "Kafka",
  "FSRS", "Traefik") that embeddings sometimes miss, while dense catches
  paraphrases; robust to any single retriever's weakness.
- **Cons:** most complex; maintain two indices; tune fusion. Heaviest of the three.
- **Best when:** answer quality is the priority and queries mix exact-term lookups
  with conceptual questions.

**Recommendation:** start with **A** (exact, dependency-light), and only move to
**C** if answer quality on exact-term queries disappoints. Reach for **B** only if
the corpus stops being tiny. Optionally a small cross-encoder reranker can sit on
top of any of the three later.

| | A: Flat kNN | B: HNSW vector DB | C: Hybrid + RRF |
| --- | --- | --- | --- |
| Implementation effort | Lowest | Medium | Highest |
| Extra infra | None | A DB service | Two indices |
| Exactness | Exact | Approximate | Exact (dense) + lexical |
| Scales to 100k+ | No | Yes | Yes |
| Exact-term recall | Embedding-limited | Embedding-limited | Strong (BM25) |
| Fit for this corpus | ★ Best | Overkill | Best quality |

---

## 7. Security & abuse considerations
- CORS restricted to the portfolio origin.
- Rate limit per IP via the in-house limiter; hard caps on input length and output
  tokens.
- System-prompt guardrail against prompt injection and out-of-scope use.
- No secrets in the frontend (the static bundle is public); the backend holds all
  config.
- Single shared 6 GB GPU → expect a queue under concurrent load; that's acceptable
  for portfolio traffic.

---

## 8. Why not fine-tune?
Fine-tuning teaches *style*, not *facts*, and the dataset (~6 posts + resume) is far
too small — it would overfit and degrade general competence (catastrophic
forgetting). Facts also change (new job, cert, project); RAG updates via editing a
markdown file and re-indexing, whereas fine-tuning would require retraining and
redeploying weights. RAG is the correct tool for a personal-knowledge Q&A bot.

---

## 9. Open questions / TBD
- Retrieval algorithm choice (§6) — deferred to the user.
- Exact rate-limit policy and backend endpoint contract (still in dev).
- Subdomain vs path routing for the backend.
- Whether to add a reranker.
- Conversation history handling (stateless single-turn vs short rolling window).

---

## 10. Rollout phases (when picked up)
1. Backend skeleton: Go service, `/health`, Ollama wiring, one chosen model.
2. Indexing script over repo content → vector store.
3. `/chat` endpoint: retrieval + grounded prompt + SSE streaming.
4. Rate limiting + CORS + guardrails.
5. Frontend `ChatWidget` with health-gated, lazy, isolated mount.
6. Deploy backend behind Traefik/Cloudflare Tunnel; verify site is unaffected when
   backend is stopped.
