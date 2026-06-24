import type { Project } from '../types';

export const projects: Project[] = [
  {
    name: "Rate Limiter Library (Go)",
    repo: "https://github.com/Harsh-Upadhayay/ratelimiter",
    status: "In Progress",
    tech: ["Go", "Redis", "Docker", "AWS CDK", "ECS Fargate", "ElastiCache", "OpenTelemetry", "CloudWatch", "GitHub Actions"],
    summary: "A pluggable Go rate-limiter library (Token Bucket + Fixed Window) with swappable in-memory and Redis backends, using atomic Lua scripts to stay correct under concurrent load. Test-driven, k6 load-tested, and shipped through a CI pipeline that stands up real AWS infrastructure to validate, then tears it down — zero cost at rest.",
    highlights: [
      "Redis backend uses atomic Lua scripts to guarantee correctness across concurrent clients; pluggable StateStore abstraction swaps backends without touching algorithm code.",
      "GitHub Actions pipeline runs lint → test → CDK deploy → k6 validate → CDK destroy, so every run benchmarks against live ECS Fargate + Multi-AZ ElastiCache at zero idle cost.",
      "Infrastructure defined entirely in AWS CDK: VPC, ECS Fargate, Multi-AZ ElastiCache, ALB.",
      "Benchmarked Token Bucket vs Fixed Window trade-offs with Go's native suite and k6 against both MemoryStore and RedisStore.",
      "OpenTelemetry instrumentation pushes per-algorithm metrics to Amazon CloudWatch."
    ]
  },
  {
    name: "Homelab Server",
    repo: "https://github.com/Harsh-Upadhayay/homelab",
    status: "Active",
    tech: ["Docker", "Docker Compose", "Traefik v3", "Authelia", "Cloudflare Tunnels", "Prometheus", "Grafana", "Ollama", "Watchtower", "Linux"],
    summary: "A self-hosted personal cloud running 15+ services (Nextcloud, Immich, Jellyfin, Ollama, Jenkins) with zero open inbound ports — all traffic egresses through Cloudflare Tunnels with TLS at the edge. Designed, built, and operated end-to-end like a mini production environment, with SSO and full observability.",
    highlights: [
      "Zero-trust access via Cloudflare Tunnels — no open inbound firewall ports; all traffic egresses through Cloudflare with TLS at edge.",
      "Authelia OIDC single sign-on across every service with group-based access policies (admin/editor/viewer) and per-host session cookies.",
      "Full observability stack: Prometheus + Grafana with cAdvisor (container), Node Exporter (host), and NVIDIA DCGM Exporter (GPU).",
      "Watchtower drives health-gated, zero-downtime image updates; the entire 15+ service stack is one Docker Compose definition behind a Makefile workflow.",
      "Hardened by default: no-new-privileges on all containers, read-only filesystems where possible, scoped Docker network isolation."
    ]
  },
  {
    name: "AI Job-Hunt Scraper",
    repo: "https://github.com/deep_astaad/job-hunt",
    status: "Active",
    tech: ["Python", "Scrapy", "Django", "Celery", "LLMs", "AWS", "Docker", "Playwright"],
    summary: "An AI job aggregator that scrapes multiple tech job boards — including Japan-specific portals — and uses an LLM extraction layer to normalise wildly different posting schemas into structured, fit-scored results, surfaced through a React frontend. Mirrors the production scraping stack from my day job.",
    highlights: [
      "LLM-driven extraction layer normalises heterogeneous job-posting schemas into one structured model.",
      "Celery async task queue runs parallel scraping with retry and Dead Letter Queue logic.",
      "Actor-based config system holds per-site scraping rules and rate limiting.",
      "Playwright integration handles JS-rendered pages that defeat plain HTTP scraping."
    ]
  },
  {
    name: "Kiroku (Japanese Study App)",
    repo: "https://github.com/Harsh-Upadhayay/kiroku",
    status: "Active",
    tech: ["Go 1.22", "React 19", "TypeScript", "SQLite", "FSRS", "IndexedDB", "PWA", "Docker", "Traefik"],
    summary: "A live, offline-first Japanese study app (kiroku.neovara.uk) where the browser is the study runtime and a Go backend handles sync, auth, and import. Kana drills, a guided JLPT N5 course, vocab-from-photos, an offline dictionary, and Anki deck review with FSRS — all working with no signal, self-hosted with zero third-party tracking.",
    highlights: [
      "Offline-first by design: all study data lives in IndexedDB and works fully offline, reconciling with the server when reconnected.",
      "FSRS scheduling (ts-fsrs) for imported Anki decks — a modern algorithm superseding SM-2.",
      "Anki .apkg import pipeline parses ZIP archives of SQLite databases and zstd-compressed media.",
      "Lean Go 1.22 backend on standard net/http with SQLite via modernc.org/sqlite (no cgo, no ORM) and bcrypt auth.",
      "Installable PWA with service-worker app-shell caching; self-hosted behind Traefik with Watchtower auto-updates."
    ]
  },
  {
    name: "Genkimart",
    repo: "https://github.com/harsh324/genkimart",
    status: "Completed",
    tech: ["Python", "Django", "Django REST Framework", "Stripe API"],
    summary: "A production e-commerce backend built for a local retailer: full REST API for catalogue, cart, and orders, with Stripe Checkout and webhook-driven payment-lifecycle handling.",
    highlights: [
      "Full REST API for product catalogue, cart, and order management.",
      "Stripe Checkout integration with webhook handling for the full payment lifecycle."
    ]
  },
  {
    name: "BlueStar Multi-Service Website",
    repo: "https://github.com/Harsh-Upadhayay/BlueStar",
    status: "Completed",
    tech: ["Node.js", "Express", "Docker", "Docker Compose"],
    summary: "A paid client build for BlueStar, a local provider of bike rentals, laundry, and food delivery: three service verticals in one Node.js app, with auth, order management, an admin dashboard, and real-time order status — built, deployed, and delivered for a paying customer.",
    highlights: [
      "Three distinct service verticals served from a single Node.js application.",
      "User authentication, order management, and an admin dashboard with an alert system.",
      "Toast notifications and real-time order status updates."
    ]
  },
  {
    name: "CipherVault",
    repo: "https://github.com/Harsh-Upadhayay/CipherVault",
    status: "Completed",
    tech: ["C++", "OOP", "Cryptography"],
    summary: "An academic study project: a suite of classical ciphers in C++ built behind a shared interface, exploring cryptography fundamentals and clean object-oriented design before working with modern primitives.",
    highlights: [
      "Caesar, Vigenère, Playfair, and Affine ciphers implemented as distinct classes behind a shared Cipher interface.",
      "Playfair implementation correctly handles digraph substitution, padding, and duplicate-letter edge cases."
    ]
  }
];
