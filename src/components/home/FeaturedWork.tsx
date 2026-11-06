import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { CASE_STUDIES } from '../../data/caseStudies';
import type { CaseStudy } from '../../types';

export const FeaturedWork: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  const totalStudies = CASE_STUDIES.length;

  const nextSlide = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalStudies);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalStudies) % totalStudies);
  };

  const currentStudy = CASE_STUDIES[currentIndex];

  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 40 : -40,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -40 : 40,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    }),
  };

  return (
    <section id="work" className="py-24 relative overflow-hidden bg-dark-900/60 border-y border-white/[0.08] scroll-mt-20">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="SELECTED CASE STUDIES"
            title="Engineered for Measurable Impact"
            highlight="Measurable Impact"
            subtitle="Explore how our engineering teams design, build, and deploy production software systems that solve mission-critical challenges."
            align="left"
            className="mb-0 md:mb-0 max-w-2xl"
          />

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <div className="flex items-center gap-2 mr-2">
              <button
                type="button"
                onClick={prevSlide}
                className="w-10 h-10 rounded-xl bg-dark-850 hover:bg-dark-800 border border-white/10 hover:border-brand-500/40 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                aria-label="Previous case study slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-10 h-10 rounded-xl bg-dark-850 hover:bg-dark-800 border border-white/10 hover:border-brand-500/40 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                aria-label="Next case study slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Button to="/work" variant="outline" size="sm" withArrow>
              View All Systems
            </Button>
          </div>
        </div>

        {/* Featured Case Study Slide Card */}
        <div className="relative min-h-[460px] lg:min-h-[420px]">
          <AnimatePresence custom={slideDirection} mode="wait">
            <motion.div
              key={currentStudy.id}
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full rounded-3xl bg-dark-850 border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Overview (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      {currentStudy.industry}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Duration: {currentStudy.duration}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Slide 0{currentIndex + 1} of 0{totalStudies}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-brand-300 transition-colors leading-tight">
                    {currentStudy.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {currentStudy.tagline}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-1">
                      <span className="font-mono uppercase text-slate-400 text-[10px] block">
                        The Challenge
                      </span>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {currentStudy.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-dark-900 border border-white/5 space-y-1">
                      <span className="font-mono uppercase text-brand-400 text-[10px] block">
                        Dev Pride Solution
                      </span>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {currentStudy.solution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCase(currentStudy)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 text-dark-950 font-semibold text-xs hover:bg-brand-400 transition-colors cursor-pointer shadow-glow-sm"
                    >
                      Inspect Full Architecture <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono text-slate-400">
                      Client: {currentStudy.client}
                    </span>
                  </div>
                </div>

                {/* Right Metrics Panel (5 cols) */}
                <div className="lg:col-span-5 bg-dark-900/90 p-8 rounded-3xl border border-white/5 space-y-5 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="text-xs font-mono uppercase text-brand-400 tracking-wider">
                      Audited Outcomes
                    </span>
                    <Sparkles className="w-4 h-4 text-brand-400" />
                  </div>

                  <div className="space-y-4">
                    {currentStudy.results.map((res) => (
                      <div
                        key={res.label}
                        className="p-4 rounded-2xl bg-dark-850/80 border border-white/5 flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{res.label}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">{res.context}</div>
                        </div>
                        <div className="text-2xl font-extrabold font-mono text-brand-gradient shrink-0">
                          {res.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono text-slate-400 block mb-2">
                      Core Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentStudy.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-850 text-slate-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {CASE_STUDIES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSlideDirection(idx > currentIndex ? 'right' : 'left');
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-brand-500 shadow-glow-sm'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to case study slide ${idx + 1}`}
            />
          ))}
        </div>
      </Container>

      {/* Case Study Deep-Dive Modal */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCase(null)}
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
                    {selectedCase.industry}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    {selectedCase.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                {selectedCase.tagline}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-dark-850 border border-white/5">
                  <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                    The Challenge
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedCase.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-dark-850 border border-white/5">
                  <div className="text-xs font-mono uppercase text-brand-400 mb-1">
                    Engineered Solution
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedCase.solution}
                  </p>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wider">
                  Architecture Highlights
                </div>
                <div className="space-y-2">
                  {selectedCase.architectureHighlights.map((arch) => (
                    <div key={arch} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {selectedCase.results.map((r) => (
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
                  {selectedCase.technologies.map((t) => (
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
    </section>
  );
};
