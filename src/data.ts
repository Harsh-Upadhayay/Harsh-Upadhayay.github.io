import { PersonalInfo, Certification, Experience, Project, Skills, Education, BlogPost } from './types';

export const personalInfo: PersonalInfo = {
  name: "Harsh Upadhayay",
  tagline: "AWS Certified Software Engineer · Backend · Cloud · Infrastructure",
  summary: "AWS Certified Software Engineer with 2+ years of professional experience taking projects from initial concept to production. Specialises in cloud architecture, distributed backend systems, and AI-powered data pipelines. Holds five AWS certifications (including both Professional-tier exams) and has hands-on experience managing enterprise-grade infrastructure on AWS. Currently based in Tokyo, Japan.",
  contact: {
    email: "harshupadhayay906@gmail.com",
    phone_india: "+91 7017680430",
    phone_japan: "+81 70-9221-5112"
  },
  social: {
    github: {
      handle: "Harsh-Upadhayay",
      url: "https://github.com/Harsh-Upadhayay"
    },
    linkedin: {
      handle: "harsh-upadhayay",
      url: "https://www.linkedin.com/in/harsh-upadhayay-/"
    },
    leetcode: {
      handle: "harshupadhayay906",
      url: "https://leetcode.com/harshupadhayay906/"
    },
    codeforces: {
      handle: "_harsh_upadhayay_",
      url: "https://codeforces.com/profile/_harsh_upadhayay_"
    },
    geeksforgeeks: {
      handle: "harshupadhayay906",
      url: "https://auth.geeksforgeeks.org/user/harshupadhayay906/articles"
    }
  }
};

export const certifications: Certification[] = [
  {
    name: "AWS Solutions Architect Professional",
    score: "86%",
    badge_url: "https://www.credly.com/badges/20a666d9-c97c-43a5-be3d-d73376798f9f/public_url",
    certificate_url: "https://harsh-upadhayay.github.io/portfolio_assets/aws-solutions-architect-professional.pdf"
  },
  {
    name: "AWS DevOps Professional",
    score: "86%",
    badge_url: "https://www.credly.com/badges/282db828-50e2-42df-967c-f4855bf0985b/public_url",
    certificate_url: "https://harsh-upadhayay.github.io/portfolio_assets/aws-devops-professional.pdf"
  },
  {
    name: "AWS Solutions Architect Associate",
    score: "90%",
    badge_url: "https://www.credly.com/badges/1008d490-3a2b-41bc-9289-d414faad167b/linked_in_profile",
    certificate_url: "https://harsh-upadhayay.github.io/portfolio_assets/aws-solutions-architect-associate.pdf"
  },
  {
    name: "AWS SysOps Administrator Associate",
    score: "88%",
    badge_url: "https://www.credly.com/badges/a2702ec7-96ce-4a5f-8ae4-10e52c3ad4a4/linked_in_profile",
    certificate_url: "https://harsh-upadhayay.github.io/portfolio_assets/aws-sysops-administrator.pdf"
  },
  {
    name: "AWS Developer Associate",
    score: "86%",
    badge_url: "https://www.credly.com/badges/d5559fc1-b9ff-4a13-b08e-73a993b8acf3/public_url",
    certificate_url: "https://harsh-upadhayay.github.io/portfolio_assets/aws-developer-associate.pdf"
  }
];

