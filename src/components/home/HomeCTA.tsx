import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ShieldCheck, Clock, Sparkles } from 'lucide-react';

export const HomeCTA: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-dark-950">
      <Container size="default">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-10 sm:p-16 border border-white/15 bg-gradient-to-br from-dark-850 via-dark-900 to-dark-950 shadow-2xl overflow-hidden text-center"
        >
          {/* Ambient luminous glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Badge */}
          <div className="relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready For Production Scale?</span>
          </div>

          {/* Heading & Copy */}
          <h2 className="relative text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Have a challenge worth solving?
          </h2>

          <p className="relative mt-5 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Tell us what you're building. We'll help turn the idea into a scalable digital product, resilient cloud architecture, or autonomous AI system.
          </p>

          {/* CTAs */}
          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg" withArrow>
              Start a Project
            </Button>
            <Button to="/solutions" variant="secondary" size="lg">
              Explore Our Solutions
            </Button>
          </div>

          {/* Guarantees */}
          <div className="relative mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-400" />
              <span>Response in &lt; 24 business hours</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Strict mutual NDA protected</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
