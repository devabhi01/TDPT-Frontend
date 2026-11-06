import { SolutionItem } from '../types';

export const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI & Automation',
    subtitle: 'Autonomous workflows, LLM agents & cognitive systems',
    shortDescription: 'Intelligent workflows, AI agents, copilots, integrations, and enterprise business automation built for high precision and operational speed.',
    fullDescription: 'We architect and deploy production-grade AI systems that go beyond toy chatbots. From fine-tuned autonomous agents and RAG retrieval engines to multi-model decision pipelines, Dev Pride turns complex operational workflows into self-optimizing digital operations.',
    iconName: 'Cpu',
    accentColor: '#00D2B4',
    capabilities: [
      {
        title: 'Autonomous AI Agents & Workflows',
        description: 'Multi-agent systems with tool-calling capabilities, stateful context memory, and deterministic guardrails.',
        deliverables: ['Custom LangGraph / LangChain agents', 'Human-in-the-loop approvals', 'Self-healing error recovery']
      },
      {
        title: 'Enterprise Copilots & Cognitive Search',
        description: 'Context-aware search and generative copilots indexed over your proprietary enterprise knowledge base.',
        deliverables: ['Hybrid Vector/Keyword RAG pipelines', 'Role-based access control (RBAC)', 'Low-latency streaming responses']
      },
      {
        title: 'Intelligent Process Automation (IPA)',
        description: 'End-to-end automation connecting legacy CRMs, ERPs, financial systems, and external APIs.',
        deliverables: ['Document processing & OCR pipelines', 'Event-driven webhook orchestrators', 'Audit logs and compliance tracking']
      },
      {
        title: 'LLM Fine-Tuning & Evaluation',
        description: 'Domain-specific model optimization, synthetic data generation, and continuous hallucination benchmarking.',
        deliverables: ['LoRA / QLoRA model tuning', 'Automated red-teaming test suites', 'Cost and token optimization engines']
      }
    ],
    businessOutcomes: [
      { metric: '70%', label: 'Reduction in manual repetitive process time' },
      { metric: '10x', label: 'Faster document parsing and decision routing' },
      { metric: '99.4%', label: 'Extraction accuracy with multi-pass verification' },
      { metric: '4.2x', label: 'ROI realized within first 6 months of rollout' }
    ],
    techStack: ['Python', 'LangChain', 'LlamaIndex', 'OpenAI', 'Anthropic', 'Hugging Face', 'Pinecone', 'Qdrant', 'FastAPI'],
    sampleArchitecture: [
      { layer: 'Agentic Layer', tech: ['LangGraph', 'Task Router', 'Context Memory'] },
      { layer: 'Inference & LLMs', tech: ['Claude 3.5 Sonnet', 'GPT-4o', 'Fine-tuned Mistral / Llama'] },
      { layer: 'Vector & Knowledge', tech: ['Pinecone', 'Qdrant', 'Hybrid Sparse/Dense Indices'] },
      { layer: 'Integration Bus', tech: ['Kafka', 'Temporal.io', 'REST/GraphQL Webhooks'] }
    ]
  },
  {
    id: 'software-digital-products',
    slug: 'software-digital-products',
    title: 'Software & Digital Products',
    subtitle: 'High-performance web applications & modern SaaS platforms',
    shortDescription: 'Modern web applications, SaaS platforms, mobile applications, and custom software engineered for reliability, scalability, and exceptional UX.',
    fullDescription: 'From 0-to-1 greenfield SaaS platforms to mission-critical enterprise systems handling millions of daily events, we engineer resilient software products with obsessive attention to UI fidelity, latency, and code maintainability.',
    iconName: 'Layout',
    accentColor: '#00F0FF',
    capabilities: [
      {
        title: 'Scalable SaaS Platforms',
        description: 'Multi-tenant cloud architectures engineered for rapid feature expansion, strict tenant isolation, and billing elasticity.',
        deliverables: ['Multi-tenant database schema', 'Stripe / LemonSqueezy billing engines', 'Granular team permissions & SSO']
      },
      {
        title: 'High-Performance Web Applications',
        description: 'Blazing-fast modern frontend architectures built with React, Next.js, TypeScript, and modern CSS engines.',
        deliverables: ['Core Web Vitals 95+ score', 'SSR & Edge caching strategies', 'Accessible WCAG 2.2 compliant UI']
      },
      {
        title: 'Cross-Platform Mobile Apps',
        description: 'Fluid, native-feeling iOS and Android products using React Native or Flutter with offline-first capabilities.',
        deliverables: ['Offline-sync data architecture', 'Biometric auth & secure storage', 'App Store / Play Store automated CI/CD']
      },
      {
        title: 'Bespoke Internal Tooling & Dashboards',
        description: 'Executive dashboards, operational cockpits, and real-time administrative tooling that streamline business decisions.',
        deliverables: ['Real-time WebSockets / SSE data sync', 'Custom data visualization components', 'Audit trails and logging']
      }
    ],
    businessOutcomes: [
      { metric: '<100ms', label: 'Average frontend interaction response latency' },
      { metric: '99.99%', label: 'Product availability and service uptime' },
      { metric: '3.5x', label: 'Faster time-to-market compared to traditional agencies' },
      { metric: '100%', label: 'Type safety across backend-frontend contracts' }
    ],
    techStack: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Go', 'Tailwind CSS', 'PostgreSQL', 'Redis', 'GraphQL'],
    sampleArchitecture: [
      { layer: 'Client Layer', tech: ['React 19', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
      { layer: 'API Gateway', tech: ['GraphQL', 'tRPC', 'Kong Gateway', 'Cloudflare Workers'] },
      { layer: 'Business Services', tech: ['Go microservices', 'Node.js / Express', 'Temporal Workflows'] },
      { layer: 'Persistence', tech: ['PostgreSQL (Neon/Supabase)', 'Redis Cache', 'S3 Object Storage'] }
    ]
  },
  {
    id: 'cloud-engineering',
    slug: 'cloud-engineering',
    title: 'Cloud & Engineering',
    subtitle: 'Elastic infrastructure, automated DevOps & modern microservices',
    shortDescription: 'Cloud architecture, APIs, DevOps, integrations, and scalable infrastructure engineered to handle massive workloads without downtime.',
    fullDescription: 'We design resilient cloud foundations that scale effortlessly from thousands to millions of requests. By utilizing Infrastructure as Code (Terraform), Kubernetes orchestration, and automated CI/CD pipelines, we ensure zero-downtime releases and cloud cost efficiency.',
    iconName: 'Cloud',
    accentColor: '#6366F1',
    capabilities: [
      {
        title: 'Cloud Architecture & Migration',
        description: 'Well-Architected AWS, Google Cloud, and Azure architectures designed for fault tolerance and minimal blast radius.',
        deliverables: ['Multi-region redundancy', 'Terraform / Pulumi IaC scripts', 'Cloud spend optimization audit']
      },
      {
        title: 'Kubernetes & Container Orchestration',
        description: 'Production-ready container clusters with automated horizontal pod autoscaling, service mesh, and ingress control.',
        deliverables: ['EKS / GKE cluster setup', 'Istio / Linkerd service mesh', 'Helm charts & GitOps with ArgoCD']
      },
      {
        title: 'Automated CI/CD & DevSecOps',
        description: 'GitOps pipelines that test, build, lint, and deploy artifacts automatically with zero human friction.',
        deliverables: ['GitHub Actions / GitLab CI workflows', 'Container image vulnerability scanning', 'Automated canary & blue-green deploys']
      },
      {
        title: 'API Mesh & Microservice Modernization',
        description: 'Decoupling monolithic systems into clean, domain-driven microservices with robust gRPC and event buses.',
        deliverables: ['gRPC & Protobuf definitions', 'Distributed tracing with OpenTelemetry', 'Rate-limiting & DDoS mitigation']
      }
    ],
    businessOutcomes: [
      { metric: '45%', label: 'Average cloud infrastructure bill reduction' },
      { metric: '0 min', label: 'Downtime during continuous blue-green deployments' },
      { metric: '10x', label: 'Increase in deployment frequency with automated CI/CD' },
      { metric: '<5 min', label: 'Disaster recovery MTTR with automated failover' }
    ],
    techStack: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'ArgoCD', 'Prometheus', 'Grafana', 'GitHub Actions'],
    sampleArchitecture: [
      { layer: 'Edge & CDN', tech: ['Cloudflare Enterprise', 'AWS CloudFront', 'WAF Rules'] },
      { layer: 'Compute Cluster', tech: ['Kubernetes (EKS/GKE)', 'AWS ECS Fargate', 'Serverless Lambdas'] },
      { layer: 'Message Bus', tech: ['Apache Kafka', 'AWS SQS/SNS', 'RabbitMQ'] },
      { layer: 'Observability', tech: ['Datadog', 'Prometheus', 'Grafana', 'OpenTelemetry'] }
    ]
  },
  {
    id: 'data-security',
    slug: 'data-security',
    title: 'Data & Security',
    subtitle: 'Intelligent analytics, data engineering & enterprise protection',
    shortDescription: 'Modern data pipelines, business intelligence dashboards, secure architectures, and data-driven engineering that safeguard your IP.',
    fullDescription: 'Data is the engine of modern business, but only if it is clean, accessible, and uncompromisingly protected. Dev Pride delivers streaming data warehouses, predictive telemetry, and Zero Trust security architectures hardened against modern cyber threats.',
    iconName: 'ShieldCheck',
    accentColor: '#10B981',
    capabilities: [
      {
        title: 'Streaming & Batch Data Pipelines',
        description: 'High-throughput ETL/ELT pipelines ingesting heterogeneous telemetry, transaction logs, and user events.',
        deliverables: ['dbt models & transformation', 'Apache Spark / Airflow orchestrations', 'Data lakehouse schema on Snowflake / BigQuery']
      },
      {
        title: 'Enterprise Analytics & BI Cockpits',
        description: 'Interactive analytics dashboards delivering real-time executive visibility and automated metric anomalies.',
        deliverables: ['Real-time aggregation engines', 'Custom embedded chart widgets', 'Automated metric anomaly alerts']
      },
      {
        title: 'Zero Trust Architecture & Security Hardening',
        description: 'Defense-in-depth security posture with end-to-end encryption, strict IAM boundaries, and runtime auditing.',
        deliverables: ['mTLS service communication', 'SOC2 / HIPAA readiness compliance', 'Automated penetration testing routines']
      },
      {
        title: 'Data Governance & Privacy Safeguards',
        description: 'Enterprise data lineage tracking, automated PII masking, and GDPR/CCPA regulatory compliance controls.',
        deliverables: ['Automated PII scrubbing pipelines', 'Data residency controls', 'Granular columnar access policies']
      }
    ],
    businessOutcomes: [
      { metric: '100M+', label: 'Events processed per day without data lag' },
      { metric: 'SOC 2', label: 'Type II compliance architecture alignment' },
      { metric: '99.99%', label: 'Data consistency across distributed nodes' },
      { metric: '0', label: 'Critical security vulnerabilities in audited codebases' }
    ],
    techStack: ['Snowflake', 'BigQuery', 'dbt', 'Apache Kafka', 'PostgreSQL', 'Airflow', 'Vault', 'Wiz', 'OpenFGA'],
    sampleArchitecture: [
      { layer: 'Ingestion Layer', tech: ['Kafka Event Streams', 'Vector Log Collectors', 'Webhook Gateways'] },
      { layer: 'Processing Engine', tech: ['dbt Core', 'Apache Spark', 'Python Dataflow'] },
      { layer: 'Storage & Lakehouse', tech: ['Snowflake', 'Google BigQuery', 'ClickHouse OLAP'] },
      { layer: 'Security & Access', tech: ['HashiCorp Vault', 'OpenFGA ReBAC', 'mTLS Envoys'] }
    ]
  }
];
