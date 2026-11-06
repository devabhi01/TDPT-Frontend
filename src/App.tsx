import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PageLayout } from './components/layout/PageLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { AdminPage } from './pages/AdminPage';
import { ThemeProvider } from './context/ThemeContext';

// Immediate load for the primary landing experience
import { HomePage } from './pages/HomePage';

// Code-split pages for high-speed performance
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then(m => ({ default: m.SolutionsPage })));
const AISolutionPage = lazy(() => import('./pages/AISolutionPage').then(m => ({ default: m.AISolutionPage })));
const DigitalProductsPage = lazy(() => import('./pages/DigitalProductsPage').then(m => ({ default: m.DigitalProductsPage })));
const CloudEngineeringPage = lazy(() => import('./pages/CloudEngineeringPage').then(m => ({ default: m.CloudEngineeringPage })));
const DataSecurityPage = lazy(() => import('./pages/DataSecurityPage').then(m => ({ default: m.DataSecurityPage })));
const IndustriesPage = lazy(() => import('./pages/IndustriesPage').then(m => ({ default: m.IndustriesPage })));
const WorkPage = lazy(() => import('./pages/WorkPage').then(m => ({ default: m.WorkPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const InsightsPage = lazy(() => import('./pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const ArticleDetailPage = lazy(() => import('./pages/ArticleDetailPage').then(m => ({ default: m.ArticleDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const CareerApplicationPage = lazy(() => import('./pages/CareerApplicationPage').then(m => ({ default: m.CareerApplicationPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const RouteLoadingFallback = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-dark-950">
    <div className="w-10 h-10 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center animate-pulse shadow-glow-sm">
      <div className="w-4 h-4 rounded-full bg-brand-400" />
    </div>
    <span className="mt-4 text-xs font-mono text-slate-400 tracking-wider">
      DEV PRIDE · STUDIO
    </span>
  </div>
);

const PageTransitionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    style={{ transform: 'translateZ(0)' }}
    className="will-change-transform"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return <Routes><Route path="/admin/*" element={<AdminPage />} /></Routes>;
  }

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransitionWrapper><HomePage /></PageTransitionWrapper>} />
            <Route path="/about" element={<PageTransitionWrapper><AboutPage /></PageTransitionWrapper>} />
            <Route path="/solutions" element={<PageTransitionWrapper><SolutionsPage /></PageTransitionWrapper>} />
            <Route path="/solutions/ai-automation" element={<PageTransitionWrapper><AISolutionPage /></PageTransitionWrapper>} />
            <Route path="/solutions/software-digital-products" element={<PageTransitionWrapper><DigitalProductsPage /></PageTransitionWrapper>} />
            <Route path="/solutions/cloud-engineering" element={<PageTransitionWrapper><CloudEngineeringPage /></PageTransitionWrapper>} />
            <Route path="/solutions/data-security" element={<PageTransitionWrapper><DataSecurityPage /></PageTransitionWrapper>} />
            <Route path="/industries" element={<PageTransitionWrapper><IndustriesPage /></PageTransitionWrapper>} />
            <Route path="/work" element={<PageTransitionWrapper><WorkPage /></PageTransitionWrapper>} />
            <Route path="/products" element={<PageTransitionWrapper><ProductsPage /></PageTransitionWrapper>} />
            <Route path="/products/:slug" element={<PageTransitionWrapper><ProductDetailPage /></PageTransitionWrapper>} />
            <Route path="/insights" element={<PageTransitionWrapper><InsightsPage /></PageTransitionWrapper>} />
            <Route path="/insights/:slug" element={<PageTransitionWrapper><ArticleDetailPage /></PageTransitionWrapper>} />
            <Route path="/contact" element={<PageTransitionWrapper><ContactPage /></PageTransitionWrapper>} />
            <Route path="/careers" element={<PageTransitionWrapper><CareersPage /></PageTransitionWrapper>} />
            <Route path="/careers/apply/:jobId" element={<PageTransitionWrapper><CareerApplicationPage /></PageTransitionWrapper>} />
            <Route path="/privacy" element={<PageTransitionWrapper><PrivacyPage /></PageTransitionWrapper>} />
            <Route path="/terms" element={<PageTransitionWrapper><TermsPage /></PageTransitionWrapper>} />
            <Route path="*" element={<PageTransitionWrapper><NotFoundPage /></PageTransitionWrapper>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </PageLayout>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
