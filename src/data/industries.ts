import { IndustryItem } from '../types';

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'saas-startups',
    slug: 'saas-startups',
    name: 'SaaS & Startups',
    iconName: 'Zap',
    description: 'Transforming novel tech ideas into defensible, hyper-scalable cloud products with rapid iteration and bulletproof multi-tenant engineering.',
    keyChallenges: [
      'Need to launch MVP rapidly without accumulating lethal tech debt',
      'Complex multi-tenant security and tenant data isolation',
      'Elastic usage-based billing and subscription lifecycle management'
    ],
    devPrideApproach: 'We combine battle-tested modular architectures with modern continuous deployment systems, allowing fast-growth startups to ship new features weekly while maintaining 99.99% availability.',
    impactMetrics: [
      { stat: '3.5x', text: 'Faster release velocity for venture-backed teams' },
      { stat: '100%', text: 'Strict tenant data isolation compliance' }
    ],
    typicalUseCases: [
      'Multi-tenant B2B SaaS platforms',
      'AI-native co-pilots and workflow extensions',
      'Product-led growth (PLG) self-serve onboarding funnels'
    ]
  },
  {
    id: 'finance-fintech',
    slug: 'finance-fintech',
    name: 'Finance & FinTech',
    iconName: 'TrendingUp',
    description: 'Mission-critical transactional systems, automated regulatory compliance, and high-frequency analytical engines.',
    keyChallenges: [
      'Strict regulatory compliance across multiple jurisdictions (KYC/AML, SOC 2, ISO 27001)',
      'High-throughput, zero-loss transactional consistency',
      'Real-time fraud detection and suspicious activity mitigation'
    ],
    devPrideApproach: 'We design immutable audit logs, double-entry ledger databases, and automated AI monitoring pipelines that catch anomalies in milliseconds before settlement.',
    impactMetrics: [
      { stat: '<5ms', text: 'Financial transaction ledger latency' },
      { stat: '99.4%', text: 'Autonomous KYC/AML verification accuracy' }
    ],
    typicalUseCases: [
      'Digital wallets & automated payment orchestrators',
      'Real-time risk scoring and credit underwriting engines',
      'Automated financial disclosure and compliance auditing'
    ]
  },
  {
    id: 'ecommerce-retail',
    slug: 'ecommerce-retail',
    name: 'E-commerce & Retail',
    iconName: 'ShoppingBag',
    description: 'Next-generation headless commerce architectures, dynamic omnichannel pricing, and predictive inventory mesh networks.',
    keyChallenges: [
      'High cart abandonment caused by slow storefront rendering',
      'Inventory synchronization discrepancies across distributed fulfillment centers',
      'Traffic spikes during seasonal drops collapsing checkout infrastructure'
    ],
    devPrideApproach: 'We construct headless storefronts on global edge networks with sub-second page loads, distributed Redis inventory locking, and personalized AI merchandising.',
    impactMetrics: [
      { stat: '+34%', text: 'Mobile conversion increase via Edge SSR' },
      { stat: '120k+', text: 'Concurrent checkout capacity without queue delays' }
    ],
    typicalUseCases: [
      'High-speed headless commerce storefronts',
      'Predictive inventory allocation and multi-warehouse routing',
      'AI-driven contextual product recommendation engines'
    ]
  },
  {
    id: 'healthcare-healthtech',
    slug: 'healthcare-healthtech',
    name: 'Healthcare & HealthTech',
    iconName: 'Activity',
    description: 'HIPAA-compliant telehealth platforms, EHR data interoperability, and intelligent clinical decision support systems.',
    keyChallenges: [
      'Fragmented health records locked in legacy proprietary EHR formats',
      'Strict patient data privacy and HIPAA/HITECH statutory requirements',
      'High friction in patient onboarding and remote clinical adherence'
    ],
    devPrideApproach: 'We implement zero-knowledge encryption, HL7/FHIR data normalization buses, and intuitive mobile patient portals with secure WebRTC video consultations.',
    impactMetrics: [
      { stat: '100%', text: 'HIPAA & SOC 2 Type II audit readiness' },
      { stat: '2.6x', text: 'Increase in patient trial recruitment efficiency' }
    ],
    typicalUseCases: [
      'FHIR-compliant health data interoperability pipelines',
      'Telemedicine suites with integrated e-prescriptions',
      'AI-assisted clinical trial eligibility screening'
    ]
  },
  {
    id: 'education-edtech',
    slug: 'education-edtech',
    name: 'Education & EdTech',
    iconName: 'GraduationCap',
    description: 'Interactive learning management platforms, automated grading assistants, and adaptive curriculum engines.',
    keyChallenges: [
      'Low course completion rates due to non-interactive content',
      'High instructor grading overhead for open-ended assignments',
      'Scalability challenges during synchronized global exams'
    ],
    devPrideApproach: 'We build adaptive learning platforms that personalize pacing via predictive algorithms and leverage generative AI to provide instant student feedback.',
    impactMetrics: [
      { stat: '65%', text: 'Increase in student module completion rates' },
      { stat: '80%', text: 'Reduction in instructor administrative grading time' }
    ],
    typicalUseCases: [
      'Adaptive learning management platforms (LMS)',
      'Automated coding and essay evaluation sandboxes',
      'Synchronized virtual interactive classrooms'
    ]
  },
  {
    id: 'real-estate-proptech',
    slug: 'real-estate-proptech',
    name: 'Real Estate & PropTech',
    iconName: 'Building',
    description: 'Automated property valuation models, tenant portals, and asset management platforms.',
    keyChallenges: [
      'Disparate MLS data feeds with inconsistent formatting',
      'Manual lease generation and protracted digital signature workflows',
      'Inefficient facility management and maintenance dispatching'
    ],
    devPrideApproach: 'We architect normalized real-time property data pipelines, automated lease document generation, and smart facility dispatch systems.',
    impactMetrics: [
      { stat: '5x', text: 'Faster MLS feed normalization and publishing' },
      { stat: '40%', text: 'Reduction in tenant maintenance ticket resolution time' }
    ],
    typicalUseCases: [
      'Automated AVM (Automated Valuation Model) engines',
      'Commercial tenant portals and lease lifecycle managers',
      'Smart building IoT telemetry and energy optimization'
    ]
  },
  {
    id: 'professional-services',
    slug: 'professional-services',
    name: 'Professional Services',
    iconName: 'Briefcase',
    description: 'Knowledge management engines, automated document intelligence, and legal/consulting operational platforms.',
    keyChallenges: [
      'Institutional knowledge siloed across thousands of scattered documents',
      'High billable hours wasted on manual document redlining and formatting',
      'Complex client onboarding and multi-stakeholder approval loops'
    ],
    devPrideApproach: 'We deploy private enterprise cognitive search copilots, automated contract redlining agents, and centralized client collaboration workspaces.',
    impactMetrics: [
      { stat: '75%', text: 'Time saved on complex internal document discovery' },
      { stat: '4x', text: 'Faster client onboarding contract sign-off' }
    ],
    typicalUseCases: [
      'Private enterprise RAG cognitive search engines',
      'Contract clause extraction and risk analysis tools',
      'Client engagement portals with granular permission gates'
    ]
  }
];
