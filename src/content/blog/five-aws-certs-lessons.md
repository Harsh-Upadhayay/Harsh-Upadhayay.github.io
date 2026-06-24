---
title: "5 AWS Certifications in One Year: What I Actually Learnt (and What the Exams Miss)"
slug: five-aws-certs-lessons
tags: [AWS, Certifications, Career]
date: "April 10, 2026"
readTime: "6 min read"
summary: "Honest reflection on going from zero AWS certs to Associate × 3 + Professional × 2. Which study resources worked, how each cert changed how I think about architecture, and what exam prep doesn't teach you."
---

## The Sequence

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

The certs gave me vocabulary, mental models, and early confidence to propose and defend infrastructure decisions. They didn't replace hands-on experience — they accelerated it. The real learning happened when the architecture I'd studied on paper was running in production at SMS DataTech and I had to fix what the exam scenarios hadn't covered.
