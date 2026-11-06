import { TechCategory } from '../types';

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'ai',
    category: 'AI & Machine Learning',
    description: 'Foundational models, autonomous agent frameworks, vector databases, and evaluation infrastructure.',
    tools: [
      { name: 'LangGraph / LangChain', badge: 'Orchestration', purpose: 'Multi-agent stateful decision pipelines' },
      { name: 'LlamaIndex', badge: 'Data Framework', purpose: 'Advanced hierarchical RAG & vector indexing' },
      { name: 'Anthropic Claude & OpenAI', badge: 'Foundation LLMs', purpose: 'High-reasoning semantic synthesis' },
      { name: 'Qdrant & Pinecone', badge: 'Vector Search', purpose: 'High-throughput similarity search' },
      { name: 'Hugging Face & PyTorch', badge: 'Deep Learning', purpose: 'Custom fine-tuning & model quantization' },
      { name: 'Ollama & vLLM', badge: 'Local Inference', purpose: 'Low-latency self-hosted open-source inference' }
    ]
  },
  {
    id: 'frontend',
    category: 'Frontend Engineering',
    description: 'Component-driven, accessible, and high-performance interfaces engineered for speed and conversion.',
    tools: [
      { name: 'React 19', badge: 'Core Library', purpose: 'Server actions, concurrent rendering, and UI primitives' },
      { name: 'Next.js', badge: 'Full-Stack Framework', purpose: 'Edge rendering, SSR, and hybrid static generation' },
      { name: 'TypeScript', badge: 'Type Safety', purpose: 'Strict end-to-end type contracts across applications' },
      { name: 'Tailwind CSS', badge: 'Styling Engine', purpose: 'Utility-first design tokens and responsive systems' },
      { name: 'Framer Motion / Motion', badge: 'Animation', purpose: 'Fluid micro-interactions and layout transitions' },
      { name: 'Vite', badge: 'Build Tool', purpose: 'Sub-second HMR and optimized production bundles' }
    ]
  },
  {
    id: 'backend',
    category: 'Backend & Systems',
    description: 'Resilient APIs, concurrent microservices, and event buses designed for high concurrency.',
    tools: [
      { name: 'Go (Golang)', badge: 'Systems Language', purpose: 'Ultra-low latency microservices & concurrent workers' },
      { name: 'Node.js & TypeScript', badge: 'Runtime', purpose: 'Rapid API development with rich npm ecosystem' },
      { name: 'Python (FastAPI)', badge: 'AI & Data Services', purpose: 'High-speed async APIs for machine learning' },
      { name: 'gRPC & Protocol Buffers', badge: 'RPC Protocol', purpose: 'High-efficiency binary inter-service messaging' },
      { name: 'GraphQL & tRPC', badge: 'API Layer', purpose: 'Type-safe querying and client data fetching' },
      { name: 'Temporal.io', badge: 'Workflows', purpose: 'Fault-tolerant distributed durable execution' }
    ]
  },
  {
    id: 'cloud',
    category: 'Cloud Infrastructure',
    description: 'Multi-cloud architectures, edge computation, and serverless scalability.',
    tools: [
      { name: 'Amazon Web Services (AWS)', badge: 'Cloud Provider', purpose: 'Enterprise compute, storage, VPC, and serverless' },
      { name: 'Google Cloud Platform (GCP)', badge: 'Cloud Provider', purpose: 'BigQuery, Vertex AI, and GKE ecosystems' },
      { name: 'Cloudflare', badge: 'Edge & CDN', purpose: 'Global low-latency edge workers, DDoS & WAF' },
      { name: 'Supabase / Neon', badge: 'Serverless DB', purpose: 'Branchable Postgres with row-level security' },
      { name: 'Terraform & OpenTofu', badge: 'IaC', purpose: 'Declarative infrastructure as code repeatability' }
    ]
  },
  {
    id: 'data',
    category: 'Data & Databases',
    description: 'Relational, document, caching, and analytical lakehouses for fast real-time insights.',
    tools: [
      { name: 'PostgreSQL', badge: 'Relational Core', purpose: 'ACID compliance, JSONB, and pgvector extensions' },
      { name: 'Redis', badge: 'In-Memory Cache', purpose: 'Sub-millisecond caching, rate-limiting & session pub/sub' },
      { name: 'Apache Kafka', badge: 'Event Streaming', purpose: 'High-throughput durable real-time event logs' },
      { name: 'ClickHouse', badge: 'OLAP Analytics', purpose: 'Columnar storage for real-time aggregation queries' },
      { name: 'Snowflake & BigQuery', badge: 'Data Warehouse', purpose: 'Enterprise petabyte-scale business intelligence' },
      { name: 'dbt (data build tool)', badge: 'Transformations', purpose: 'Version-controlled modular SQL transformations' }
    ]
  },
  {
    id: 'devops',
    category: 'DevOps & Observability',
    description: 'Automated CI/CD pipelines, container orchestration, and continuous monitoring.',
    tools: [
      { name: 'Kubernetes (K8s)', badge: 'Orchestration', purpose: 'Container auto-scaling and self-healing clusters' },
      { name: 'Docker', badge: 'Containerization', purpose: 'Reproducible development and runtime images' },
      { name: 'GitHub Actions', badge: 'CI/CD Pipeline', purpose: 'Automated testing, linting, and GitOps deployments' },
      { name: 'Datadog & OpenTelemetry', badge: 'APM & Tracing', purpose: 'Full-stack distributed tracing and latency metrics' },
      { name: 'Prometheus & Grafana', badge: 'Metrics & Dashboards', purpose: 'Infrastructure telemetry and alert routing' },
      { name: 'HashiCorp Vault', badge: 'Secrets Management', purpose: 'Centralized dynamic secrets and credential rotation' }
    ]
  }
];
