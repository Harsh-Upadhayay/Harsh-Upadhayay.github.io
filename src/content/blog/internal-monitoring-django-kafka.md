---
title: "Reducing MTTD from 30 Minutes to 1 Minute: Building an Internal Monitoring Tool with Django and Kafka"
slug: internal-monitoring-django-kafka
tags: [Django, Apache Kafka, Observability, Backend]
date: "February 12, 2026"
readTime: "7 min read"
summary: "How I built PoGo, an internal monitoring platform for a distributed scraping fleet, starting from a simple Django app, upgrading to Kafka for scale, and adding anomaly-detection alerts that transformed incident response."
---

## The Problem

At SMS DataTech we run 20+ production servers with 40+ concurrent Scrapy spiders delivering critical datasets to clients like Sony. Originally there was no centralised logging. If a spider got blocked or crashed, we found out one of two ways: a developer manually SSH'd into the server to check, or the client emailed us about missing data.

Mean Time to Detect was over 30 minutes — often longer. I built PoGo to close that gap.

---

## Phase 1: Django + PostgreSQL Monolith

The first version was a lightweight Django web application.

I wrote a Scrapy extension that hooked into the engine's native signals — `spider_opened`, `spider_closed`, `item_scraped`, `spider_error`. At the end of every scrape, the spider POST'd a summary payload (items scraped, error count, runtime) to a Django REST endpoint. Django validated, normalised, and stored the stats in PostgreSQL.

This gave us the first centralised dashboard. Log verification time dropped from 3 hours to 5 minutes. Not bad for a few days of work.

---

## Phase 2: Scaling to Real-Time with Apache Kafka

As the scraping fleet expanded, the synchronous HTTP approach became a bottleneck. During high-density runs, 40 spiders were writing hundreds of metric events per second. Django web processes blocked, database connections exhausted, and monitoring metrics started dropping.

I introduced **Apache Kafka** as a high-throughput message broker:

```
+--------------------+                       +---------------------+
| Distributed Spiders | ---(Metrics Stream)--> |    Apache Kafka     |
| (Scrapy Extension) |                       | (Ingest & Buffer)   |
+--------------------+                       +---------------------+
                                                        |
                                                        v
                                             +---------------------+
                                             |  Python Consumers   |
                                             |  (Batch Process &   |
                                             |   Write to DB)      |
                                             +---------------------+
                                                        |
                                                        v
                                             +---------------------+
                                             | Django Dashboard    |
                                             +---------------------+
```

The Scrapy extension now publishes events to a Kafka topic (`scrapy-metrics`) asynchronously — no blocking, no waiting for the Django process. Kafka buffers the stream; Python consumers read in batches and bulk-write to PostgreSQL. Database transaction overhead dropped by roughly 80%.

The topology also gave us durability for free: if the Django web process went down, metrics weren't lost — they waited in Kafka until consumers came back up.

---

## Phase 3: Anomaly-Detection Alerts

Centralised metrics are only useful if they surface problems without requiring someone to look. I added an anomaly detection layer:

**Historical baseline**: For every spider, the system maintains a rolling 7-day average of expected item count and execution duration.

**Deviation detection**: When a spider closes, its result is compared to that baseline. If the item count is more than 2 standard deviations below average — e.g., scraping 50 items when the 7-day average is 5,000 — the anomaly engine flags it immediately.

**Instant alert**: An email and Slack notification fires with a direct link to the relevant log trace. Engineers see the failure the moment the container stops, not when the client reports it.

---

## Results

- **MTTD: 30 min → under 1 min.** Failures are caught the second a spider closes with anomalous output.
- **MTTR reduced by 30 min per incident.** Engineers no longer parse raw logs across 20 servers — PoGo shows the stack trace on a single screen.
- **Escaped defects: zero.** Every data quality issue is caught internally before the daily scheduled delivery to clients.
