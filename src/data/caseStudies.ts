import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'apexcore-ai-copilot',
    slug: 'apexcore-ai-copilot',
    title: 'ApexCore Autonomous Workflow Engine',
    client: 'Enterprise Financial Operations Group',
    industry: 'Finance & FinTech',
    tagline: 'Autonomous multi-agent system orchestrating 120,000+ monthly financial compliance reviews with 99.4% accuracy.',
    problem: 'The client faced severe operational bottlenecks as compliance analysts manually audited complex trade disclosures and KYC filings across 14 jurisdictions, leading to 72-hour turnaround backlogs and escalating labor costs.',
    solution: 'Dev Pride engineered a secure, multi-agent AI pipeline utilizing LangGraph and fine-tuned LLMs with deterministic guardrails. The architecture includes automated multi-page PDF ingestion, dual-pass cross-validation, and an interactive analyst cockpit with complete auditable reasoning trees.',
    architectureHighlights: [
      'Multi-agent LangGraph topology with supervisory routing',
      'Hybrid dense-sparse vector store on Qdrant with tenant-level isolation',
      'Local model fallback failover system achieving zero vendor lock-in',
      'Air-gapped deployment capability with end-to-end data encryption'
    ],
    results: [
      { value: '84%', label: 'Turnaround Time Reduction', context: 'From 72 hours down to 11.5 minutes per case file' },
      { value: '99.4%', label: 'Compliance Audit Accuracy', context: 'Cross-validated against manual expert human audits' },
      { value: '$1.8M', label: 'Annual Operational Savings', context: 'Reallocating 40+ senior analysts to strategic risk tasks' }
    ],
    technologies: ['Python', 'FastAPI', 'LangGraph', 'Qdrant Vector DB', 'React 19', 'TypeScript', 'Docker', 'AWS Bedrock'],
    deliverables: ['Custom AI agent orchestrator', 'Interactive analyst web portal', 'Automated regulatory audit trail', 'CI/CD pipeline with synthetic test suite'],
    duration: '4 months from discovery to production rollout',
    featured: true
  },
  {
    id: 'veloce-b2b-cloud-saas',
    slug: 'veloce-b2b-cloud-saas',
    title: 'Veloce Global B2B Supply Chain Mesh',
    client: 'International Freight & Logistics Provider',
    industry: 'Logistics & Supply Chain',
    tagline: 'High-throughput microservices architecture processing 15M+ telemetry events per day with sub-50ms latency.',
    problem: 'Legacy monolithic architecture collapsed during peak freight holiday surges, resulting in dropped shipments, stale GPS positioning, and inability to integrate customer TMS and ERP APIs reliably.',
    solution: 'Dev Pride led a zero-downtime microservices modernization. We built an event-driven Go and Kafka streaming backbone, paired with an ultra-responsive React & Tailwind command center featuring real-time WebSockets and automated dispatch optimization algorithms.',
    architectureHighlights: [
      'Apache Kafka partitioned streaming engine handling 25,000 events/sec',
      'High-performance Go gRPC microservices with distributed OpenTelemetry tracing',
      'Multi-region Kubernetes deployment on AWS EKS with auto-scaling triggers',
      'Optimistic UI state with IndexedDB offline caching for field operators'
    ],
    results: [
      { value: '99.99%', label: 'System Uptime SLA', context: 'Zero outages through entire peak Q4 holiday surge' },
      { value: '42ms', label: 'P99 Event Latency', context: 'Down from 4.8 seconds on legacy relational database' },
      { value: '3.2x', label: 'Throughput Increase', context: 'Easily onboarding 200+ partner fleets without infra refactoring' }
    ],
    technologies: ['Go', 'Apache Kafka', 'Kubernetes', 'AWS EKS', 'React', 'TypeScript', 'Tailwind CSS', 'Redis', 'PostgreSQL'],
    deliverables: ['Event-driven streaming core', 'Real-time telemetry dashboard', 'External REST/GraphQL partner API', 'Terraform infrastructure blueprints'],
    duration: '6 months phased transition',
    featured: true
  },
  {
    id: 'nexushealth-clinical-platform',
    slug: 'nexushealth-clinical-platform',
    title: 'NexusHealth Secure Telehealth & Patient Data Engine',
    client: 'Digital Healthcare & Clinical Trials Network',
    industry: 'Healthcare & HealthTech',
    tagline: 'HIPAA-compliant patient engagement and automated clinical trial recruitment engine.',
    problem: 'Clinical trials struggled with high patient drop-off rates and stringent regulatory compliance hurdles that fragmented records across non-interoperable hospital EHR systems.',
    solution: 'We engineered a unified, end-to-end encrypted FHIR-compliant patient management platform. The platform features biometric authentication, automated eligibility screening through custom NLP parsers, and a zero-latency WebRTC video consultation suite.',
    architectureHighlights: [
      'HL7 / FHIR data mapping engine with automated schema normalization',
      'Zero-knowledge encryption for all PHI (Protected Health Information)',
      'Sub-200ms WebRTC multi-party telehealth pipeline with adaptive bitrate',
      'Automated SOC 2 Type II and HIPAA compliance monitoring'
    ],
    results: [
      { value: '260%', label: 'Trial Recruitment Velocity', context: 'Accelerating patient qualification from weeks to days' },
      { value: '100%', label: 'HIPAA & SOC 2 Compliance', context: 'Passed independent 3rd party penetration tests with zero flags' },
      { value: '4.9/5', label: 'Patient & Clinician CSAT', context: 'Over 65,000 clinical encounters conducted seamlessly' }
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL (RLS)', 'WebRTC', 'AWS HealthLake', 'HashiCorp Vault', 'Tailwind CSS'],
    deliverables: ['Patient iOS & Android applications', 'Clinician portal with EHR integration', 'Automated HIPAA compliance harness', 'Audit logging microservice'],
    duration: '5 months build & validation',
    featured: true
  },
  {
    id: 'hypercommerce-omnichannel-scale',
    slug: 'hypercommerce-omnichannel-scale',
    title: 'AuraStyle Headless Omnichannel Commerce Core',
    client: 'Global Direct-to-Consumer Retail Brand',
    industry: 'E-commerce & Retail',
    tagline: 'Sub-second headless storefront with intelligent predictive inventory allocation across 4 continents.',
    problem: 'Sluggish monolithic Shopify/WooCommerce store suffered from high cart abandonment rates (68%) during flash sales and struggled to maintain localized currency, tax, and inventory sync across 18 countries.',
    solution: 'Dev Pride architected an ultra-fast headless commerce platform with Edge SSR, global CDN caching, algorithmic inventory reserving via Redis, and an AI-driven personalized recommendation engine.',
    architectureHighlights: [
      'Edge SSR frontend deployed across 285+ global Cloudflare edge locations',
      'Distributed Redis locks ensuring zero overselling during flash drop events',
      'Predictive caching engine pre-warming catalog pages based on user traffic intent',
      'Algorithmic recommendation engine generating 18% higher Average Order Value'
    ],
    results: [
      { value: '98/100', label: 'Google Lighthouse Performance', context: 'Instantaneous page transitions with 0.8s Largest Contentful Paint' },
      { value: '+34%', label: 'Mobile Conversion Rate', context: 'Attributed directly to frictionless checkout flow and speed' },
      { value: '120,000', label: 'Concurrent Flash Shoppers', context: 'Sustained zero checkout queue failures during Black Friday' }
    ],
    technologies: ['React', 'Next.js Edge', 'TypeScript', 'Tailwind CSS', 'Redis', 'Stripe Global', 'Cloudflare Workers', 'GraphQL'],
    deliverables: ['Headless storefront architecture', 'Global inventory synchronization engine', 'Custom checkout pipeline', 'Real-time revenue analytics dashboard'],
    duration: '3.5 months sprint to launch',
    featured: false
  }
];
