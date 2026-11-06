import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { COMPANY_INFO } from '../../data/company';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden bg-dark-950">
      <Container size="wide">
        <SectionHeading
          eyebrow="ENGINEERING LIFECYCLE"
          title="From Discovery to Sovereign Scale"
          highlight="Sovereign Scale"
          subtitle="Our battle-tested 5-phase delivery model ensures predictable timelines, continuous visibility, and zero-compromise architectural rigor."
          align="center"
        />

        {/* Desktop Interactive Stepper */}
        <div className="hidden lg:block mt-16">
          {/* Progress bar line */}
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-brand-500 to-brand-accent -translate-y-1/2 transition-all duration-500"
              style={{ width: `${(activeStep / (COMPANY_INFO.processSteps.length - 1)) * 100}%` }}
            />

            <div className="relative flex justify-between">
              {COMPANY_INFO.processSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep >= idx;

                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-brand-500 text-dark-950 ring-4 ring-brand-500/20 scale-110 shadow-glow-sm'
                          : isPassed
                          ? 'bg-brand-500/20 text-brand-400 border border-brand-500/40'
                          : 'bg-dark-900 text-slate-400 border border-white/10 group-hover:border-white/30'
                      }`}
                    >
                      {step.step}
                    </div>
                    <span
                      className={`mt-3 text-xs font-mono uppercase tracking-wider transition-colors ${
                        isActive ? 'text-brand-400 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl relative overflow-hidden"
            >
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono px-3 py-1 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    Phase {COMPANY_INFO.processSteps[activeStep].step}
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    {COMPANY_INFO.processSteps[activeStep].title}: {COMPANY_INFO.processSteps[activeStep].tagline}
                  </h3>
                </div>
                <p className="text-base text-slate-400 leading-relaxed">
                  {COMPANY_INFO.processSteps[activeStep].description}
                </p>
              </div>

              <div className="col-span-5 bg-dark-850/80 p-6 rounded-2xl border border-white/5 space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key Deliverables
                </div>
                <div className="space-y-2.5">
                  {COMPANY_INFO.processSteps[activeStep].deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile / Tablet Accordion Timeline */}
        <div className="lg:hidden mt-12 space-y-4">
          {COMPANY_INFO.processSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-dark-900 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-mono text-xs font-bold">
                  {step.step}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs font-mono text-brand-400 mb-2">{step.tagline}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                {step.description}
              </p>
              <div className="border-t border-white/5 pt-3 space-y-1.5">
                {step.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-xs text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
