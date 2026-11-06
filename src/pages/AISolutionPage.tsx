import React from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { SOLUTIONS_DATA } from '../data/solutions';
import { Cpu, CheckCircle2, ArrowRight, Zap, Shield, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AISolutionPage: React.FC = () => {
  const data = SOLUTIONS_DATA.find((s) => s.id === 'ai-automation') || SOLUTIONS_DATA[0];

  return (
    <>
      <SEO
        title="AI & Automation Engineering | Autonomous Workflows & Copilots"
        description="Dev Pride builds autonomous AI agents, enterprise LLM copilots, RAG knowledge pipelines, and intelligent process automation systems for high-growth enterprises."
        canonical="https://thedevpride.com/solutions/ai-automation"
      />

      {/* Hero */}
      <section className="page-hero pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-500/[0.05] blur-[120px] pointer-events-none rounded-full" />

        <Container size="default">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="brand" pulse={true}>COGNITIVE SYSTEMS</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              AI & Intelligent <br />
              <span className="text-brand-gradient">Automation Systems</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {data.fullDescription}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button to="/contact" variant="primary" size="lg" withArrow>
                Build AI Solution
              </Button>
              <Button to="/work" variant="secondary" size="lg">
                View Case Studies
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Outcomes Strip */}
      <section className="py-12 bg-dark-900/60 border-y border-white/[0.08]">
        <Container size="wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {data.businessOutcomes.map((out) => (
              <div key={out.label} className="p-5 rounded-2xl bg-dark-850 border border-white/5">
                <div className="text-3xl font-extrabold font-mono text-brand-gradient">
                  {out.metric}
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1 leading-snug">
                  {out.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Deep Capabilities Breakdown */}
      <section className="py-24 bg-dark-950">
        <Container size="wide">
          <SectionHeading
            eyebrow="ENTERPRISE CAPABILITIES"
            title="Production AI Built with Deterministic Control"
            highlight="Deterministic Control"
            subtitle="We engineer rigorous boundaries, state management, and continuous evaluation into every generative workflow."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {data.capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-8 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/30 transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.description}</p>

                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
                    Engineering Deliverables:
                  </span>
                  {cap.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Architecture Topology View */}
      <section className="py-20 bg-dark-900/40 border-y border-white/[0.08]">
        <Container size="default">
          <SectionHeading
            eyebrow="REFERENCE ARCHITECTURE"
            title="Layered Cognitive Pipeline Topology"
            subtitle="How we structure multi-agent and RAG systems to ensure low latency and high accuracy."
            align="center"
          />

          <div className="mt-12 space-y-4">
            {data.sampleArchitecture.map((layer, idx) => (
              <div
                key={layer.layer}
                className="p-6 rounded-2xl bg-dark-850 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 font-mono text-xs flex items-center justify-center font-bold">
                    0{idx + 1}
                  </span>
                  <h4 className="text-base font-bold text-white">{layer.layer}</h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {layer.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-dark-900 text-xs font-mono text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-950">
        <Container size="default">
          <div className="p-10 rounded-3xl bg-dark-850 border border-white/10 text-center space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Ready to automate critical workflows with AI?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
              Book a technical scoping session with our AI engineering architects. We'll evaluate feasibility and design a prototype roadmap.
            </p>
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Start AI Project
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

