import React from 'react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { ArrowLeft, Home, Terminal } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The requested route does not exist on the Dev Pride platform."
      />

      <section className="py-32 relative text-center">
        <Container size="narrow">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mx-auto">
              <Terminal className="w-8 h-8" />
            </div>

            <div className="text-sm font-mono text-brand-400">
              HTTP 404 • ROUTE UNRESOLVED
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Page Not Found
            </h1>

            <p className="text-base text-slate-300 max-w-md mx-auto leading-relaxed">
              The endpoint or document you requested cannot be located in the current system deployment.
            </p>

            <div className="pt-4 flex items-center justify-center gap-4">
              <Button to="/" variant="primary" size="md" withArrow>
                Return Home
              </Button>
              <Button to="/solutions" variant="secondary" size="md">
                View Solutions
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
