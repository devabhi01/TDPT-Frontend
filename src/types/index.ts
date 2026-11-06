export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    description: string;
    href: string;
    icon?: string;
  }[];
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  accentColor?: string;
  capabilities: {
    title: string;
    description: string;
    deliverables: string[];
  }[];
  businessOutcomes: {
    metric: string;
    label: string;
  }[];
  techStack: string[];
  sampleArchitecture: {
    layer: string;
    tech: string[];
  }[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  tagline: string;
  problem: string;
  solution: string;
  architectureHighlights: string[];
  results: {
    value: string;
    label: string;
    context: string;
  }[];
  technologies: string[];
  deliverables: string[];
  duration: string;
  featured: boolean;
}

export interface IndustryItem {
  id: string;
  slug: string;
  name: string;
  iconName: string;
  description: string;
  keyChallenges: string[];
  devPrideApproach: string;
  impactMetrics: {
    stat: string;
    text: string;
  }[];
  typicalUseCases: string[];
}

export interface TechCategory {
  id: string;
  category: string;
  description: string;
  tools: {
    name: string;
    badge: string;
    purpose: string;
  }[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  featured?: boolean;
}

export interface ProjectInquiryData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
}
