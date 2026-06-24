---
title: "How I Cut AWS Costs by $1,000/Month Without Touching a Single Line of App Code"
slug: aws-cost-optimisation-real-world
tags: [AWS, FinOps, Aurora, ECS Spot, Savings Plans]
date: "June 15, 2026"
readTime: "8 min read"
summary: "A practical walkthrough of the three cost-reduction levers I pulled at SMS DataTech: Compute Savings Plans, ECS Fargate Spot with idempotent tasks, and tracking down a bloated 1.2 TB Aurora table that nobody knew existed."
---

## The Setup

At SMS DataTech we run AWS across multiple client scraping pipelines. Monthly billing was running higher than the architecture justified — not because of a bug or performance issue, but because three infrastructure decisions made at launch had never been revisited.

I audited each area over a few weeks. None of the fixes required touching application code.

---

## Lever 1: The 1.2 TB Aurora Table Nobody Knew Existed (Saving $500/month)

While reviewing RDS billing, I noticed our Aurora PostgreSQL instance for the Sony project was generating outsized storage charges. Querying actual table sizes confirmed the problem immediately:

```sql
SELECT
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS table_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS index_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
```

The offender: `web_scrape_logs_raw` — a legacy table that had been logging raw HTML responses from 14 scrapers since 2019. It had grown to **1.05 TB** completely unnoticed.

### The remediation

A simple `DELETE` wasn't an option. Deleting a terabyte in a single transaction would exhaust WAL, lock the table, and kill production. We also had a 7-year data-retention requirement, so we couldn't just drop the data.

I approached it in three steps:

1. **Archive first**: Exported the full Aurora snapshot to **S3 Glacier Deep Archive** before touching anything. At $0.00099/GB/month vs Aurora's $0.10/GB/month, this satisfies long-term retention at a fraction of the cost.

2. **Batched deletion**: A Python script ran over three days, deleting in batches of 1,000 rows with 250ms sleep intervals between rounds. Sony's daily scraper runs continued without interruption throughout.

3. **Vacuum**: Triggered a manual `VACUUM` to reclaim physical pages and reduce Aurora's storage high-water mark.

**Result**: 1.2 TB → 200 GB. Aurora costs cut by **$500/month**.

---

## Lever 2: Moving Celery Workers to ECS Fargate Spot (Saving $350/month)

Our Celery workers ran on standard ECS Fargate — flat-rate pricing, no interruptions. But scraping tasks are stateless and complete in seconds to minutes, which makes them strong candidates for **Fargate Spot** (up to 70% cheaper, reclaimed with a 2-minute warning).

The risk is data loss on interruption. I addressed this before switching a single container:

1. **Strict idempotency**: Every task was audited to ensure it could be retried without producing duplicate database writes or inconsistent state.
2. **`acks_late = True`**: Tasks are only acknowledged off the RabbitMQ queue after successful completion, not on receipt.
3. **EventBridge → Lambda drain handler**: When ECS sends a STOPPING event, a Lambda fires to stop the worker from accepting new tasks and lets the in-flight task finish before the 2-minute window closes.

```
+-------------------------------------------------------+
|                 AWS ECS Fargate Spot                  |
|                                                       |
|  [Celery Worker A]     [Celery Worker B] (Reclaimed!) |
|         |                      | (2-min Warning)      |
|         v                      v                      |
|  (Keeps Processing)     (Graceful Shutdown:           |
|                          re-queue unfinished tasks)   |
+-------------------------------------------------------+
```

**Result**: 80% of worker capacity shifted to Spot. Compute spend down **$350/month**.

---

## Lever 3: Purchasing Compute Savings Plans (Saving $150/month)

After the Spot migration, our remaining baseline was predictable: roughly four t3.medium equivalents running 24/7 for internal tooling, monitoring, and VPN. On-demand pricing for steady-state compute is simply the wrong pricing model.

I pulled 90 days of hourly spend from Cost Explorer, identified the consistent baseline, and committed to a 1-year **Compute Savings Plan** at $0.40/hour. Savings Plans apply automatically across EC2, ECS, and Lambda with no instance family or region restrictions.

**Result**: Base compute bill down 25%, saving **$150/month**.

---

## Closing

None of these fixes were glamorous. They were the result of actually reading the bill, understanding each service's pricing model, and being willing to spend a few days on careful infrastructure work rather than application features.

**$1,000/month recovered. $12,000/year. Zero lines of application code changed.**
