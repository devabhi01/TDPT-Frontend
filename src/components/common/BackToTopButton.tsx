import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const slideToTop = () => {
    const startPosition = window.scrollY;
    const duration = 550;
    let start: number | null = null;

    function easeInOutQuad(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    function step(currentTime: number) {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const run = easeInOutQuad(elapsed, startPosition, -startPosition, duration);
      window.scrollTo(0, run);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, 0);
      }
    }

    requestAnimationFrame(step);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={slideToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-dark-900/90 hover:bg-dark-850 border border-white/15 hover:border-brand-500/50 text-slate-300 hover:text-brand-400 shadow-2xl backdrop-blur-xl flex items-center justify-center cursor-pointer group"
          aria-label="Slide to top of page"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
