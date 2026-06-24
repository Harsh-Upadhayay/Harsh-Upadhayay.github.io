# Harsh Upadhayay — Portfolio

**Live:** [harshupadhayay.neovara.uk](https://harshupadhayay.neovara.uk)

Personal portfolio and blog of Harsh Upadhayay, AWS Certified Cloud Architect & Software Engineer based in Tokyo. Built with React 19, Vite 6, and Tailwind CSS 4 — deployed automatically to GitHub Pages on every push to `main`.

---

## Stack

| Layer | Technology |
| :--- | :--- |
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS 4 |
| Blog | Markdown files with YAML frontmatter (no CMS) |
| Hosting | GitHub Pages via GitHub Actions |
| Domain | Cloudflare DNS → `harshupadhayay.neovara.uk` |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Hot-module reload is active — changes to `.tsx`, `.ts`, and `.md` files reflect immediately.

```bash
npm run lint    # TypeScript type check
npm run build   # production build → dist/
```

---

## Project Structure

```
src/
├── content/
│   └── blog/           # Blog posts as plain Markdown
│       ├── aws-cost-optimisation-real-world.md
│       ├── celery-rabbitmq-ecs-fargate-pipeline.md
│       ├── five-aws-certs-lessons.md
│       ├── go-rate-limiter-from-scratch.md
│       ├── homelab-self-hosting-guide.md
│       └── internal-monitoring-django-kafka.md
├── data/
│   ├── index.ts         # re-exports all data
│   ├── personal.ts      # bio, contact, social links
│   ├── experience.ts    # work experience
│   ├── projects.ts      # project cards
│   ├── skills.ts        # skill tags
│   ├── certifications.ts
│   ├── education.ts
│   ├── achievements.ts
│   └── blog.ts          # loads *.md files at build time via import.meta.glob
└── components/          # React components
```

---

## Adding or Editing a Blog Post

Blog posts are plain Markdown files in `src/content/blog/`. Edit one and push — GitHub Actions rebuilds and deploys automatically (typically under 60 seconds).

**To edit an existing post:** open the `.md` file, make changes, commit, push.

**To add a new post:** create a `.md` file with this frontmatter:

```markdown
---
title: "Your Post Title"
slug: your-post-slug
tags: [Tag1, Tag2, Tag3]
date: "Month DD, YYYY"
readTime: "X min read"
summary: "One-sentence summary shown on the blog listing page."
---

## First Section

Content here...
```

The post appears automatically, sorted by date.

---

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which:

1. Runs `npm ci` and `npm run build`
2. Uploads `dist/` as a Pages artifact
3. Deploys via `actions/deploy-pages`

The `public/CNAME` file (`harshupadhayay.neovara.uk`) is copied into `dist/` by Vite on every build, preserving the custom domain across deployments.

---

## Self-Hosting with Docker

```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio
# open http://localhost:8080
```

Multi-stage build: Node 22 Alpine compiles the Vite app, nginx Alpine serves the static output.
