import type { Project } from '../types';

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
      "Traefik v3 reverse proxy with automatic TLS via Cloudflare DNS-01 challenge; dynamic file provider per-host ForwardAuth middleware.",
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
