import type { Skills } from '../types';

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
