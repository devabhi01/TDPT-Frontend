import React from 'react';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { Badge } from '../components/common/Badge';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms of Service | The Dev Pride Technology"
        description="Terms of service and engineering engagement conditions for The Dev Pride Technology."
        canonical="https://thedevpride.com/terms"
      />

      <section className="py-20">
        <Container size="narrow">
          <Badge variant="brand" pulse={true} className="mb-4">LEGAL & TERMS</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Terms of Service
          </h1>
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <p>
              Last Updated: October 2026. These Terms of Service govern your use of the website and engagement with The Dev Pride Technology.
            </p>
            <h3 className="text-lg font-bold text-white pt-4">1. Master Services Agreements (MSA)</h3>
            <p>
              All software engineering, AI deployment, cloud infrastructure, and consulting engagements are governed by bespoke bilateral Master Services Agreements (MSAs) and Statements of Work (SOWs) signed between the parties.
            </p>
            <h3 className="text-lg font-bold text-white pt-4">2. Intellectual Property Rights</h3>
            <p>
              Unless explicitly specified otherwise in an individual SOW, all custom source code, models, pipelines, and architectural deliverables created for a client become the sole and exclusive intellectual property of the client upon settlement of invoices.
            </p>
            <h3 className="text-lg font-bold text-white pt-4">3. Warranties & Code Quality</h3>
            <p>
              Dev Pride warrants that all delivered software undergoes comprehensive unit testing and security verification prior to production sign-off.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};
