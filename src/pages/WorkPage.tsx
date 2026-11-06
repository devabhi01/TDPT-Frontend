import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudy } from '../types';
import { ExternalLink, CheckCircle, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WorkPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [activeModal, setActiveModal] = useState<CaseStudy | null>(null);

  const filters = ['All', 'Finance & FinTech', 'Logistics & Supply Chain', 'Healthcare & HealthTech', 'E-commerce & Retail'];

  const filteredStudies = filter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((cs) => cs.industry === filter);

  return (
    <>
      <SEO
        title="Case Studies & Production Systems | Proven Engineering Outcomes"
        description="Explore how The Dev Pride Technology architects real-world enterprise software, AI automation pipelines, and high-throughput cloud platforms."
        canonical="https://thedevpride.com/work"
      />

      {/* Hero */}
      <section className="page-hero pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-500/[0.04] blur-[120px] pointer-events-none rounded-full" />

        <Container size="default">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="brand" pulse={true}>ENGINEERING PORTFOLIO</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Selected Systems & <br />
              <span className="text-brand-gradient">Production Architectures</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              A transparent look into our engineering work. Real operational problems, bespoke architectural solutions, and audited commercial outcomes.
            </p>

            {/* Filter pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    filter === f
                      ? 'bg-brand-500 text-dark-950 shadow-glow-sm'
                      : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-dark-950 border-t border-white/[0.08]">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredStudies.map((cs, idx) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      {cs.industry}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Timeline: {cs.duration}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors mb-2">
                    {cs.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                    {cs.tagline}
                  </p>

                  <div className="space-y-3 mb-6 bg-dark-850 p-4 rounded-2xl border border-white/5 text-xs">
                    <div>
                      <span className="font-mono uppercase text-slate-400 text-[10px] block mb-1">
                        The Challenge
                      </span>
                      <p className="text-slate-300 leading-relaxed">{cs.problem}</p>
                    </div>
                    <div className="border-t border-white/5 pt-2">
                      <span className="font-mono uppercase text-brand-400 text-[10px] block mb-1">
                        Dev Pride Solution
                      </span>
                      <p className="text-slate-300 leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {cs.results.map((res) => (
                      <div key={res.label} className="p-3 rounded-xl bg-dark-850 border border-white/5 text-center">
                        <div className="text-lg font-bold font-mono text-brand-gradient">
                          {res.value}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cs.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal(cs)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 cursor-pointer"
                  >
                    Deep Dive <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-dark-900 border border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono px-3 py-1 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    {activeModal.industry}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {activeModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {activeModal.tagline}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-dark-850 border border-white/5">
                  <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                    The Challenge
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeModal.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-dark-850 border border-white/5">
                  <div className="text-xs font-mono uppercase text-brand-400 mb-1">
                    Engineered Solution
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeModal.solution}
                  </p>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wider">
                  Architecture Highlights
                </div>
                <div className="space-y-2">
                  {activeModal.architectureHighlights.map((arch) => (
                    <div key={arch} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {activeModal.results.map((r) => (
                  <div key={r.label} className="p-3.5 rounded-xl bg-dark-850 border border-white/5">
                    <div className="text-xl font-bold font-mono text-brand-gradient">
                      {r.value}
                    </div>
                    <div className="text-xs text-slate-200 font-medium">{r.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{r.context}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {activeModal.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-850 text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Button to="/contact" variant="primary" size="sm" withArrow>
                  Start Similar Project
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

