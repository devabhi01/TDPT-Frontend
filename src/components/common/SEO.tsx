import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  schema?: Record<string, unknown>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description = 'The Dev Pride Technology builds AI-powered digital products, intelligent automation systems, and scalable software solutions for ambitious businesses.',
  keywords = 'The Dev Pride Technology, Dev Pride, AI automation, software engineering, cloud architecture, SaaS development, enterprise tech',
  canonical,
  schema,
}) => {
  const fullTitle = title
    ? `${title} | The Dev Pride Technology`
    : 'The Dev Pride Technology | AI Systems, Digital Products & Scalable Engineering';

  useEffect(() => {
    // Update Title
    document.title = fullTitle;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Canonical link
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonical);
    }

    // JSON-LD Structured Data
    if (schema) {
      const scriptId = 'json-ld-schema';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }, [fullTitle, description, keywords, canonical, schema]);

  return null;
};
