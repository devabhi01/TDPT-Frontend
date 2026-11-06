import React from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { SOLUTIONS_DATA } from '../data/solutions';
import { Layout, CheckCircle2, ArrowRight } from 'lucide-react';

export const DigitalProductsPage: React.FC = () => {
  const data = SOLUTIONS_DATA.find((s) => s.id === 'software-digital-products') || SOLUTIONS_DATA[1];

  return (
    <>
      <SEO
        title="Software & Digital Products | Web Apps & SaaS Engineering"
        description="Dev Pride engineers modern web applications, high-performance SaaS platforms, mobile apps, and custom software designed for scale and exceptional UX."
        canonical="https://thedevpride.com/solutions/software-digital-products"
      />

      {/* Hero */}
      <section className="page-hero pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-accent/[0.05] blur-[120px] pointer-events-none rounded-full" />

        <Container size="default">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="brand" pulse={true}>DIGITAL PRODUCTS</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Software & Digital <br />
              <span className="text-brand-gradient">Product Engineering</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {data.fullDescription}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button to="/contact" variant="primary" size="lg" withArrow>
                Start Product Build
              </Button>
              <Button to="/work" variant="secondary" size="lg">
                View Case Studies
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Outcomes */}
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

      {/* Capabilities */}
      <section className="py-24 bg-dark-950">
        <Container size="wide">
          <SectionHeading
            eyebrow="PRODUCT ENGINEERING"
            title="Engineered for Scalability, Styled for Conversion"
            highlight="Styled for Conversion"
            subtitle="We blend senior product design with resilient systems architecture to build digital experiences users love."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {data.capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-8 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/30 transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center">
                  <Layout className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.description}</p>

                <div className="pt-2 border-t border-white/5 space-y-2">
                  <span className="text-xs font-mono uppercase text-slate-400 tracking-wider block">
                    Engineering Deliverables:
                  </span>
                  {cap.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Architecture */}
      <section className="py-20 bg-dark-900/40 border-y border-white/[0.08]">
        <Container size="default">
          <SectionHeading
            eyebrow="ARCHITECTURE STACK"
            title="Clean Layered Product Topology"
            subtitle="Resilient microservices, edge renderers, and robust databases."
            align="center"
          />

          <div className="mt-12 space-y-4">
            {data.sampleArchitecture.map((layer, idx) => (
              <div
                key={layer.layer}
                className="p-6 rounded-2xl bg-dark-850 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-brand-accent/20 text-brand-accent font-mono text-xs flex items-center justify-center font-bold">
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
              Ready to engineer your next flagship product?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
              Share your product roadmap with our senior frontend and systems architects.
            </p>
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Start Project Inquiry
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