export const experiences: Experience[] = [
  {
    company: "SMS DataTech",
    location: "Tokyo, Japan",
    role: "Software Engineer (Promoted from Intern)",
    start: "July 2023",
    end: "Present",
    projects: [
      {
        name: "AI Scraping Platform — Hawk AI & Missuri",
        summary: "Greenfield AI-powered web scraping suite. Architected the core system and managed the entire cloud deployment from scratch.",
        team: "3 FTEs, 4 Interns, 1 PM",
        tech: ["AWS CDK", "ECS Fargate/Spot", "Lambda", "EventBridge", "RDS", "Python", "Django", "Celery", "RabbitMQ", "Redis", "LLMs", "Firecrawl API"],
        highlights: [
          "Designed a dual-engine scraper suite orchestrating dynamic URL extraction, crawling, semantic ranking, and LLM-driven schema generation.",
          "Built a resilient async orchestration layer with parallel task batching, automated retries, and Dead Letter Queues for fault tolerance.",
          "Managed all cloud infrastructure as code with AWS CDK; deployed containerised microservices in a secure, highly available VPC.",
          "Profiled Celery tasks into performance tiers and routed them to right-sized ECS task definitions via RabbitMQ, maximising resource efficiency.",
          "Cut compute costs by deploying Celery workers on ECS Fargate Spot instances with strict task idempotency.",
          "Built a custom auto-scaling solution for Fargate using AWS Lambda + EventBridge.",
          "Enforced security best practices: Secrets Manager for credentials, encrypted S3 for config, strict VPC security-group isolation.",
          "Mentored 4 interns through the implementation phase via continuous PR reviews."
        ]
      },
      {
        name: "AWS Cloud Administration & Optimisation",
        summary: "One of two primary AWS Administrators for the engineering team, driving continuous infrastructure optimisation.",
        team: "2 Administrators",
        tech: ["EC2", "S3", "CloudFront", "Aurora", "Glacier", "IAM", "Compute Savings Plans", "CloudWatch", "SQL", "Python"],
        highlights: [
          "Reduced overall AWS compute costs by $500/month by analysing contracts and purchasing Compute Savings Plans.",
          "Slashed Aurora RDS costs for the Sony project by 50% ($500/month) by identifying and remediating a bloated 1.2 TB table.",
          "Engineered a non-blocking, batched deletion script over 3 days, shrinking the active table from 1.2 TB to 200 GB with zero service disruption.",
          "Exported the full Aurora snapshot to S3 Glacier Deep Archive, satisfying data-retention requirements at minimal cost.",
          "Led incident response for live outages across CloudFront, S3, and EC2.",
          "Standardised ARM-based Graviton instances for new architectures to maximise price-performance."
        ]
      },
      {
        name: "PoGo Internal Monitoring Tool",
        summary: "Internal monitoring and alerting platform for a distributed web scraping infrastructure (20+ servers, 40+ concurrent spiders).",
        team: "2 Backend Developers",
        tech: ["Django", "Apache Kafka", "PostgreSQL"],
        highlights: [
          "Co-architected the initial system; built backend and database using Django to ingest and normalise Scrapy logs.",
          "Upgraded to an async metric collection pipeline with Apache Kafka for scalable throughput.",
          "Automated anomaly alerts vs 7-day historical averages, reducing MTTD from 30 min → 1 min.",
          "Eliminated all client-reported escaped defects by automating sample-data verification.",
          "Decreased MTTR by 30 min per incident via centralised collection stats and logs.",
          "Dropped code-update verification time from 30 min → 1 min through consolidated report generation.",
          "Built a server resource dashboard (CPU/RAM/Disk, 14-day history), cutting monitoring time from 3 hrs → 5 min."
        ]
      },
      {
        name: "Enterprise Data Extraction Pipeline — Sony Group",
        summary: "Full ownership of a legacy (2019) web scraping infrastructure delivering continuous analytics to Sony — 14 media and e-commerce targets.",
        team: "1 Lead Engineer, 1 Associate",
        tech: ["Python", "Scrapy", "Django", "Celery", "AWS S3"],
        highlights: [
          "Managed day-to-day operations and maintenance; ensured reliable daily/weekly delivery of normalised datasets.",
          "Rewrote 6 major scrapers from scratch as part of an incremental refactoring strategy.",
          "Achieved a 95% reduction in execution runtime for refactored modules through architectural simplification.",
          "Eliminated redundant Django/Celery/database steps by migrating normalisation logic into Scrapy pipelines.",
          "Onboarded and trained a new full-time engineer to take over project operations."
        ]
      },
      {
        name: "Client Data Extraction Project — Amazon",
        summary: "Maintained and expanded a production scraping pipeline for Amazon during the internship period.",
        team: "1 Intern, 1 FTE",
        tech: ["Python", "Scrapy"],
        highlights: [
          "Debugged broken scrapers and resolved client-reported data issues alongside a full-time engineer.",
          "Independently managed a major mid-project spec change, migrating pipelines to new source websites.",
          "Developed new Scrapy spiders from scratch to accommodate an additional required data source.",
          "Automated previously manual data-collection workflows, reducing manual overhead."
        ]
      }
    ]
  },
  {
    company: "OutScale",
    location: "Remote",
    role: "DSA Mentor",
    start: "May 2023",
    end: "Aug 2023",
    highlights: [
      "Mentored students on Data Structures and Algorithms through detailed code reviews and written feedback."
    ]
  }
];

