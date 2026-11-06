import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { COMPANY_INFO } from '../data/company';
import { ShieldCheck, Target, Terminal, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About Us | Engineering Excellence & Vision"
        description="The Dev Pride Technology is a modern technology and software engineering company dedicated to building AI systems, scalable software, and resilient cloud architectures."
        canonical="https://thedevpride.com/about"
      />

      {/* Hero */}
      <section className="page-hero pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-500/[0.04] blur-[120px] pointer-events-none rounded-full" />

        <Container size="default">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="brand" pulse={true}>ABOUT DEV PRIDE</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Engineering Rigor Meets <br />
              <span className="text-brand-gradient">Business Conviction</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              We are not a generic outsourcing agency. We are an elite engineering and product partner building the technological bedrock for high-growth enterprises and ambitious software companies.
            </p>
          </div>
        </Container>
      </section>

      {/* Origin & Philosophy */}
      <section className="py-20 bg-dark-900/60 border-y border-white/[0.08]">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase text-brand-400 tracking-wider">
                Our Foundational Philosophy
              </span>
              <h2 className="text-3xl font-bold text-white leading-tight">
                Why "The Dev Pride Technology" Exists
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                The software industry is crowded with surface-level agencies that deliver brittle codebases, miss delivery dates, and treat client projects like ticket punch cards.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Dev Pride was founded on an unapologetic standard of <strong>craftsmanship</strong>. We believe that scalable architecture, clean typing, strict test coverage, and human-centered design are not luxuries—they are the essential ingredients of long-term software enterprise value.
              </p>
              <div className="pt-2">
                <Button to="/contact" variant="primary" size="md" withArrow>
                  Start a Conversation
                </Button>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-dark-850 border border-white/10 shadow-2xl space-y-6">
              <div className="text-xs font-mono uppercase text-slate-400">
                Guiding Principles
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">No Shortcuts</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      We never sacrifice security or maintainability for temporary speed. Everything we build is architected for real-world resilience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Commercial Impact</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Every architectural decision is tied directly to customer acquisition, operational efficiency, or system availability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Radical Transparency</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Direct git commits, bi-weekly functional demos, and unvarnished architectural trade-off evaluations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Operational Standard */}
      <section className="py-24 bg-dark-950">
        <Container size="wide">
          <SectionHeading
            eyebrow="OPERATIONAL STANDARDS"
            title="The Dev Pride Quality Benchmark"
            highlight="Quality Benchmark"
            subtitle="Every single project delivered by Dev Pride adheres to non-negotiable engineering thresholds."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: 'Strict Type Safety',
                desc: 'End-to-end TypeScript contracts across client, edge, and backend services to eliminate runtime surprises.',
                icon: 'Code',
              },
              {
                title: 'Sub-100ms Latency',
                desc: 'Optimized SQL queries, redis caching, and edge-distributed rendering for instantaneous customer interactions.',
                icon: 'Zap',
              },
              {
                title: 'Automated CI/CD',
                desc: 'Every PR undergoes automated security scanning, unit testing, and ephemeral branch previews.',
                icon: 'GitBranch',
              },
              {
                title: 'Zero Trust Security',
                desc: 'Principle of least privilege, encrypted data channels, and automated compliance auditing out of the box.',
                icon: 'Shield',
              },
            ].map((std) => (
              <div
                key={std.title}
                className="p-6 rounded-2xl bg-dark-900 border border-white/10 hover:border-brand-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{std.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{std.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-900/40 border-t border-white/[0.08]">
        <Container size="default">
          <div className="p-10 rounded-3xl bg-dark-850 border border-white/10 text-center space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Ready to collaborate with senior engineers?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
              Let's review your product specifications or architectural challenges and construct an actionable implementation roadmap.
            </p>
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Schedule Engineering Consultation
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

