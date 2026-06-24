---
title: "Homelab as a Learning Lab: Self-Hosting 15+ Services on a Single Machine"
slug: homelab-self-hosting-guide
tags: [Homelab, Docker, Traefik, Authelia, Self-hosting]
date: "January 18, 2026"
readTime: "5 min read"
summary: "How I turned a spare machine into a personal cloud: Traefik as a reverse proxy, Authelia for SSO, Cloudflare Tunnels for zero-open-port access, and lessons learnt managing it like a mini production environment."
---

## Why Self-Host

Cloud resources are convenient but they hide the infrastructure layer. After working with AWS professionally, I wanted to understand what's actually underneath — networking, reverse proxies, certificate management, container orchestration — on hardware I controlled and could break without consequences.

I turned a spare compact desktop into a homelab running 15+ services: Nextcloud for file sync, Immich for photo backup, Jellyfin for media, Audiobookshelf, Ollama for local LLMs, Jenkins CI, VS Code Server, a monitoring stack, and more.

---

## Architecture

```
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
```

---

## Core Design: Everything in Docker Compose

No services installed directly on the host. If a container misbehaves, I delete and recreate it. If the hardware fails, all 15+ services are back in minutes with `docker compose up -d`. The entire server state lives in a git repository.

---

## Traefik v3 as the Edge Proxy

Traefik discovers services through the Docker API. Instead of writing nginx config blocks for each new service, I add labels to the container and Traefik automatically provisions TLS certificates via Cloudflare DNS-01 challenge and sets up routing:

```yaml
services:
  nextcloud:
    image: nextcloud:latest
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.nextcloud.rule=Host(`cloud.neovara.uk`)"
      - "traefik.http.routers.nextcloud.entrypoints=websecure"
      - "traefik.http.routers.nextcloud.tls.certresolver=cloudflare"
```

DNS-01 challenge means Traefik obtains wildcard certificates without any open inbound ports — the certificate request goes out through Cloudflare's API.

---

## Authelia for SSO Across All Services

Rather than managing separate credentials per service, Authelia sits in front of everything as a centralised authentication server. Traefik forwards all inbound requests to Authelia via ForwardAuth middleware. Unauthenticated users see the Authelia login page with TOTP multi-factor authentication before reaching any service.

I configured Authelia as a full OIDC provider. Services that support OIDC natively (Grafana, for example) authenticate directly through it — so the same session works across the whole stack without re-entering credentials. Group-based access policies make certain services admin-only without per-service config duplication.

---

## Zero Open Inbound Ports via Cloudflare Tunnels

Standard home hosting requires port-forwarding 80 and 443 through your router, which exposes your home IP to the internet. I avoided this entirely.

A lightweight `cloudflared` container on the homelab maintains an outbound connection to Cloudflare's edge. When a request hits `cloud.neovara.uk`, Cloudflare routes it down that tunnel. My home firewall has zero open inbound ports.

---

## Observability

Prometheus scrapes metrics from cAdvisor (container CPU/memory), Node Exporter (host disk/network), and NVIDIA DCGM Exporter (GPU utilisation for Ollama inference). Grafana visualises them — authenticated via Authelia OIDC, so there's no separate Grafana login.

Watchtower checks for new image versions nightly and does a rolling update, but only after the container's health check passes. One misconfigured health check taught me to always define one.

---

## What Running It Actually Teaches

The most useful thing wasn't any specific tool — it was operating infrastructure I actually depended on. When Nextcloud went down because of a misconfigured Traefik middleware, I felt the urgency. When Watchtower pulled a broken image at 2 AM, I learnt to pin image versions for anything critical. The homelab mirrors the pressure of production at a scale where the mistakes are recoverable.
