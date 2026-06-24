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
      "Developed using standard Object Oriented design patterns in modular C++.",
      "Includes implementations of Caesar, Vigenere, Playfair, and Affine ciphers.",
      "Optimized for quick execution on standard hardware."
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
    "Next.js (learning)"
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
      "Terraform (learning)"
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
  "Published 5+ technical articles on GeeksforGeeks.",
  "Coursera: Supervised Machine Learning (Andrew Ng Certification)",
  "Coursera: Advanced Learning Algorithms (Andrew Ng Certification)"
];

export const blogPosts: BlogPost[] = [
  {
    title: "How I Cut AWS Costs by $1,000/Month Without Touching a Single Line of App Code",
    slug: "aws-cost-optimisation-real-world",
    tags: ["AWS", "FinOps", "Aurora", "ECS Spot", "Savings Plans"],
    date: "June 15, 2026",
    readTime: "8 min read",
    summary: "A practical walkthrough of the three cost-reduction levers I pulled at SMS DataTech: Compute Savings Plans, ECS Fargate Spot with idempotent tasks, and tracking down a bloated 1.2 TB Aurora table that nobody knew existed.",
    content: `## The Challenge

In cloud engineering, we often focus on scale, throughput, and sub-millisecond latencies. However, an equally critical constraint in enterprise operations is **cost efficiency**. While working on AWS infrastructure at SMS DataTech, our monthly billing was higher than expected. Rather than requesting code refactors from our developers, I decided to look at FinOps and architectural optimization opportunities.

Through three precise, calculated actions, I managed to reduce our monthly AWS bill by **$1,000** without changing any application code. Here is exactly how I did it.

---

## Lever 1: The 1.2 TB Aurora Table Nobody Knew Existed (Saving $500/month)

While auditing AWS RDS billing, I noticed our **Amazon Aurora PostgreSQL** instance for a client project (Sony Group) had astronomical storage charges. Investigating the storage metrics, the active storage size was sitting at an alarming **1.2 TB**.

### The Discovery
I connected to the database and analyzed the disk usage of our tables using this SQL query:

\`\`\`sql
SELECT 
    relname AS table_name, 
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS table_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS index_size
FROM pg_catalog.pg_statio_user_tables 
ORDER BY pg_total_relation_size(relid) DESC;
\`\`\`

The culprit was a legacy log table (\`web_scrape_logs_raw\`) that had been continuously logging raw HTML responses from 14 scrapers since 2019. It alone accounted for **1.05 TB** of data.

### The Remediation
We couldn't just run a standard \`DELETE\` or \`DROP TABLE\` because:
1. Deleting 1 TB of rows in a single transaction would lock the database, exhaust the transaction log (WAL), and trigger a production outage.
2. We had a strict compliance requirement to retain data for 7 years, but this log data was rarely accessed.

I devised a 3-part plan:
1. **Snap and Archive**: Exported the full Aurora database snapshot to **S3 Glacier Deep Archive**. Glacier Deep Archive costs only **$0.00099 per GB/month**, compared to Aurora's standard storage rate of **$0.10 per GB/month**. This satisfied our data-retention policy at a 99% cost reduction.
2. **Batched Non-Blocking Deletion**: I wrote a robust, non-blocking Python script that ran over 3 days, deleting log records in small batches of 1,000 using sleep intervals of 250ms between queries. This ensured zero disruption to Sony's live daily scraper runs.
3. **Database Vacuuming**: Once the data was purged, I triggered a vacuum operation to reclaim physical pages and reduce the high water mark of the storage volume.

**Result**: Active database storage shrunk from **1.2 TB to 200 GB**, immediately cutting Aurora costs by **$500/month**.

---

## Lever 2: Deploying Celery Workers to ECS Fargate Spot (Saving $350/month)

Our scraping pipelines are heavily task-based. We use **Celery** + **RabbitMQ** to process millions of URLs daily. Originally, all our Celery workers were hosted on **standard ECS Fargate** containers, which have a flat-rate billing model.

Because scraping tasks are highly dynamic and stateless, they are the perfect candidate for **ECS Fargate Spot**. Fargate Spot offers up to a **70% discount** compared to regular Fargate, with the caveat that AWS can reclaim the capacity with a 2-minute warning.

### Ensuring Strict Task Idempotency
To deploy to Fargate Spot safely without losing data during a Spot reclamation:
1. I re-engineered our Celery tasks to be strictly **idempotent**. If a task is interrupted mid-execution, it can be safely re-run without duplicate database writes or inconsistent state.
2. I enabled Celery's \`acks_late\` flag. This ensures tasks are only removed from RabbitMQ *after* they successfully complete, rather than when they are received.
3. I listened to the **ECS Task State Change** event warnings via an AWS Lambda function triggered by EventBridge. This allowed us to gracefully stop accepting new tasks on workers that were about to be shut down.

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

**Result**: Shifted 80% of our worker capacity to Fargate Spot, slashing compute charges by **$350/month**.

---

## Lever 3: Purchasing Compute Savings Plans (Saving $150/month)

After optimizing the active usage, I analyzed our remaining baseline compute. We had a continuous, predictable baseline load of about 4 t3.medium EC2 instances running 24/7 for our internal monitoring tools, static websites, and VPN servers.

Instead of paying the standard On-Demand pricing, I analyzed our historical compute usage in **AWS Cost Explorer** and recommended committing to a **1-Year Compute Savings Plan** with an hourly spend of $0.40.

**Compute Savings Plans** apply a discounted rate automatically to EC2, ECS, and Lambda across any instance family, region, or operating system in exchange for a committed level of usage.

**Result**: Reduced our base EC2 bill by 25%, saving an effortless **$150/month**.

---

## Key Takeaways for Technical Recruiters
- **FinOps is Engineering**: Cost reduction isn't just about budgeting; it requires a deep understanding of database storage engines, async task lifecycles, and Cloud native pricing structures.
- **Measurable Impact**: Total monthly savings achieved was **$1,000/month ($12,000/year)** with zero application performance degradation.
- **Risk Mitigation**: Outages were avoided during large-scale database operations through asynchronous, batched execution scripts.`
  },
  {
    title: "Building a Fault-Tolerant Async Pipeline with Celery, RabbitMQ, and ECS Fargate",
    slug: "celery-rabbitmq-ecs-fargate-pipeline",
    tags: ["Python", "Celery", "RabbitMQ", "AWS ECS", "System Design"],
    date: "May 28, 2026",
    readTime: "10 min read",
    summary: "How I designed the task queue for an AI scraping platform: performance-tier routing, Dead Letter Queues, Spot interruption handling, and custom auto-scaling via Lambda + EventBridge.",
    content: `## Architectural Overview

When building *Hawk AI* & *Missuri*, our next-generation AI scraping platform, we faced a major architectural challenge: **How do we scrape and process millions of unstructured web pages dynamically while keeping infrastructure cost-efficient and resilient?**

Web scraping has highly unpredictable workloads. A user might request a scrape of 50,000 e-commerce pages at 2:00 PM, followed by hours of complete silence. 

To solve this, I designed and built an asynchronous, resilient scraping pipeline utilizing **Celery**, **RabbitMQ**, and **AWS ECS Fargate**.

\`\`\`
+---------------+      Publish      +------------+      Route      +-----------------------+
|  Django App   | ----------------> |  RabbitMQ  | --------------> |  Celery Task Queues   |
| (API/Trigger) |                   |  (Broker)  |                 | (High, Default, Low)  |
+---------------+                   +------------+                 +-----------------------+
                                                                               |
                                                                               v
                                                                   +-----------------------+
                                                                   |  ECS Fargate Workers  |
                                                                   | (Auto-scaled by size) |
                                                                   +-----------------------+
\`\`\`

---

## Design Pattern 1: Performance-Tier Routing

Different websites have different rendering times. A static blog post loads in 100ms, while an SPA (Single Page Application) with heavy JavaScript might require a headless browser (Playwright) and take 5 seconds.

If we put all scraping tasks into a single queue, long-running Playwright tasks would block quick static API calls (a classic Head-of-Line blocking problem).

I implemented **Performance-Tier Routing** by dividing Celery into three distinct queues backed by RabbitMQ routing keys:

1. **\`high_priority\`**: For immediate, lightweight tasks like metadata fetching, schema validation, and instant individual URL scraping.
2. **\`default\`**: For standard multi-page scraping tasks utilizing standard HTTP requests (Requests/Scrapy).
3. **\`browser_intensive\`**: For heavy, JS-rendered targets that require dynamic Playwright/Puppeteer rendering.

\`\`\`python
# celery.py config snippet
CELERY_ROUTES = {
    'scraper.tasks.fetch_metadata': {'queue': 'high_priority'},
    'scraper.tasks.scrape_static_page': {'queue': 'default'},
    'scraper.tasks.scrape_dynamic_page': {'queue': 'browser_intensive'},
}
\`\`\`

By separating these queues, we could provision smaller, high-CPU containers for standard scrapers, and larger, high-memory containers for browser-intensive scrapers, optimizing both cost and speed.

---

## Design Pattern 2: Fault Tolerance & Dead Letter Queues (DLQ)

Web scraping is inherently fragile. Websites go down, cloudflare blocks requests, or HTML selectors change without notice. To prevent failed tasks from clogging our primary queues or disappearing entirely, I designed a reliable **Dead Letter Queue (DLQ)** pipeline:

- **Automatic Retries with Exponential Backoff**: Tasks fail with an exponential backoff factor (e.g., retry 1 after 10s, retry 2 after 40s, retry 3 after 160s) to bypass temporary rate limits.
- **DLQ Fallback**: If a task fails more than 5 times, it is automatically routed to a \`scraping_dlq\` queue.
- **DLQ Alerts & Dashboard**: An automated CloudWatch alarm triggers a Slack notification when the DLQ depth exceeds 10 items. Engineers can inspect the failure payload, update Scrapy pipelines if selectors broke, and trigger a Celery replay command to re-process the saved payloads.

---

## Design Pattern 3: Custom ECS Fargate Auto-Scaling

Standard ECS auto-scaling scales containers based on CPU and Memory usage. However, for a task queue, this is a **lagging metric**. An ECS cluster might be idling at 10% CPU usage, but there could be 10,000 tasks queued in RabbitMQ waiting to be processed.

I built a **custom auto-scaling engine** using **AWS Lambda + EventBridge**:

1. **Metrics Collection**: An EventBridge rule triggers a Python Lambda function every 60 seconds.
2. **RabbitMQ API Query**: The Lambda function queries the RabbitMQ HTTP API to fetch the current count of active and pending tasks in each queue (\`messages_unacknowledged\` and \`messages_ready\`).
3. **CloudWatch Custom Metrics**: The Lambda pushes these queue metrics to CloudWatch as custom metrics (e.g., \`QueueDepth\`).
4. **ECS Scale Out/In Policies**: ECS service scaling policies react to \`QueueDepth\`. If the queue depth exceeds 100 items per worker, ECS instantly provisions more Celery workers. If it falls below 5, ECS scales down to avoid running idle containers.

---

## Results and Metrics
- **Zero Escaped Defects**: Our DLQ pipeline caught 100% of temporary scraping failures, allowing post-remediation replaying without losing client data.
- **Dynamic Resource Efficiency**: The custom auto-scaling mechanism reduced idle compute time by **60%**, dropping our average container runtime costs significantly.
- **Sub-Second Orchestration**: Splitting queues ensured that high-priority instant API scrapes returned results in **under 1.2 seconds**, regardless of how many background scrapes were running.`
  },
  {
    title: "5 AWS Certifications in One Year: What I Actually Learnt (and What the Exams Miss)",
    slug: "five-aws-certs-lessons",
    tags: ["AWS", "Certifications", "Career"],
    date: "April 10, 2026",
    readTime: "6 min read",
    summary: "Honest reflection on going from zero AWS certs to Associate × 3 + Professional × 2. Which study resources worked, how each cert changed how I think about architecture, and what exam prep doesn't teach you.",
    content: `## The Journey

In early 2025, I made a commitment to master Cloud infrastructure. Coming from a computer science background, I understood algorithms and software design, but cloud-native operations felt like a collection of magic services. 

Over the next 12 months, I studied for, sat, and passed **five AWS Certifications**:
1. **AWS Solutions Architect Associate (SAA)** - 90%
2. **AWS SysOps Administrator Associate (SOA)** - 88%
3. **AWS Developer Associate (DVA)** - 86%
4. **AWS DevOps Engineer Professional (DOP)** - 86%
5. **AWS Solutions Architect Professional (SAP)** - 86%

Here is my honest breakdown of what these exams actually teach you, what they completely miss, and how to study for them effectively.

---

## The Certification Map

| Certification | Focus Area | Difficulty | Value in Production |
| :--- | :--- | :--- | :--- |
| **Solutions Architect Associate** | Broad overview of AWS services, standard design patterns. | 3/5 | Excellent starting point to learn terminology. |
| **Developer Associate** | Serverless (Lambda, API Gateway), DynamoDB, IAM, CI/CD. | 3.5/5 | Extremely practical for backend software engineers. |
| **SysOps Administrator** | Monitoring (CloudWatch), Deployment (CloudFormation), Networks. | 4/5 | Great for troubleshooting, contains a hands-on lab component. |
| **DevOps Professional** | Zero-downtime deployments, multi-account structures, complex pipelines. | 4.5/5 | Invaluable for building stable CI/CD systems at scale. |
| **Solutions Architect Professional** | Complex integrations, hybrid cloud, migration strategies, cost, security. | 5/5 | High-level architectural mastery. Toughest exam by far. |

---

## What the Exams Teach You (The Good)

Passionate developers sometimes dismiss certifications as "just memorizing multiple-choice questions." Having completed both Professional-tier exams, I disagree. The study process forces you to learn:

1. **How to Fail-Safe at Scale**: You learn that everything fails all the time. The exams force you to design systems that handle AZ outages, EC2 crashes, and network disconnections automatically.
2. **The "AWS Way" of Security**: IAM (Identity and Access Management) is heavily tested. Studying for these certs made me an expert in the principle of least privilege, IAM role assumption, and cross-account bucket policies.
3. **Cost-First Architecture**: You learn to view every service not just as a technical tool, but as a financial line-item. You learn when to select S3 Standard vs. Glacier, or DynamoDB vs. RDS based on query patterns.

---

## What the Exams Miss (The Real World)

While the exams build a great theoretical foundation, there are several production-critical skills they don't cover:

- **Infrastructure as Code (IaC) in Practice**: The exams ask you high-level conceptual questions about CloudFormation. In the real world, you will likely write **AWS CDK** in Python or TypeScript, or use **Terraform**. Synthesizing complex resources and managing state files is a skill you only get by writing code.
- **The Pain of Legacy Migration**: Exam questions assume clean, pristine greenfield migrations. They don't prepare you for migrating an un-documented 10-year-old database with zero downtime or dealing with inconsistent legacy schemas.
- **Third-Party Integrations**: AWS wants you to use 100% AWS services (e.g., CodeCommit, CodePipeline, CloudWatch). In reality, most high-performing engineering teams use GitHub, GitLab, Jenkins, Datadog, Prometheus, or Grafana.

---

## My Study Strategy

If you are looking to tackle these exams, do not waste your time reading whitepapers cover-to-cover. Here is what worked for me:

1. **High-Quality Video Courses**: I highly recommend **Adrian Cantrill** for deep-dive conceptual learning, and **Stephane Maarek** for quick exam-focused summaries.
2. **Hands-On Lab Builds**: For every service you learn about, log into the AWS Free Tier console and build it. Better yet, write an AWS CDK script to spin it up and tear it down.
3. **Realistic Practice Exams**: **Tutorials Dojo (Jon Bonso)** practice exams are legendary. They are harder than the actual exams and provide extensive, detailed explanations for why every option is correct or incorrect.

**Recruiter Takeaway**: Certifications prove foundational knowledge and a strong work ethic. However, they are only truly valuable when backed by real production code. My five AWS certifications directly enabled me to successfully architect and optimize SMS DataTech's cloud infrastructure with confidence.`
  },
  {
    title: "Writing a Go Rate Limiter from Scratch: Token Bucket, Fixed Window, and Redis Lua Scripts",
    slug: "go-rate-limiter-from-scratch",
    tags: ["Go", "Redis", "System Design", "Concurrency"],
    date: "March 05, 2026",
    readTime: "9 min read",
    summary: "A deep dive into building a pluggable rate limiter in Go — interface design, sync.Mutex vs channels debate, atomic Lua scripts for Redis, and benchmark results comparing the two backends.",
    content: `## Why Build a Rate Limiter?

In a microservice architecture, protecting your APIs from abuse, scraping, or DDoS attacks is critical. While you can use commercial API Gateways, there are many scenarios where you need a lightweight, low-latency, and customizable rate limiter integrated directly into your application code.

As a personal challenge to deepen my knowledge of **Go concurrency patterns** and **Redis integrations**, I decided to build a production-grade rate-limiting library from scratch in Go.

---

## Core Architecture

A rate limiter should be highly pluggable. It shouldn't care *where* the request limits are stored (in memory for single-instance apps, or in Redis for distributed services), nor should it care *which* algorithm is used.

I started by defining clean, decoupled Go interfaces:

\`\`\`go
package ratelimiter

import "context"

type Limit struct {
    Rate   int64 // Number of requests
    Period int64 // Time period in seconds
}

type StateStore interface {
    Allow(ctx context.Context, key string, limit Limit) (bool, int64, error)
}
\`\`\`

---

## Algorithm 1: Token Bucket (In-Memory with sync.Mutex)

The Token Bucket algorithm allows for a burst of requests up to a maximum bucket capacity, and continuously refills the bucket at a constant rate.

### Managing Concurrency
In Go, multiple goroutines will access the rate limiter concurrently. To prevent race conditions, we must protect the bucket state with a \`sync.Mutex\`:

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

    // Refill tokens based on elapsed time
    refillAmount := elapsed * (float64(limit.Rate) / float64(limit.Period))
    b.tokens = math.Min(float64(limit.Rate), b.tokens+refillAmount)

    if b.tokens >= 1 {
        b.tokens -= 1
        return true
    }
    return false
}
\`\`\`

---

## Algorithm 2: Distributed Fixed Window (Redis + Lua Scripting)

For a distributed system with multiple API instances, an in-memory store won't cut it. If Instance A permits 10 requests and Instance B permits 10 requests, a user could bypass limits by distributing their requests across servers.

We use **Redis** to centralize the rate-limiting state. 

### The Race Condition Trap
If we query Redis for the current count, increment it in Go, and write it back, we introduce a **Race Condition** (Read-Modify-Write flaw). Under heavy concurrent load, two requests could read the count as \`9\` simultaneously, both think they are within the limit, and allow both requests, violating our rate limit.

### The Solution: Atomic Lua Scripts
To guarantee atomicity in Redis without blocking connections, we execute a **Lua script**. Redis executes Lua scripts as a single atomic transaction, ensuring no other client can read or write during execution.

Here is the production-grade Lua script I wrote for the **Fixed Window** algorithm:

\`\`\`lua
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])

local current = redis.call('GET', key)

if current and tonumber(current) >= limit then
    return 0 -- Denied
else
    local newVal = redis.call('INCR', key)
    if newVal == 1 then
        redis.call('EXPIRE', key, window)
    end
    return 1 -- Allowed
end
\`\`\`

---

## Benchmarks & Performance Analysis

I wrote Go benchmarks comparing our in-memory mutex store vs. our Redis-backed store:

\`\`\`
go test -bench=. -benchmem
\`\`\`

### Results:
1. **InMemoryStore**: **~23 ns/op** with **0 B/op** memory allocation. Extremely fast, perfect for high-speed single-instance servers.
2. **RedisStore**: **~1.1 ms/op** (over a local network connection). The bottleneck is network I/O, which is expected.

### Key Takeaway for Senior Engineers
- **Memory vs. Distributed**: Use the in-memory limiter for lightweight internal systems where extreme low latency is a priority. Use the Redis-backed limiter for user-facing API routes running across a distributed ECS cluster where strict correctness and coordination are mandatory.`
  },
  {
    title: "Homelab as a Learning Lab: Self-Hosting 12 Services on a Single Machine",
    slug: "homelab-self-hosting-guide",
    tags: ["Homelab", "Docker", "Traefik", "Authelia", "Self-hosting"],
    date: "Jan 18, 2026",
    readTime: "5 min read",
    summary: "How I turned a spare machine into a personal cloud: Traefik as a reverse proxy, Authelia for SSO, Cloudflare Tunnels for zero-open-port access, and lessons learnt managing it like a mini production environment.",
    content: `## The Why

Many software engineers do their learning entirely in the cloud, spinning up short-lived AWS resources. However, cloud costs can add up quickly, and you miss out on learning the fundamental, bare-metal layers of systems administration.

To bridge this gap, I turned a spare, compact desktop machine in my home into a **fully functional Homelab server**, self-hosting over 12 essential services (including **Nextcloud** for file storage, **Jenkins** for continuous integration, and **AdGuard Home** for network-wide DNS-level ad blocking).

This project served as my sandbox to experiment with network security, container orchestration, and reverse proxies in a low-risk environment.

---

## The Homelab Architecture

\`\`\`
                                 Cloudflare Tunnel (Secure Egress)
  [ Public Internet ] --------------------------------------------------------+
                                                                              |
                                                                              v
+-----------------------------------------------------------------------------+
|  Local Homelab Server (Docker)                                              |
|                                                                             |
|  +--------------------+      Forward      +------------------------------+  |
|  |   Traefik Proxy    | ----------------> | Authelia SSO (MFA Guard)     |  |
|  |  (SSL & Routing)   |                   +------------------------------+  |
|  +--------------------+                                   |                 |
|            |                                              v (Authorized?)   |
|            +----------------------------------------------+                 |
|            |                                                                |
|            +-------------> [ Nextcloud ]                                    |
|            +-------------> [ Jenkins ]                                      |
|            +-------------> [ Grafana ]                                      |
+-----------------------------------------------------------------------------+
\`\`\`

---

## Core Infrastructure Design

Rather than installing services directly on the host operating system, which results in dependency conflicts and configuration drift, I containerized everything using **Docker** and declared the entire server configuration inside a single **Docker Compose** repository.

### Component 1: Traefik as the Unified Entry Point
Instead of Nginx, I chose **Traefik** as our edge reverse proxy. Traefik is cloud-native and integrates directly with the Docker API. 

When I spin up a new container, I don't need to manually write Nginx config blocks. I simply add custom Docker labels to the container definition, and Traefik automatically detects the container, provisions a Let's Encrypt SSL certificate, and configures routing.

\`\`\`yaml
# docker-compose.yml snippet
services:
  nextcloud:
    image: nextcloud:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.nextcloud.rule=Host(\`cloud.harsh.dev\`)"
      - "traefik.http.routers.nextcloud.entrypoints=websecure"
      - "traefik.http.routers.nextcloud.tls.certresolver=myresolver"
\`\`\`

---

## Component 2: Authelia for Single Sign-On (SSO) & MFA

With multiple private services exposed to the web, securing them was paramount. Rather than relying on each individual service's weak built-in authentication, I configured **Authelia**.

Authelia is an open-source authentication server. I configured Traefik to forward all incoming traffic to Authelia for validation. If the visitor is not authenticated, Authelia prompts them for a secure credentials login + a **TOTP Multi-Factor Authentication** code before granting access to Nextcloud or Jenkins.

---

## Component 3: Zero Inbound Firewall Ports via Cloudflare Tunnels

Standard home hosting requires logging into your home router, setting up dynamic DNS, and forwarding ports 80/443 to your local server. This is a massive security hazard, exposing your home network IP to malicious port scanners globally.

I solved this by deploying **Cloudflare Tunnels**:
1. I ran a lightweight \`cloudflared\` container on my homelab server.
2. The container establishes an outbound connection to Cloudflare’s nearest edge server.
3. When a user requests \`cloud.harsh.dev\`, Cloudflare routes the traffic securely down that active outbound connection to my server.

**Result**: I have **zero open inbound ports** on my home firewall, shielding my home network from internet attacks.

---

## What I Learnt
- **GitOps Infrastructure**: Managing a homelab via Docker Compose taught me the power of treating infrastructure as code. If my hardware fails, I can restore all 12 services on a new machine in 5 minutes simply by running \`docker compose up -d\`.
- **Network Security Fundamentals**: Implementing SSL certificates, CORS policies, reverse proxies, and MFA gave me hands-on security skills that immediately translated to my enterprise work on AWS.`
  },
  {
    title: "Reducing MTTD from 30 Minutes to 1 Minute: Building an Internal Monitoring Tool with Django and Kafka",
    slug: "internal-monitoring-django-kafka",
    tags: ["Django", "Apache Kafka", "Observability", "Backend"],
    date: "Feb 12, 2026",
    readTime: "7 min read",
    summary: "How I built PoGo, an internal monitoring platform for a distributed scraping fleet, starting from a simple Django app, upgrading to Kafka for scale, and adding anomaly-detection alerts that transformed incident response.",
    content: `## The Problem: High MTTD (Mean Time to Detect)

At SMS DataTech, we run a massive distributed web scraping infrastructure with **20+ production servers** running over **40+ concurrent scrapy spiders**. These scrapers deliver critical daily datasets to high-profile clients like Sony.

Originally, we had no centralized logging. If a crawler got blocked by a target website or crashed due to an unexpected DOM change, we wouldn't find out until:
1. The developer manually SSH-ed into the server to check logs.
2. Or worse, the client emailed us complaining about missing or empty datasets.

This led to a terrible **Mean Time to Detect (MTTD) of over 30 minutes**. I was tasked with solving this observability gap, which led to the creation of **PoGo**, our internal monitoring platform.

---

## Phase 1: The Monolith (Django + PostgreSQL)

I started by building a lightweight Django web application.
- I wrote a Scrapy extension that hooked into Scrapy's core engine events (\`spider_opened\`, \`spider_closed\`, \`item_scraped\`, \`spider_error\`).
- At the end of every scrape, the spider sent a summary payload (number of items scraped, error counts, runtime) via a REST API to our Django server.
- Django validated, normalized, and saved the statistics to a **PostgreSQL** database.

This gave us our first centralized dashboard, dropping log verification time from **3 hours to 5 minutes** of manual reading.

---

## Phase 2: Scaling to Real-Time with Apache Kafka

As our scraping fleet expanded, the HTTP REST API became a bottleneck. During high-density scraping runs, 40 scrapers would write hundreds of logging metrics every second. Our synchronous Django web processes were blocking, database connections were exhausted, and we began dropping monitoring metrics.

To scale the pipeline, I introduced **Apache Kafka** as a high-throughput message broker:

\`\`\`
+--------------------+                       +---------------------+
| Distributed Spiders | ---(Metrics Stream)--> |    Apache Kafka     |
| (Scrapy Extension) |                       | (Ingest & Queue)    |
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
                                             | Django Web Dashboard|
                                             +---------------------+
\`\`\`

1. **Decoupled Metric Ingestion**: The Scrapy spiders now push events directly to a Kafka topic (\`scrapy-metrics\`) in an asynchronous, non-blocking manner.
2. **Buffer and Stream**: Kafka acts as a durable, distributed buffer, protecting our database from sudden spikes.
3. **Optimized Consumers**: I wrote multi-threaded Python consumers that read events from Kafka, batch them, and perform bulk writes to PostgreSQL, reducing active database transaction overhead by **80%**.

---

## Phase 3: Anomaly-Alerting Engine

Centralized metrics are only useful if they actively alert engineers. I designed an **anomaly detection module** within the monitoring tool:

- **Historical Benchmarking**: For every scraper, we calculate a rolling 7-day average of expected items scraped and typical execution duration.
- **Real-Time Deviation Alerts**: If a running spider closes with an item count that is **2 standard deviations below** its historical 7-day average (e.g., scraping 10 items instead of 5,000), the anomaly engine instantly flags it.
- **Immediate Alerting**: The system triggers an instant email/Slack alert with direct links to the relevant log trace.

---

## Engineering Impact
- **MTTD Reduction**: Slashed Mean Time to Detect from **30 minutes to under 1 minute**. We are now notified of a scraper failure the second the container stops.
- **MTTR Reduction**: Mean Time to Resolve was reduced by **30 minutes per incident** because engineers no longer need to find and parse raw text logs across 20 servers; PoGo centralizes the stack trace on a single screen.
- **Client Satisfaction**: Escaped defects (data issues reported by the client) dropped to **zero** because our team detects and fixes failures before the daily scheduled delivery time.`
  }
];
