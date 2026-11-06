import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { COMPANY_INFO } from '../../data/company';
import {
  Terminal,
  Target,
  Cpu,
  Maximize2,
  ShieldCheck,
  Handshake,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Terminal,
  Target,
  Cpu,
  Maximize2,
  ShieldCheck,
  Handshake,
};

export const WhyUsSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-dark-900/40 border-y border-white/[0.08]">
      <Container size="wide">
        <SectionHeading
          eyebrow="WHY DEV PRIDE"
          title="Engineered Differently. Built for Durability."
          highlight="Engineered Differently"
          subtitle="We reject superficial agency fluff. We partner with product and executive teams to build foundational software that accelerates velocity and stands the test of scale."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {COMPANY_INFO.principles.map((principle, idx) => {
            const Icon = iconMap[principle.icon] || Terminal;

            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-8 rounded-2xl bg-dark-850/60 border border-white/5 hover:border-brand-500/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-brand-400 group-hover:text-brand-300 group-hover:border-brand-500/40 transition-colors mb-6 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors mb-2">
                  {principle.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
