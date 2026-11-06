import { ArticleItem } from '../types';

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'architecting-multi-agent-ai-systems',
    slug: 'architecting-multi-agent-ai-systems',
    title: 'Architecting Multi-Agent AI Systems: Moving Beyond Prompts to Stateful Graphs',
    excerpt: 'How leading engineering teams are replacing brittle prompt chains with state machines, deterministic guardrails, and persistent context loops.',
    category: 'AI & Engineering',
    readTime: '7 min read',
    publishedAt: '2026-09-15',
    author: {
      name: 'Dev Pride Architecture Team',
      role: 'Principal AI Architects'
    },
    tags: ['AI Agents', 'LangGraph', 'Architecture', 'Python'],
    featured: true,
    content: [
      'Single-prompt LLM wrappers have hit an architectural ceiling in the enterprise. When real business logic requires multi-step validation, tool execution, and rollback capabilities, linear prompts fail reliably.',
      'At Dev Pride, we structure production agentic systems as cyclic directed graphs (state machines). In this paradigm, every agent node has defined state boundaries, explicit tool access schemas, and deterministic verification gates before changes are committed to core databases.',
      'Key architectural principles include: 1) Isolating reasoning from execution; 2) Enforcing strict JSON schema validators on all agent outputs; 3) Implementing supervisory agents that perform sanity checks on downstream tasks; and 4) Maintaining an immutable audit log of token consumption and tool invocations.'
    ]
  },
  {
    id: 'from-monolith-to-event-driven-microservices',
    slug: 'from-monolith-to-event-driven-microservices',
    title: 'From Monolith to Event-Driven Microservices: An Engineering Blueprint',
    excerpt: 'A practical framework for breaking down legacy enterprise monoliths into resilient Kafka-backed microservices without downtime.',
    category: 'Cloud & Architecture',
    readTime: '9 min read',
    publishedAt: '2026-08-28',
    author: {
      name: 'Dev Pride Systems Group',
      role: 'Cloud Engineering Directors'
    },
    tags: ['Microservices', 'Kafka', 'Go', 'Distributed Systems'],
    featured: true,
    content: [
      'Deconstructing a legacy monolith is fundamentally a data synchronization challenge, not just a service decomposition exercise. Attempting a big-bang rewrite is the single most common cause of multi-million dollar software project failures.',
      'Our approach leverages the Strangler Fig pattern paired with Change Data Capture (CDC) via Debezium. By reading PostgreSQL write-ahead logs and streaming database mutation events into partitioned Kafka topics, newly extracted microservices can operate in parallel with zero impact on the legacy system.',
      'Once consumer consistency is proven over a multi-week observation window, incoming ingress routes are shifted via API gateways, completely eliminating risky cutovers.'
    ]
  },
  {
    id: 'zero-downtime-database-migrations',
    slug: 'zero-downtime-database-migrations',
    title: 'Zero-Downtime Database Migrations at Scale: Battle-Tested Patterns',
    excerpt: 'Techniques for executing non-blocking schema alterations, column renames, and table sharding on production databases handling thousands of queries per second.',
    category: 'Data & Reliability',
    readTime: '6 min read',
    publishedAt: '2026-07-19',
    author: {
      name: 'Dev Pride Data Engineering',
      role: 'Lead Infrastructure Engineers'
    },
    tags: ['PostgreSQL', 'Databases', 'Reliability', 'DevOps'],
    featured: true,
    content: [
      'Taking databases offline for scheduled maintenance windows is no longer acceptable in global, 24/7 B2B SaaS applications. A single lock wait timeout can cascade into thread pool exhaustion and widespread outages.',
      'We practice the Expand-Contract migration pattern: 1) Expand the schema with backward-compatible additive columns; 2) Deploy software that writes dual-paths to both legacy and modern columns; 3) Backfill historical rows in asynchronous micro-batches; 4) Switch reads to the new schema; 5) Contract by safely deprecating obsolete columns.',
      'Coupling this with automated statement timeout guards and locks acquisition thresholds ensures that migrations either succeed smoothly or abort instantly without impacting client requests.'
    ]
  },
  {
    id: 'modern-frontend-stack-edge-ssr',
    slug: 'modern-frontend-stack-edge-ssr',
    title: 'The Modern Frontend Architecture: Why Edge SSR and Micro-Interactions Drive Conversion',
    excerpt: 'Examining the tangible business impact of Core Web Vitals, Edge-rendered UI, and tactile micro-interactions on B2B conversion metrics.',
    category: 'Frontend Engineering',
    readTime: '5 min read',
    publishedAt: '2026-06-11',
    author: {
      name: 'Dev Pride Product UX Lab',
      role: 'Staff Frontend Engineers'
    },
    tags: ['React', 'UX Strategy', 'Performance', 'Tailwind'],
    featured: false,
    content: [
      'High performance is not just a technical vanity metric—it is the foundational prerequisite of user trust. In modern B2B software, users evaluate software quality within the first 300 milliseconds of interaction.',
      'By co-locating server compute at global edge nodes and streaming interactive HTML while non-critical islands hydrate asynchronously, we achieve sub-second Largest Contentful Paint worldwide.',
      'Furthermore, purposeful tactile feedback—subtle border glows on hover, crisp spring-based drawer transitions, and responsive button states—creates a feeling of mechanical solidity that translates into heightened brand authority.'
    ]
  }
];