export const projects: Project[] = [
  {
    name: "Rate Limiter Library (Go)",
    repo: "https://github.com/Harsh-Upadhayay/ratelimiter",
    status: "In Progress",
    tech: ["Go", "Redis", "Docker", "AWS CDK", "ECS Fargate", "ElastiCache", "OpenTelemetry", "CloudWatch", "GitHub Actions"],
    summary: "A production-grade, cloud-native Go rate limiter library implementing Token Bucket and Fixed Window algorithms backed by both in-memory (sync.Mutex) and Redis stores. Built with TDD, benchmarked with Go's native benchmark suite and k6 load testing, and deployed to AWS ECS Fargate.",
    highlights: [
      "Implemented multiple rate-limiting algorithms with clean Go interfaces; pluggable StateStore abstraction.",
      "Redis adapter uses atomic Lua scripts for correctness under concurrent load.",
      "Benchmarked algorithm trade-offs; k6 load tests against both MemoryStore and RedisStore.",
      "Infrastructure defined entirely in AWS CDK: VPC, ECS Fargate, Multi-AZ ElastiCache, ALB.",
      "GitHub Actions pipeline: lint → test → CDK deploy → k6 validate → CDK destroy (ephemeral, cost-zero at rest).",
      "OpenTelemetry instrumentation pushes algorithm metrics to Amazon CloudWatch."
    ]
  },
  {
    name: "Kiroku (Japanese Study App)",
    repo: "https://github.com/Harsh-Upadhayay/kiroku",
    status: "Active",
    tech: ["Go 1.22", "React 19", "TypeScript", "Vite", "Tailwind v4", "SQLite", "FSRS", "IndexedDB", "PWA", "Docker"],
    summary: "Full-stack offline-first Japanese study app for Hiragana/Katakana drills and imported Anki decks — live at https://kiroku.neovara.uk. Go backend + React 19 frontend; browser is the primary study runtime, server handles sync/auth/import.",
    highlights: [
      "Offline-first: all study data persisted in IndexedDB; full functionality without network; syncs when reconnected.",
      "FSRS scheduling (ts-fsrs) for Anki deck review — modern algorithm superseding SM-2.",
      "Anki .apkg import pipeline: parses ZIP archives containing SQLite databases and zstd-compressed media.",
      "Kana drills with timed speed sheets: CPM tracking, accuracy scoring, sound feedback, Leitner-box SRS model.",
      "Go 1.22 backend using standard net/http; SQLite via modernc.org/sqlite (no cgo); bcrypt; no ORM.",
      "PWA app shell caching via service worker — installable and functional after first load.",
      "Dual Docker images published to ghcr.io; deployed behind Traefik on homelab with Watchtower auto-updates.",
      "Zero third-party analytics; all data stays on user's device and self-hosted backend."
    ]
  },
  {
    name: "AI Job-Hunt Scraper",
    repo: "https://github.com/Harsh-Upadhayay/job-hunt",
    status: "Active",
    tech: ["Python", "Scrapy", "Django", "Celery", "LLMs", "AWS", "Docker", "Playwright"],
    summary: "AI-powered job board aggregator that scrapes postings from multiple tech job boards (including Japan-specific portals), uses LLMs to extract structured data and score fit against a target profile, and surfaces ranked results via a React frontend.",
    highlights: [
      "Multi-engine scraper suite targeting tech job boards across multiple regions.",
      "LLM-driven extraction layer for normalising heterogeneous job-posting schemas.",
      "Celery async task queue for parallel scraping with retry/DLQ logic.",
      "Actor-based config system for per-site scraping rules and rate limiting.",
      "Playwright integration for JS-rendered pages."
    ]
  },
  {
    name: "Homelab Server",
    repo: "https://github.com/Harsh-Upadhayay/homelab",
    status: "Active",
    tech: ["Docker", "Docker Compose", "Traefik v3", "Authelia", "Cloudflare Tunnels", "Prometheus", "Grafana", "Ollama", "Watchtower", "Linux"],
    summary: "Production-grade personal home server self-hosting 15+ services (Nextcloud, Immich, Jellyfin, Audiobookshelf, Ollama, Jenkins CI, VS Code Server, Homepage dashboard, Remote Desktop) — designed, built, and operated end-to-end with zero-trust access and full observability.",
    highlights: [
      "Zero-trust access via Cloudflare Tunnels — no open inbound firewall ports; all traffic egresses through Cloudflare with TLS at edge.",
      "Traefik v3 reverse proxy with automatic TLS via Cloudflare DNS-01 challenge; dynamic file provider for per-host ForwardAuth middleware.",
      "Authelia SSO with OIDC provider — single sign-on across all services with group-based access policies (admin/editor/viewer), per-host session cookies.",
      "Full observability: Prometheus + Grafana with cAdvisor (container), Node Exporter (host), NVIDIA DCGM Exporter (GPU) — OAuth login via Authelia OIDC.",
      "Watchtower for automated image pulls and zero-downtime container updates with health check gating.",
      "Security hardening: no-new-privileges on all containers, read-only filesystems where possible, scoped Docker network isolation.",
      "Single Docker Compose definition managing the full 15+ service stack via Makefile-driven workflow."
    ]
  },
  {
    name: "Genkimart",
    repo: "https://github.com/harsh324/genkimart",
    status: "Completed",
    tech: ["Python", "Django", "Django REST Framework", "Stripe API"],
    summary: "Complete backend for a CRUD e-commerce platform used by a local retailer, with Stripe API integration for secure payment processing.",
    highlights: [
      "Full REST API for product catalogue, cart, and order management.",
      "Stripe Checkout integration with webhook handling for payment lifecycle events."
    ]
  },
  {
    name: "BlueStar Multi-Service Website",
    repo: "https://github.com/Harsh-Upadhayay/BlueStar",
    status: "Completed",
    tech: ["Node.js", "Express", "Docker", "Docker Compose"],
    summary: "Client-commissioned multi-service website for BlueStar, a local provider of rental bikes, laundry, and food delivery — built and deployed for a real paying client.",
    highlights: [
      "User authentication, order management, and admin dashboard.",
      "Three distinct service verticals in a single Node.js monolith.",
      "Toast notifications, real-time order status, and admin alert system."
    ]
  },
  {
    name: "CipherVault",
    repo: "https://github.com/Harsh-Upadhayay/CipherVault",
    status: "Completed",
    tech: ["C++", "OOP", "Cryptography"],
    summary: "A suite of classical ciphers implemented in C++ using OOP principles, demonstrating foundational security and algorithm knowledge.",
    highlights: [
      "Caesar, Vigenère, Playfair, and Affine ciphers implemented as distinct classes behind a shared Cipher interface.",
      "Playfair implementation handles digraph substitution, padding rules, and duplicate-letter edge cases correctly.",
      "Built as a study of classical cryptography fundamentals before working with modern primitives."
    ]
  }
];

