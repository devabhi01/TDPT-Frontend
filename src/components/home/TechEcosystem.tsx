import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { TECH_CATEGORIES } from '../../data/technologies';
import { Code2 } from 'lucide-react';

export const TechEcosystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TECH_CATEGORIES[0].id);

  const currentCategory = TECH_CATEGORIES.find((cat) => cat.id === activeTab) || TECH_CATEGORIES[0];

  return (
    <section className="py-24 relative overflow-hidden bg-dark-900/40 border-y border-white/[0.08]">
      <Container size="wide">
        <SectionHeading
          eyebrow="TECHNOLOGY ARCHITECTURE"
          title="Battle-Tested Ecosystem. Zero Vendor Lock-In."
          highlight="Zero Vendor Lock-In"
          subtitle="We select tools based on latency profiles, maintainability, type safety, and ecosystem maturity—not hype cycles."
          align="center"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 mb-12">
          {TECH_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-500 text-dark-950 shadow-glow-sm scale-105'
                    : 'bg-dark-850/80 text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {cat.category}
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-8">
              <div>
                <span className="text-xs font-mono uppercase text-brand-400">
                  Engineering Stack
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {currentCategory.category}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md">
                {currentCategory.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCategory.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-4 rounded-2xl bg-dark-850/60 border border-white/5 hover:border-brand-500/30 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-brand-400 border border-white/10">
                      {tool.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tool.purpose}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
};
