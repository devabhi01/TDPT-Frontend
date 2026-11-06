import React from 'react';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { Badge } from '../components/common/Badge';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy | The Dev Pride Technology"
        description="Privacy policy and data governance practices of The Dev Pride Technology."
        canonical="https://thedevpride.com/privacy"
      />

      <section className="py-20">
        <Container size="narrow">
          <Badge variant="brand" pulse={true} className="mb-4">LEGAL & COMPLIANCE</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Privacy Policy
          </h1>
          <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <p>
              Last Updated: October 2026. The Dev Pride Technology ("Dev Pride", "we", "our") respects your privacy and is dedicated to protecting client information and proprietary data schemas.
            </p>
            <h3 className="text-lg font-bold text-white pt-4">1. Data Ingestion & Purpose</h3>
            <p>
              We collect information provided directly through our project inquiry forms (such as name, work email, company, and project scope) strictly for evaluating engineering requirements, technical scoping, and bilateral NDA execution.
            </p>
            <h3 className="text-lg font-bold text-white pt-4">2. Career Applications</h3>
            <p>
              If you apply through our careers page, we collect your name, email, the role you applied for or are interested in, preferred employment type, location, optional profile link, introduction, and your required PDF resume. Resume files are stored on the application server's local disk and are available to administrators reviewing applications. We use these details to review applications and consider open applicants for future opportunities. You may contact us to request access to or removal of your application details.
            </p>
            <h3 className="text-lg font-bold text-white pt-4">3. Zero Third-Party Monetization</h3>
            <p>
              We never sell, rent, or lease client information or submitted project blueprints to third parties or advertising networks.
            </p>
            <h3 className="text-lg font-bold text-white pt-4">4. Security Standards</h3>
            <p>
              All customer communications are encrypted using TLS 1.3 in transit and stored in SOC 2 compliant encrypted databases with strict role-based access controls.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};
