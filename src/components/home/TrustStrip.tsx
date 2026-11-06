import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { COMPANY_INFO } from '../../data/company';
import { ShieldCheck, Server, Sparkles, Layers } from 'lucide-react';

const icons = [Layers, Server, Sparkles, ShieldCheck];

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-12 border-y border-white/[0.08] bg-dark-900/40 relative overflow-hidden">
      {/* Background ambient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      <Container size="wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {COMPANY_INFO.stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-dark-850/40 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight text-brand-gradient">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5 line-clamp-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
