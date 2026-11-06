import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { MAIN_NAVIGATION } from '../../data/navigation';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useTheme } from '../../context/ThemeContext';

const publicNavItems = MAIN_NAVIGATION.slice(1).filter((item) => item.href !== '/careers' && item.href !== '/contact');

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const { progress, isScrolled } = useScrollProgress();
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/brand/the-dev-pride-logo-dark.png' : '/brand/the-dev-pride-logo-light.png';
  const location = useLocation();
  useEffect(() => { setMobileOpen(false); setSolutionsOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return <>
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header-inner">
        <Link to="/" className="site-wordmark" aria-label="The Dev Pride Technology home"><img className={`site-brand-logo ${theme === 'dark' ? 'logo-blend-dark' : 'logo-blend-light'}`} src={logoSrc} alt="The Dev Pride Technology" /></Link>
        <nav className="site-nav-desktop" aria-label="Main navigation">
          <div className="site-nav-dropdown" onMouseEnter={() => setSolutionsOpen(true)} onMouseLeave={() => setSolutionsOpen(false)}>
            <button className={`site-nav-link ${location.pathname.startsWith('/solutions') ? 'active' : ''}`} onClick={() => setSolutionsOpen(!solutionsOpen)} aria-expanded={solutionsOpen}>What we do <ArrowDown size={12} /></button>
            <AnimatePresence>{solutionsOpen && <motion.div className="site-nav-menu" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: .16 }}>
              <p>OUR DISCIPLINES</p>{MAIN_NAVIGATION[0].children?.map((item, index) => <Link to={item.href} key={item.href}><span>0{index + 1}</span><strong>{item.label}</strong><small>{item.description}</small><ArrowUpRight size={15} /></Link>)}<Link to="/solutions" className="site-nav-menu-all">All capabilities <ArrowUpRight size={14}/></Link>
            </motion.div>}</AnimatePresence>
          </div>
          {publicNavItems.map((item) => <Link key={item.href} to={item.href} className={`site-nav-link ${location.pathname === item.href || (item.href === '/insights' && location.pathname.startsWith('/insights/')) ? 'active' : ''}`}>{item.label}</Link>)}
        </nav>
        <Link to="/contact" className="site-nav-cta">Start a conversation <ArrowUpRight size={15}/></Link>
        <button className="site-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen}>{mobileOpen ? <X/> : <Menu/>}</button>
      </div>
      <div className="site-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
    <AnimatePresence>{mobileOpen && <motion.div className="site-mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <p className="studio-eyebrow">TAKE A LOOK AROUND</p><Link to="/" onClick={() => setMobileOpen(false)}>Home</Link><p className="site-mobile-label">WHAT WE DO</p>{MAIN_NAVIGATION[0].children?.map((item) => <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)}>{item.label}<ArrowUpRight size={15}/></Link>)}{publicNavItems.map((item) => <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)}>{item.label}<ArrowUpRight size={15}/></Link>)}<Link className="site-mobile-cta" to="/contact" onClick={() => setMobileOpen(false)}>Start a conversation <ArrowUpRight size={16}/></Link>
    </motion.div>}</AnimatePresence>
  </>;
};