export const skills: Skills = {
  languages: {
    primary: ["Python", "Go", "SQL"],
    proficient: ["C", "C++", "JavaScript", "TypeScript", "HTML5/CSS3"]
  },
  frameworks_and_libraries: [
    "Django",
    "Django REST Framework",
    "FastAPI",
    "Scrapy",
    "Celery",
    "Pandas",
    "NumPy",
    "React",
    "Express",
    "Next.js"
  ],
  databases: [
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Amazon Aurora",
    "SQLite"
  ],
  message_queues: [
    "Apache Kafka",
    "RabbitMQ"
  ],
  cloud_and_devops: {
    aws: [
      "ECS Fargate",
      "EC2",
      "Lambda",
      "EventBridge",
      "RDS / Aurora",
      "S3 / Glacier",
      "CloudFront",
      "IAM",
      "Secrets Manager",
      "CloudWatch",
      "CDK (IaC)",
      "CloudFormation",
      "ELB / ASG",
      "ElastiCache",
      "Compute Savings Plans"
    ],
    containers: [
      "Docker",
      "Docker Compose"
    ],
    ci_cd: [
      "GitHub Actions",
      "Jenkins"
    ],
    other: [
      "Traefik",
      "Cloudflare Tunnels",
      "Linux Administration",
      "Git & GitHub Version Control",
      "Terraform"
    ]
  }
};

export const education: Education[] = [
  {
    institution: "Indian Institute of Information Technology (IIIT), Nagpur",
    location: "Nagpur, India",
    degree: "B.Tech in Computer Science and Engineering",
    score: "8.5 CGPA",
    graduated: "May 2024"
  },
  {
    institution: "Kendriya Vidyalaya O.N.G.C.",
    location: "Dehradun, India",
    degree: "Senior Secondary (Physics, Chemistry, Math) & High School",
    score: "Senior Secondary: 94.4% · High School: 10/10 CGPA",
    graduated: "March 2019"
  }
];

export const achievements: string[] = [
  "Solved 1000+ DSA problems across LeetCode and Codeforces.",
  "Achieved Codeforces Specialist rating (1415 peak).",
  "Published 5+ technical articles on GeeksforGeeks covering algorithms, data structures, and backend engineering.",
  "Coursera: Supervised Machine Learning — DeepLearning.AI / Stanford Online.",
  "Coursera: Advanced Learning Algorithms — DeepLearning.AI / Stanford Online."
];

