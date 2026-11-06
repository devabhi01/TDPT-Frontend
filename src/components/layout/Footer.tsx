import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FOOTER_LINKS } from '../../data/navigation';
import { COMPANY_INFO } from '../../data/company';
import { useTheme } from '../../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/brand/the-dev-pride-logo-dark.png' : '/brand/the-dev-pride-logo-light.png';
  return <footer className="site-footer">
  <div className="site-footer-top"><div><p className="studio-eyebrow">GOOD THINGS BEGIN WITH A CONVERSATION</p><h2>Let’s make something<br/><em>matter.</em></h2></div><Link to="/contact" className="site-footer-cta">Tell us what you have in mind <ArrowUpRight size={17}/></Link></div>
  <div className="site-footer-grid"><div className="site-footer-about"><Link to="/" className="site-wordmark" aria-label="The Dev Pride Technology home"><img className={`site-brand-logo ${theme === 'dark' ? 'logo-blend-dark' : 'logo-blend-light'}`} src={logoSrc} alt="The Dev Pride Technology" /></Link><p>We bring design thinking and deep engineering together to make useful technology for the real world.</p><a href={`mailto:${COMPANY_INFO.contact.email}`}>{COMPANY_INFO.contact.email}<ArrowUpRight size={13}/></a></div>
    <div><h3>CAPABILITIES</h3>{FOOTER_LINKS.solutions.slice(0,4).map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}</div>
    <div><h3>STUDIO</h3>{FOOTER_LINKS.company.slice(0,5).map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}</div>
    <div><h3>ELSEWHERE</h3>{FOOTER_LINKS.resources.slice(3).map((item) => <Link key={item.href} to={item.href}>{item.label}</Link>)}<p className="site-footer-location">{COMPANY_INFO.contact.location}</p></div>
  </div>
  <div className="site-footer-bottom"><span>© {new Date().getFullYear()} THE DEV PRIDE TECHNOLOGY</span><span>MADE WITH CARE, EVERYWHERE.</span><Link to="/privacy">PRIVACY · TERMS</Link></div>
</footer>;
};
