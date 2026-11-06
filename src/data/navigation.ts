import { NavItem } from '../types';

export const MAIN_NAVIGATION: NavItem[] = [
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      {
        label: 'AI & Automation',
        description: 'Autonomous workflows, LLM agents & cognitive systems',
        href: '/solutions/ai-automation',
        icon: 'Cpu'
      },
      {
        label: 'Software & Digital Products',
        description: 'High-performance web apps, SaaS & custom software',
        href: '/solutions/software-digital-products',
        icon: 'Layout'
      },
      {
        label: 'Cloud & Engineering',
        description: 'Elastic cloud infrastructure, DevOps & APIs',
        href: '/solutions/cloud-engineering',
        icon: 'Cloud'
      },
      {
        label: 'Data & Security',
        description: 'Streaming pipelines, analytics & Zero Trust security',
        href: '/solutions/data-security',
        icon: 'ShieldCheck'
      }
    ]
  },
  {
    label: 'Industries',
    href: '/industries'
  },
  {
    label: 'Work',
    href: '/work'
  },
  {
    label: 'Products',
    href: '/products'
  },
  {
    label: 'Insights',
    href: '/insights'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Careers',
    href: '/careers'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

export const FOOTER_LINKS = {
  solutions: [
    { label: 'AI & Automation', href: '/solutions/ai-automation' },
    { label: 'Software & Digital Products', href: '/solutions/software-digital-products' },
    { label: 'Cloud & Engineering', href: '/solutions/cloud-engineering' },
    { label: 'Data & Security', href: '/solutions/data-security' },
    { label: 'All Solutions Overview', href: '/solutions' }
  ],
  industries: [
    { label: 'SaaS & Startups', href: '/industries#saas-startups' },
    { label: 'Finance & FinTech', href: '/industries#finance-fintech' },
    { label: 'E-commerce & Retail', href: '/industries#ecommerce-retail' },
    { label: 'Healthcare & HealthTech', href: '/industries#healthcare-healthtech' },
    { label: 'Logistics & Supply Chain', href: '/industries#saas-startups' }
  ],
  company: [
    { label: 'About Dev Pride', href: '/about' },
    { label: 'Case Studies', href: '/work' },
    { label: 'Our Products', href: '/products' },
    { label: 'Careers', href: '/careers' },
    { label: 'Engineering Insights', href: '/insights' },
    { label: 'Engineering Process', href: '/about#process' },
    { label: 'Contact & Inquiry', href: '/contact' }
  ],
  resources: [
    { label: 'System Architecture Blueprints', href: '/insights' },
    { label: 'Open Source & Stack', href: '/about#stack' },
    { label: 'Security & Compliance', href: '/solutions/data-security' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' }
  ]
};
