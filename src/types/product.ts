export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  details?: string;
  developmentStory?: string;
  category: string;
  websiteUrl: string;
  imageUrl?: string;
  features: string[];
  status: 'published' | 'draft';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
