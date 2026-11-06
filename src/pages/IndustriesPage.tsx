import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { INDUSTRIES_DATA } from '../data/industries';
import {
  Zap,
  TrendingUp,
  ShoppingBag,
  Activity,
  GraduationCap,
  Building,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  TrendingUp,
  ShoppingBag,
  Activity,
  GraduationCap,
  Building,
  Briefcase,
};

export const IndustriesPage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <>
      <SEO
        title="Industries We Empower | Domain-Specific Engineering"
        description="Explore how The Dev Pride Technology architects scalable software, AI pipelines, and secure cloud platforms for SaaS, FinTech, E-commerce, HealthTech, and more."
        canonical="https://thedevpride.com/industries"
      />

      {/* Hero */}
      <section className="page-hero pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-500/[0.04] blur-[120px] pointer-events-none rounded-full" />

        <Container size="default">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="brand" pulse={true}>INDUSTRY VERTICALS</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Software Engineered for Your <br />
              <span className="text-brand-gradient">Specific Industry Demands</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              From stringent HIPAA health regulations and real-time FinTech ledgers to high-velocity e-commerce flash sales, we design architectures tailored to your sector's operational realities.
            </p>
          </div>
        </Container>
      </section>

      {/* Industry Cards List */}
      <section className="py-20 bg-dark-950 border-t border-white/[0.08]">
        <Container size="wide">
          <div className="space-y-12">
            {INDUSTRIES_DATA.map((ind, idx) => {
              const Icon = iconMap[ind.iconName] || Zap;

              return (
                <div
                  key={ind.id}
                  id={ind.id}
                  className="p-8 sm:p-12 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/30 transition-all duration-300 scroll-mt-28"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Info */}
                    <div className="lg:col-span-5 space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-xs font-mono text-brand-400 uppercase">
                            Vertical 0{idx + 1}
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-white">
                            {ind.name}
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                        {ind.description}
                      </p>

                      <div className="p-4 rounded-2xl bg-dark-850 border border-white/5 space-y-2">
                        <span className="text-xs font-mono uppercase text-brand-400">
                          Our Architectural Approach
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {ind.devPrideApproach}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {ind.impactMetrics.map((m) => (
                          <div key={m.stat} className="p-3 rounded-xl bg-dark-850 border border-white/5">
                            <div className="text-xl font-bold font-mono text-brand-gradient">
                              {m.stat}
                            </div>
                            <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                              {m.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Button to="/contact" variant="primary" size="sm" withArrow>
                          Discuss {ind.name} Project
                        </Button>
                      </div>
                    </div>

                    {/* Right: Challenges & Use Cases */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="p-6 rounded-2xl bg-dark-850 border border-white/5 space-y-3">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Industry Challenges Solved
                        </span>
                        <div className="space-y-2.5">
                          {ind.keyChallenges.map((ch) => (
                            <div key={ch} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                              <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                              <span>{ch}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-dark-850 border border-white/5 space-y-3">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Frequent Production Deployments
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ind.typicalUseCases.map((uc) => (
                            <div
                              key={uc}
                              className="p-3 rounded-xl bg-dark-900 border border-white/5 text-xs text-slate-200 flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                              <span>{uc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-900/40 border-t border-white/[0.08]">
        <Container size="default">
          <div className="p-10 rounded-3xl bg-dark-850 border border-white/10 text-center space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Don't see your specific sector listed?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
              Our core software and data engineering patterns transfer across all modern data-driven domains.
            </p>
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Discuss Your Industry Architecture
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

