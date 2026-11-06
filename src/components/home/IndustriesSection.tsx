import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { INDUSTRIES_DATA } from '../../data/industries';
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
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  TrendingUp,
  ShoppingBag,
  Activity,
  GraduationCap,
  Building,
  Briefcase,
};

export const IndustriesSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = INDUSTRIES_DATA[selectedIndex];
  const CurrentIcon = iconMap[current.iconName] || Zap;

  return (
    <section className="py-24 relative overflow-hidden bg-dark-950">
      <Container size="wide">
        <SectionHeading
          eyebrow="DOMAIN EXPERTISE"
          title="Tailored for Regulated & High-Growth Sectors"
          highlight="High-Growth Sectors"
          subtitle="Different verticals demand distinct compliance architectures, data models, and performance tolerances. We speak your domain language."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          {/* Left Tabs Column (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            {INDUSTRIES_DATA.map((ind, idx) => {
              const Icon = iconMap[ind.iconName] || Zap;
              const isSelected = selectedIndex === idx;

              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 group cursor-pointer border ${
                    isSelected
                      ? 'bg-dark-850 border-brand-500/40 shadow-glow-sm'
                      : 'bg-dark-900/40 border-white/5 hover:bg-dark-900 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-brand-500 text-dark-950 font-bold'
                          : 'bg-white/5 text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-sm font-semibold transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {ind.name}
                    </span>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-brand-400 translate-x-0.5'
                        : 'text-slate-600 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Showcase Panel (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl space-y-8"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                      <CurrentIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{current.name}</h3>
                      <span className="text-xs font-mono text-brand-400">
                        Mission-Critical Architecture
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/20 transition-colors w-fit"
                  >
                    Consult on {current.name} →
                  </Link>
                </div>

                <p className="text-base text-slate-300 leading-relaxed font-normal">
                  {current.description}
                </p>

                {/* Grid: Challenges vs Approach */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-2xl bg-dark-850 border border-white/5 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Key Domain Obstacles
                    </span>
                    <div className="space-y-2">
                      {current.keyChallenges.map((ch) => (
                        <div key={ch} className="flex items-start gap-2 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400/80 mt-1.5 shrink-0" />
                          <span>{ch}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-dark-850 border border-white/5 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-400">
                      Dev Pride Engineering Solution
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {current.devPrideApproach}
                    </p>

                    <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2">
                      {current.impactMetrics.map((m) => (
                        <div key={m.stat} className="p-2 rounded-lg bg-dark-900 border border-white/5">
                          <div className="text-base font-bold font-mono text-brand-gradient">
                            {m.stat}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-tight">
                            {m.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Typical Production Deployments */}
                <div className="pt-4 border-t border-white/5">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                    Frequent Production Deployments
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {current.typicalUseCases.map((uc) => (
                      <div
                        key={uc}
                        className="p-3 rounded-xl bg-dark-850/60 border border-white/5 text-xs text-slate-200 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                        <span>{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};
