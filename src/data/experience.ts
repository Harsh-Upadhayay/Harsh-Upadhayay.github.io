import type { Experience } from '../types';

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
