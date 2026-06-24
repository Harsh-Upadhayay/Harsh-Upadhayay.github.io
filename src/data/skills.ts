import type { Skills } from '../types';

export const skills: Skills = {
  languages: {
    primary: ["Python", "Go", "SQL"],
    proficient: ["C", "C++"]
  },
  frameworks_and_libraries: [
    "Django",
    "Django REST Framework",
    "FastAPI",
    "Scrapy",
    "Celery",
    "Pydantic",
    "Playwright",
    "boto3",
    "Pandas",
    "NumPy"
  ],
  databases: [
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Amazon Aurora",
    "SQLite",
    "Qdrant"
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
      "SQS",
      "SNS",
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
      "Prometheus",
      "Grafana",
      "Ollama",
      "Traefik",
      "Cloudflare Tunnels",
      "Linux Administration",
      "Git & GitHub Version Control",
      "Terraform"
    ]
  }
};