export const blogPosts: BlogPost[] = [
  {
    title: "How I Cut AWS Costs by $1,000/Month Without Touching a Single Line of App Code",
    slug: "aws-cost-optimisation-real-world",
    tags: ["AWS", "FinOps", "Aurora", "ECS Spot", "Savings Plans"],
    date: "June 15, 2026",
    readTime: "8 min read",
    summary: "A practical walkthrough of the three cost-reduction levers I pulled at SMS DataTech: Compute Savings Plans, ECS Fargate Spot with idempotent tasks, and tracking down a bloated 1.2 TB Aurora table that nobody knew existed.",
    content: `## The Setup

At SMS DataTech we run AWS across multiple client scraping pipelines. Monthly billing was running higher than the architecture justified — not because of a bug or performance issue, but because three infrastructure decisions made at launch had never been revisited.

I audited each area over a few weeks. None of the fixes required touching application code.

---

## Lever 1: The 1.2 TB Aurora Table Nobody Knew Existed (Saving $500/month)

While reviewing RDS billing, I noticed our Aurora PostgreSQL instance for the Sony project was generating outsized storage charges. Querying actual table sizes confirmed the problem immediately:

\`\`\`sql
SELECT
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS table_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS index_size
FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC;
\`\`\`

The offender: \`web_scrape_logs_raw\` — a legacy table that had been logging raw HTML responses from 14 scrapers since 2019. It had grown to **1.05 TB** completely unnoticed.

### The remediation

A simple \`DELETE\` wasn't an option. Deleting a terabyte in a single transaction would exhaust WAL, lock the table, and kill production. We also had a 7-year data-retention requirement, so we couldn't just drop the data.

I approached it in three steps:

1. **Archive first**: Exported the full Aurora snapshot to **S3 Glacier Deep Archive** before touching anything. At $0.00099/GB/month vs Aurora's $0.10/GB/month, this satisfies long-term retention at a fraction of the cost.

2. **Batched deletion**: A Python script ran over three days, deleting in batches of 1,000 rows with 250ms sleep intervals between rounds. Sony's daily scraper runs continued without interruption throughout.

3. **Vacuum**: Triggered a manual \`VACUUM\` to reclaim physical pages and reduce Aurora's storage high-water mark.

**Result**: 1.2 TB → 200 GB. Aurora costs cut by **$500/month**.

---

## Lever 2: Moving Celery Workers to ECS Fargate Spot (Saving $350/month)

Our Celery workers ran on standard ECS Fargate — flat-rate pricing, no interruptions. But scraping tasks are stateless and complete in seconds to minutes, which makes them strong candidates for **Fargate Spot** (up to 70% cheaper, reclaimed with a 2-minute warning).

The risk is data loss on interruption. I addressed this before switching a single container:

1. **Strict idempotency**: Every task was audited to ensure it could be retried without producing duplicate database writes or inconsistent state.
2. **\`acks_late = True\`**: Tasks are only acknowledged off the RabbitMQ queue after successful completion, not on receipt.
3. **EventBridge → Lambda drain handler**: When ECS sends a STOPPING event, a Lambda fires to stop the worker from accepting new tasks and lets the in-flight task finish before the 2-minute window closes.

\`\`\`
+-------------------------------------------------------+
|                 AWS ECS Fargate Spot                  |
|                                                       |
|  [Celery Worker A]     [Celery Worker B] (Reclaimed!) |
|         |                      | (2-min Warning)      |
|         v                      v                      |
|  (Keeps Processing)     (Graceful Shutdown:           |
|                          re-queue unfinished tasks)   |
+-------------------------------------------------------+
\`\`\`

**Result**: 80% of worker capacity shifted to Spot. Compute spend down **$350/month**.

---

## Lever 3: Purchasing Compute Savings Plans (Saving $150/month)

After the Spot migration, our remaining baseline was predictable: roughly four t3.medium equivalents running 24/7 for internal tooling, monitoring, and VPN. On-demand pricing for steady-state compute is simply the wrong pricing model.

I pulled 90 days of hourly spend from Cost Explorer, identified the consistent baseline, and committed to a 1-year **Compute Savings Plan** at $0.40/hour. Savings Plans apply automatically across EC2, ECS, and Lambda with no instance family or region restrictions.

**Result**: Base compute bill down 25%, saving **$150/month**.

---

## Closing

These three levers are available to almost every AWS account running production workloads. None of them required new features or code changes — only reading the bill carefully and understanding the pricing model of each service in use.

**$1,000/month recovered. $12,000/year. Zero lines of application code touched.**`
  },
  {
    title: "Building a Fault-Tolerant Async Pipeline with Celery, RabbitMQ, and ECS Fargate",
    slug: "celery-rabbitmq-ecs-fargate-pipeline",
    tags: ["Python", "Celery", "RabbitMQ", "AWS ECS", "System Design"],
    date: "May 28, 2026",
    readTime: "10 min read",
    summary: "How I designed the task queue for an AI scraping platform: performance-tier routing, Dead Letter Queues, Spot interruption handling, and custom auto-scaling via Lambda + EventBridge.",
    content: `## The Problem

When building Hawk AI at SMS DataTech, the workload profile was clear from day one: highly variable, stateless, and inherently failure-prone. A user triggers a scrape of 50,000 e-commerce pages at 2 PM — three hours later the system is idle. Target websites block requests mid-run. JS-rendered pages take 10× longer than static ones. HTML structures change without notice.

Standard request-response architectures collapse under these conditions. What the system needed was an async task queue with performance tiers, fault isolation, and dynamic compute that could scale to zero between jobs.

\`\`\`
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
\`\`\`

---

## Design Pattern 1: Performance-Tier Routing

A static blog page loads in 100ms. An SPA with heavy JavaScript requires a headless browser and takes 5+ seconds. If both go into the same queue, slow Playwright tasks block fast static requests — classic head-of-line blocking.

I split Celery into three queues backed by RabbitMQ routing keys:

1. **\`high_priority\`**: Lightweight metadata fetches, schema validation, single-URL instant scrapes.
2. **\`default\`**: Standard multi-page scraping via HTTP (Requests/Scrapy).
3. **\`browser_intensive\`**: JS-rendered targets requiring Playwright.

\`\`\`python
# celery.py config
CELERY_ROUTES = {
    'scraper.tasks.fetch_metadata':     {'queue': 'high_priority'},
    'scraper.tasks.scrape_static_page': {'queue': 'default'},
    'scraper.tasks.scrape_dynamic_page':{'queue': 'browser_intensive'},
}
\`\`\`

Each queue maps to a dedicated ECS task definition: 0.5vCPU/1GB for high-priority, 2vCPU/4GB for default, 4vCPU/8GB for browser-intensive. Right-sized containers mean lower per-task cost and no resource contention between tiers.

---

## Design Pattern 2: Fault Tolerance & Dead Letter Queues

Web scraping is fragile by nature. Cloudflare blocks, selectors change, sites go down. To prevent failed tasks from disappearing silently or clogging primary queues:

- **Exponential backoff retries**: Retry 1 after 10s, retry 2 after 40s, retry 3 after 160s — giving temporary rate limits time to clear.
- **DLQ fallback**: After 5 failures, tasks route to \`scraping_dlq\`.
- **Alert + replay**: A CloudWatch alarm fires when DLQ depth exceeds 10. Engineers inspect the failure payload, update the affected spider, and trigger a Celery replay to reprocess the saved tasks.

The DLQ means no client data is silently lost. Every failure is visible and replayable.

---

## Design Pattern 3: Queue-Depth Auto-Scaling

Standard ECS auto-scaling reacts to CPU and memory — lagging metrics for a task queue. An ECS cluster can sit at 10% CPU while 10,000 tasks wait in RabbitMQ.

I built a custom scaling engine using **AWS Lambda + EventBridge**:

1. An EventBridge rule triggers a Lambda every 60 seconds.
2. The Lambda queries the RabbitMQ HTTP API for \`messages_ready\` and \`messages_unacknowledged\` per queue.
3. Those counts are pushed to CloudWatch as custom metrics.
4. ECS scaling policies react to queue depth: scale out when depth exceeds 100 tasks per worker, scale in when it drops below 5.

This gives sub-minute scaling reactions tied directly to actual work volume, not CPU.

---

## Results

- **No lost tasks**: The DLQ captured every transient failure. Jobs were replayed after root-cause fixes — zero client data loss.
- **Right-sized compute**: Browser-intensive tasks run on 4vCPU/8GB containers; lightweight metadata tasks on 0.5vCPU/1GB. Mixing them previously meant all workers were over-provisioned.
- **High-priority tasks unblocked**: Metadata scrapes and schema validation consistently returned in under 1.2 seconds regardless of background queue depth.`
  },
  {
    title: "5 AWS Certifications in One Year: What I Actually Learnt (and What the Exams Miss)",
    slug: "five-aws-certs-lessons",
    tags: ["AWS", "Certifications", "Career"],
    date: "April 10, 2026",
    readTime: "6 min read",
    summary: "Honest reflection on going from zero AWS certs to Associate × 3 + Professional × 2. Which study resources worked, how each cert changed how I think about architecture, and what exam prep doesn't teach you.",
    content: `## The Sequence

I passed all five certifications across roughly 14 months — starting toward the end of my B.Tech at IIIT Nagpur and continuing into my first year at SMS DataTech in Tokyo. The order wasn't random:

1. **AWS Solutions Architect Associate (SAA)** — 90%
2. **AWS SysOps Administrator Associate (SOA)** — 88%
3. **AWS Developer Associate (DVA)** — 86%
4. **AWS DevOps Engineer Professional (DOP)** — 86%
5. **AWS Solutions Architect Professional (SAP)** — 86%

SAA first because it gives the broadest map of the AWS ecosystem. SAP last because it's the hardest and by that point I was managing real infrastructure at work, which made the exam scenarios feel far less abstract.

---

## The Certification Map

| Certification | Focus Area | Difficulty | Production Value |
| :--- | :--- | :--- | :--- |
| **Solutions Architect Associate** | Broad AWS service overview, standard design patterns | 3/5 | Good foundation for vocabulary and mental models |
| **Developer Associate** | Serverless, DynamoDB, IAM, CI/CD | 3.5/5 | Highly practical for backend engineers |
| **SysOps Administrator** | CloudWatch, CloudFormation, networking — includes a hands-on lab | 4/5 | Strong for operational troubleshooting |
| **DevOps Professional** | Zero-downtime deployments, multi-account, complex pipelines | 4.5/5 | Directly applicable to building stable CI/CD at scale |
| **Solutions Architect Professional** | Complex integrations, hybrid cloud, migration, cost, security | 5/5 | The most demanding — forces architectural depth |

---

## What the Exams Actually Teach

The study process for the Professional-tier exams in particular forces you to internalise things that take most engineers years to learn through trial and error:

**Designing for failure as a default**: The exams drill multi-AZ redundancy, RDS failover, ALB health checks, and S3 replication until fault tolerance stops feeling like an extra and starts feeling like the baseline assumption.

**IAM fluency**: The security content is genuinely deep. Studying for these certs made me comfortable with cross-account role assumption, permission boundaries, and service control policies — skills I applied directly when structuring VPCs and access policies at work.

**Cost as a design constraint**: Every service choice gets examined through a cost lens. You learn when to choose S3 Standard vs. Glacier, DynamoDB vs. RDS, Reserved vs. On-Demand — and you start asking the cost question before the technical question.

---

## What the Exams Miss

**IaC in practice**: Exams test CloudFormation conceptually. Real infrastructure work means writing AWS CDK in Python or TypeScript, managing stack dependencies, and debugging synthesis errors — none of which the exams prepare you for.

**Legacy system reality**: Exam scenarios assume clean, well-documented source systems. They don't cover refactoring a scraping pipeline that's been accumulating technical debt since 2019, with live client deliveries that can't be interrupted.

**Third-party tooling**: AWS exam scenarios assume CodeCommit, CodePipeline, and CodeBuild. In practice most teams use GitHub, Jenkins, Datadog, or Prometheus — and you have to figure out the integration yourself.

---

## What Actually Worked for Studying

**Adrian Cantrill** for deep conceptual understanding — essential for SAP, where you need to understand *why* services behave as they do, not just what they are.

**Stephane Maarek** for focused, exam-targeted summaries and hands-on labs on common service patterns.

**Tutorials Dojo (Jon Bonso)** practice exams — harder than the real exams, with detailed explanations for every answer. Non-negotiable for the Professional tier.

One habit that stuck: for every service I studied, I built it in my Free Tier account or wrote a CDK stack to spin it up and tear it down. Reading about Aurora Multi-AZ is one thing; watching a failover happen in a live cluster is another.

---

## Retrospective

The certs gave me vocabulary, mental models, and early confidence to propose and defend infrastructure decisions. They didn't replace hands-on experience — they accelerated it. The real learning happened when the architecture I'd studied on paper was running in production at SMS DataTech and I had to fix what the exam scenarios hadn't covered.`
  },
  {
    title: "Writing a Go Rate Limiter from Scratch: Token Bucket, Fixed Window, and Redis Lua Scripts",
    slug: "go-rate-limiter-from-scratch",
    tags: ["Go", "Redis", "System Design", "Concurrency"],
    date: "March 05, 2026",
    readTime: "9 min read",
    summary: "A deep dive into building a pluggable rate limiter in Go — interface design, sync.Mutex vs channels debate, atomic Lua scripts for Redis, and benchmark results comparing the two backends.",
    content: `## Background

Rate limiting looks simple until you try to make it correct under concurrent load with distributed state. I built this library as a deliberate exercise: design the interfaces first, write the tests, then implement — with the constraint that algorithms must be pure functions with no I/O or side effects, and the storage backend must be swappable without touching algorithm code.

The two backends: in-memory with \`sync.Mutex\` for single-instance services, and Redis-backed for distributed deployments.

---

## Core Architecture

The key design decision: algorithms and storage are completely decoupled. An algorithm implements \`Decide(now, state) → (result, newState)\` — a pure function with no database access or time calls. A \`StateStore\` handles \`Get(key)\` and \`CompareAndSwap(key, version, newState)\`. The middleware wires them together.

For the blog post, here's a simplified view of the interface:

\`\`\`go
package ratelimiter

import "context"

type Limit struct {
    Rate   int64 // number of requests
    Period int64 // time window in seconds
}

type StateStore interface {
    Allow(ctx context.Context, key string, limit Limit) (bool, int64, error)
}
\`\`\`

---

## Algorithm 1: Token Bucket (In-Memory with sync.Mutex)

Token Bucket allows bursts up to a maximum capacity and refills at a constant rate. Multiple goroutines will hit this concurrently, so bucket state needs mutex protection:

\`\`\`go
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
\`\`\`

One subtlety: \`lastRefill\` is updated even if the request is denied, so the refill calculation stays correct on the next call. A common mistake is only updating it on allowed requests.

---

## Algorithm 2: Distributed Fixed Window (Redis + Lua)

For a distributed system, in-memory state doesn't work — two instances can each permit up to the full limit independently, effectively doubling it. Redis centralises the state.

### The race condition

A naïve Read-Increment-Write approach breaks under concurrent load: two requests can both read count = 9, both decide they're within limit, and both proceed — violating the rate limit. The fix is atomicity.

### Lua scripts in Redis

Redis executes Lua scripts as a single atomic operation. No other client reads or writes between the script's GET and INCR:

\`\`\`lua
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
\`\`\`

The \`EXPIRE\` is set only on the first increment (\`newVal == 1\`). Setting it on every call would keep resetting the window — a subtle bug that lets a sustained burst run indefinitely.

---

## Benchmarks

\`\`\`
go test -bench=. -benchmem
\`\`\`

| Backend | ns/op | B/op | allocs/op |
| :--- | :--- | :--- | :--- |
| InMemoryStore | ~23 ns | 0 B | 0 |
| RedisStore (local) | ~1.1 ms | varies | varies |

The in-memory store is essentially free — 23 nanoseconds with zero allocations. The Redis store's cost is network round-trip latency, not algorithm overhead.

---

## When to Use Each

Use the in-memory store for high-throughput internal services where a single instance owns the limit state and extreme low latency matters. Use the Redis store for user-facing APIs distributed across multiple nodes where strict cross-instance correctness is required. The interface is identical — swapping backends is a one-line change at the callsite.`
  },
  {
    title: "Homelab as a Learning Lab: Self-Hosting 15+ Services on a Single Machine",
    slug: "homelab-self-hosting-guide",
    tags: ["Homelab", "Docker", "Traefik", "Authelia", "Self-hosting"],
    date: "Jan 18, 2026",
    readTime: "5 min read",
    summary: "How I turned a spare machine into a personal cloud: Traefik as a reverse proxy, Authelia for SSO, Cloudflare Tunnels for zero-open-port access, and lessons learnt managing it like a mini production environment.",
    content: `## Why Self-Host

Cloud resources are convenient but they hide the infrastructure layer. After working with AWS professionally, I wanted to understand what's actually underneath — networking, reverse proxies, certificate management, container orchestration — on hardware I controlled and could break without consequences.

I turned a spare compact desktop into a homelab running 15+ services: Nextcloud for file sync, Immich for photo backup, Jellyfin for media, Audiobookshelf, Ollama for local LLMs, Jenkins CI, VS Code Server, a monitoring stack, and more.

---

## Architecture

\`\`\`
                                 Cloudflare Tunnel (Secure Egress)
  [ Public Internet ] --------------------------------------------------------+
                                                                              |
                                                                              v
+-----------------------------------------------------------------------------+
|  Local Homelab Server (Docker)                                              |
|                                                                             |
|  +--------------------+      Forward      +------------------------------+  |
|  |   Traefik v3       | ----------------> | Authelia (OIDC/SSO Guard)    |  |
|  |  (SSL & Routing)   |                   +------------------------------+  |
|  +--------------------+                                   |                 |
|            |                                              v (Authorised?)   |
|            +----------------------------------------------+                 |
|            |                                                                |
|            +-------------> [ Nextcloud ] (cloud.neovara.uk)                |
|            +-------------> [ Jenkins ]   (ci.neovara.uk)                   |
|            +-------------> [ Grafana ]   (metrics.neovara.uk)              |
+-----------------------------------------------------------------------------+
\`\`\`

---

## Core Design: Everything in Docker Compose

No services installed directly on the host. If a container misbehaves, I delete and recreate it. If the hardware fails, all 15+ services are back in minutes with \`docker compose up -d\`. The entire server state lives in a git repository.

---

## Traefik v3 as the Edge Proxy

Traefik discovers services through the Docker API. Instead of writing nginx config blocks for each new service, I add labels to the container and Traefik automatically provisions TLS certificates via Cloudflare DNS-01 challenge and sets up routing:

\`\`\`yaml
services:
  nextcloud:
    image: nextcloud:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.nextcloud.rule=Host(\`cloud.neovara.uk\`)"
      - "traefik.http.routers.nextcloud.entrypoints=websecure"
      - "traefik.http.routers.nextcloud.tls.certresolver=cloudflare"
\`\`\`

DNS-01 challenge means Traefik obtains wildcard certificates without any open inbound ports — the certificate request goes out through Cloudflare's API.

---

## Authelia for SSO Across All Services

Rather than managing separate credentials per service, Authelia sits in front of everything as a centralised authentication server. Traefik forwards all inbound requests to Authelia via ForwardAuth middleware. Unauthenticated users see the Authelia login page with TOTP multi-factor authentication before reaching any service.

I configured Authelia as a full OIDC provider. Services that support OIDC natively (Grafana, for example) authenticate directly through it — so the same session works across the whole stack without re-entering credentials.

Group-based access policies make certain services admin-only without per-service config duplication.

---

## Zero Open Inbound Ports via Cloudflare Tunnels

Standard home hosting requires port-forwarding 80 and 443 through your router, which exposes your home IP to the internet. I avoided this entirely.

A lightweight \`cloudflared\` container on the homelab maintains an outbound connection to Cloudflare's edge. When a request hits \`cloud.neovara.uk\`, Cloudflare routes it down that tunnel. My home firewall has zero open inbound ports.

---

## Observability

Prometheus scrapes metrics from cAdvisor (container CPU/memory), Node Exporter (host disk/network), and NVIDIA DCGM Exporter (GPU utilisation for Ollama inference). Grafana visualises them — authenticated via Authelia OIDC, so there's no separate Grafana login.

Watchtower checks for new image versions nightly and does a rolling update, but only after the container's health check passes. One misconfigured health check taught me to always define one.

---

## What Running It Actually Teaches

The most useful thing wasn't any specific tool — it was operating infrastructure I actually depended on. When Nextcloud went down because of a misconfigured Traefik middleware, I felt the urgency. When Watchtower pulled a broken image at 2 AM, I learnt to pin image versions for anything critical. The homelab mirrors the pressure of production at a scale where the mistakes are recoverable.`
  },
  {
    title: "Reducing MTTD from 30 Minutes to 1 Minute: Building an Internal Monitoring Tool with Django and Kafka",
    slug: "internal-monitoring-django-kafka",
    tags: ["Django", "Apache Kafka", "Observability", "Backend"],
    date: "Feb 12, 2026",
    readTime: "7 min read",
    summary: "How I built PoGo, an internal monitoring platform for a distributed scraping fleet, starting from a simple Django app, upgrading to Kafka for scale, and adding anomaly-detection alerts that transformed incident response.",
    content: `## The Problem

At SMS DataTech we run 20+ production servers with 40+ concurrent Scrapy spiders delivering critical datasets to clients like Sony. Originally there was no centralised logging. If a spider got blocked or crashed, we found out one of two ways: a developer manually SSH'd into the server to check, or the client emailed us about missing data.

Mean Time to Detect was over 30 minutes — often longer. I built PoGo to close that gap.

---

## Phase 1: Django + PostgreSQL Monolith

The first version was a lightweight Django web application.

I wrote a Scrapy extension that hooked into the engine's native signals — \`spider_opened\`, \`spider_closed\`, \`item_scraped\`, \`spider_error\`. At the end of every scrape, the spider POST'd a summary payload (items scraped, error count, runtime) to a Django REST endpoint. Django validated, normalised, and stored the stats in PostgreSQL.

This gave us the first centralised dashboard. Log verification time dropped from 3 hours to 5 minutes. Not bad for a few days of work.

---

## Phase 2: Scaling to Real-Time with Apache Kafka

As the scraping fleet expanded, the synchronous HTTP approach became a bottleneck. During high-density runs, 40 spiders were writing hundreds of metric events per second. Django web processes blocked, database connections exhausted, and monitoring metrics started dropping.

I introduced **Apache Kafka** as a high-throughput message broker:

\`\`\`
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
\`\`\`

The Scrapy extension now publishes events to a Kafka topic (\`scrapy-metrics\`) asynchronously — no blocking, no waiting for the Django process. Kafka buffers the stream; Python consumers read in batches and bulk-write to PostgreSQL. Database transaction overhead dropped by roughly 80%.

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
- **Escaped defects: zero.** Every data quality issue is caught internally before the daily scheduled delivery to clients.`
  }
];
