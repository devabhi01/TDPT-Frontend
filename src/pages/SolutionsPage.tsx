import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { SOLUTIONS_DATA } from '../data/solutions';
import { Cpu, Layout, Cloud, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Layout,
  Cloud,
  ShieldCheck,
};

export const SolutionsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Solutions & Capabilities | Enterprise Engineering"
        description="Explore The Dev Pride Technology's core engineering domains: AI & Automation, Software & Digital Products, Cloud & Engineering, and Data & Security."
        canonical="https://thedevpride.com/solutions"
      />

      {/* Hero */}
      <section className="page-hero pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-500/[0.04] blur-[120px] pointer-events-none rounded-full" />

        <Container size="default">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="brand" pulse={true}>ENGINEERING CAPABILITIES</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Software Systems Engineered for <br />
              <span className="text-brand-gradient">Sovereign Performance</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              We design, build, and deploy production-grade software ecosystems across four key disciplines. Each domain is staffed by senior specialists with deep production expertise.
            </p>
          </div>
        </Container>
      </section>

      {/* 4 Core Pillars Grid */}
      <section className="py-20 bg-dark-900/40 border-y border-white/[0.08]">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SOLUTIONS_DATA.map((sol) => {
              const Icon = iconMap[sol.iconName] || Cpu;

              return (
                <div
                  key={sol.id}
                  className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-center text-brand-400 group-hover:scale-105 transition-transform shadow-md">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                        {sol.businessOutcomes[0]?.metric} {sol.businessOutcomes[0]?.label.split(' ')[0]}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                      {sol.title}
                    </h2>
                    <p className="text-xs font-mono text-brand-400 uppercase tracking-wider mt-1 mb-4">
                      {sol.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {sol.fullDescription}
                    </p>

                    <div className="space-y-3 mb-8">
                      <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
                        Included Capabilities:
                      </span>
                      {sol.capabilities.map((cap) => (
                        <div key={cap.title} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                          <div>
                            <strong className="text-white">{cap.title}:</strong> {cap.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {sol.techStack.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Button to={`/solutions/${sol.slug}`} variant="primary" size="sm" withArrow>
                      Explore Deep Dive
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Engagement Models */}
      <section className="py-24 bg-dark-950">
        <Container size="wide">
          <SectionHeading
            eyebrow="ENGAGEMENT FRAMEWORKS"
            title="How We Partner With Your Team"
            highlight="Partner With Your Team"
            subtitle="Transparent, flexible engagement models tailored to your product maturity and technical velocity."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Dedicated Product Squad',
                subtitle: 'Autonomous Full-Stack Pods',
                desc: 'Senior cross-functional team (Product Lead, Senior Frontend, Senior Backend, DevOps) dedicated exclusively to your roadmap sprints.',
                bestFor: 'Scale-ups & enterprises needing continuous velocity without the recruiting lag.',
                features: ['Full sprint planning & standups', 'Dedicated Slack/Teams channel', 'Bi-weekly deliverables & demos']
              },
              {
                title: 'Fixed-Scope Engineering',
                subtitle: 'Defined Deliverables & SLA',
                desc: 'We architect and build greenfield applications, AI copilots, or cloud migrations from discovery to production launch with guaranteed milestones.',
                bestFor: 'Companies with concrete product specifications and strict budget governance.',
                features: ['Comprehensive spec blueprinting', 'Guaranteed milestone dates', 'Post-launch 60-day warranty']
              },
              {
                title: 'Architecture Advisory',
                subtitle: 'Strategic Technical Guidance',
                desc: 'Deep code audits, security threat modeling, cloud cost rationalization, and guidance for your in-house engineering leads.',
                bestFor: 'CTOs and product founders needing elite validation prior to major investment rounds.',
                features: ['Production readiness audits', 'System latency profiling', 'Cloud cost reduction blueprint']
              }
            ].map((model) => (
              <div
                key={model.title}
                className="p-8 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/30 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-brand-400 uppercase tracking-wider">
                    {model.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-3">{model.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {model.desc}
                  </p>

                  <div className="p-3.5 rounded-xl bg-dark-850 border border-white/5 text-xs text-slate-300 mb-6">
                    <strong className="text-white block mb-1">Ideal For:</strong>
                    {model.bestFor}
                  </div>

                  <div className="space-y-2 mb-8">
                    {model.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button to="/contact" variant="outline" size="sm" className="w-full">
                  Inquire This Model
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

