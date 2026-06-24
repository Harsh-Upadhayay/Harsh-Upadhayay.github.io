---
title: "Building a Fault-Tolerant Async Pipeline with Celery, RabbitMQ, and ECS Fargate"
slug: celery-rabbitmq-ecs-fargate-pipeline
tags: [Python, Celery, RabbitMQ, AWS ECS, System Design]
date: "May 28, 2026"
readTime: "10 min read"
summary: "How I designed the task queue for an AI scraping platform: performance-tier routing, Dead Letter Queues, Spot interruption handling, and custom auto-scaling via Lambda + EventBridge."
---

## The Problem

When building Hawk AI at SMS DataTech, the workload profile was clear from day one: highly variable, stateless, and inherently failure-prone. A user triggers a scrape of 50,000 e-commerce pages at 2 PM — three hours later the system is idle. Target websites block requests mid-run. JS-rendered pages take 10× longer than static ones. HTML structures change without notice.

Standard request-response architectures collapse under these conditions. What the system needed was an async task queue with performance tiers, fault isolation, and dynamic compute that could scale to zero between jobs.

```
+---------------+      Publish      +------------+      Route      +-----------------------+
|  Django App   | ----------------> |  RabbitMQ  | --------------> |  Celery Task Queues   |
| (API/Trigger) |                   |  (Broker)  |                 | (High, Default, Low)  |
+---------------+                   +------------+                 +-----------------------+
                                                                               |
                                                                               v
                                                                   +-----------------------+
                                                                   |  ECS Fargate Workers  |
                                                                   | (Right-sized by tier) |
                                                                   +-----------------------+
```

---

## Design Pattern 1: Performance-Tier Routing

A static blog page loads in 100ms. An SPA with heavy JavaScript requires a headless browser and takes 5+ seconds. If both go into the same queue, slow Playwright tasks block fast static requests — classic head-of-line blocking.

I split Celery into three queues backed by RabbitMQ routing keys:

1. **`high_priority`**: Lightweight metadata fetches, schema validation, single-URL instant scrapes.
2. **`default`**: Standard multi-page scraping via HTTP (Requests/Scrapy).
3. **`browser_intensive`**: JS-rendered targets requiring Playwright.

```python
# celery.py config
CELERY_ROUTES = {
    'scraper.tasks.fetch_metadata':      {'queue': 'high_priority'},
    'scraper.tasks.scrape_static_page':  {'queue': 'default'},
    'scraper.tasks.scrape_dynamic_page': {'queue': 'browser_intensive'},
}
```

Each queue maps to a dedicated ECS task definition: 0.5vCPU/1GB for high-priority, 2vCPU/4GB for default, 4vCPU/8GB for browser-intensive. Right-sized containers mean lower per-task cost and no resource contention between tiers.

---

## Design Pattern 2: Fault Tolerance & Dead Letter Queues

Web scraping is fragile by nature. Cloudflare blocks, selectors change, sites go down. To prevent failed tasks from disappearing silently or clogging primary queues:

- **Exponential backoff retries**: Retry 1 after 10s, retry 2 after 40s, retry 3 after 160s — giving temporary rate limits time to clear.
- **DLQ fallback**: After 5 failures, tasks route to `scraping_dlq`.
- **Alert + replay**: A CloudWatch alarm fires when DLQ depth exceeds 10. Engineers inspect the failure payload, update the affected spider, and trigger a Celery replay to reprocess the saved tasks.

The DLQ means no client data is silently lost. Every failure is visible and replayable.

---

## Design Pattern 3: Queue-Depth Auto-Scaling

Standard ECS auto-scaling reacts to CPU and memory — lagging metrics for a task queue. An ECS cluster can sit at 10% CPU while 10,000 tasks wait in RabbitMQ.

I built a custom scaling engine using **AWS Lambda + EventBridge**:

1. An EventBridge rule triggers a Lambda every 60 seconds.
2. The Lambda queries the RabbitMQ HTTP API for `messages_ready` and `messages_unacknowledged` per queue.
3. Those counts are pushed to CloudWatch as custom metrics.
4. ECS scaling policies react to queue depth: scale out when depth exceeds 100 tasks per worker, scale in when it drops below 5.

This gives sub-minute scaling reactions tied directly to actual work volume, not CPU.

---

## Results

- **No lost tasks**: The DLQ captured every transient failure. Jobs were replayed after root-cause fixes — zero client data loss.
- **Right-sized compute**: Browser-intensive tasks run on 4vCPU/8GB containers; lightweight metadata tasks on 0.5vCPU/1GB. Mixing them previously meant all workers were over-provisioned.
- **High-priority tasks unblocked**: Metadata scrapes and schema validation consistently returned in under 1.2 seconds regardless of background queue depth.
