import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layout, Cloud, ShieldCheck, Check } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { SOLUTIONS_DATA } from '../../data/solutions';

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Layout,
  Cloud,
  ShieldCheck,
};

export const SolutionsSection: React.FC = () => {
  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-dark-950 scroll-mt-20">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <Container size="wide">
        <SectionHeading
          eyebrow="CORE CAPABILITIES"
          title="Architected for Outcomes, Engineered to Scale"
          highlight="Engineered to Scale"
          subtitle="We focus on four foundational pillars of modern digital engineering. We eliminate technological friction so your business can move with conviction."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {SOLUTIONS_DATA.map((solution, idx) => {
            const Icon = iconMap[solution.iconName] || Cpu;

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/[0.08] hover:border-brand-500/40 transition-all duration-300 shadow-xl hover:shadow-glow-sm overflow-hidden"
              >
                {/* Subtle corner glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-500/10 rounded-full blur-2xl group-hover:bg-brand-500/20 transition-all duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon & Metric Badge */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-dark-850 border border-white/10 flex items-center justify-center text-brand-400 group-hover:text-brand-300 group-hover:scale-105 group-hover:border-brand-500/30 transition-all duration-300 shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>

                    {solution.businessOutcomes[0] && (
                      <div className="px-3 py-1.5 rounded-full bg-dark-850 border border-white/10 text-right">
                        <span className="text-xs font-mono font-bold text-brand-400">
                          {solution.businessOutcomes[0].metric}
                        </span>{' '}
                        <span className="text-[11px] text-slate-400 font-mono">
                          {solution.businessOutcomes[0].label.split(' ')[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors duration-200">
                    {solution.title}
                  </h3>
                  <p className="text-xs font-mono text-brand-400 uppercase tracking-wider mt-1 mb-3">
                    {solution.subtitle}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {solution.shortDescription}
                  </p>

                  {/* Key Capabilities List */}
                  <div className="space-y-2 mb-8 border-t border-white/5 pt-4">
                    {solution.capabilities.slice(0, 3).map((cap) => (
                      <div key={cap.title} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <div className="w-4 h-4 rounded-full bg-brand-500/15 flex items-center justify-center mt-0.5 shrink-0 text-brand-400">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span>{cap.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Learn More Link */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {solution.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/solutions/${solution.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-300 group-hover:translate-x-1 transition-all duration-200"
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
