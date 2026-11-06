import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(scrollableHeight > 0 ? Math.min(1, Math.max(0, totalScroll / scrollableHeight)) : 0);
      setIsScrolled(totalScroll > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, isScrolled };
};
