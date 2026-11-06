import React from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, AudioLines, Blocks, Braces, Compass, MoveUpRight, Shield, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductsSpotlight } from '../components/products/ProductsSpotlight';
import { SEO } from '../components/common/SEO';
import { COMPANY_INFO } from '../data/company';

const disciplines = [
  { no: '01', icon: Workflow, title: 'Applied AI', line: 'Useful intelligence, built into the way your business works.', href: '/solutions/ai-automation', note: 'AI systems & automation' },
  { no: '02', icon: Blocks, title: 'Digital products', line: 'Thoughtful software that makes difficult work feel simple.', href: '/solutions/software-digital-products', note: 'Products & platforms' },
  { no: '03', icon: Braces, title: 'Cloud & platforms', line: 'Reliable foundations for products that need room to grow.', href: '/solutions/cloud-engineering', note: 'Cloud & engineering' },
  { no: '04', icon: Shield, title: 'Data & security', line: 'Clearer decisions and resilient systems, from the ground up.', href: '/solutions/data-security', note: 'Data & protection' },
];

export const HomePage: React.FC = () => <>
  <SEO title="Digital products, designed for what comes next" description="Dev Pride is an independent technology studio building considered digital products, applied AI, and dependable software for ambitious teams." canonical="https://thedevpride.com/" />
  <section className="studio-hero">
    <div className="studio-hero-top"><span><i /> INDEPENDENT TECHNOLOGY STUDIO</span><span>DESIGN · ENGINEERING · PARTNERSHIP</span></div>
    <div className="studio-hero-grid">
      <div className="studio-hero-copy"><p className="studio-eyebrow">A clearer way to build what’s next.</p><h1>Make the complex<br />feel <em>considered.</em></h1><p className="studio-intro">We partner with ambitious teams to turn difficult ideas into useful software, intelligent systems, and products people want to use.</p><div className="studio-actions"><Link className="studio-button" to="/contact">Tell us what you’re building <ArrowUpRight size={17} /></Link><Link className="studio-text-link" to="/work">Selected work <ArrowRight size={16} /></Link></div><div className="studio-hero-caption"><span>01 — 04</span><span>WE MAKE TECHNOLOGY<br />FEEL HUMAN</span></div></div>
      <div className="studio-art" aria-label="Abstract composition of layered forms"><div className="studio-art-caption"><span>FIELD NOTES / DP—001</span><span>45° 31′ N<br />73° 34′ W</span></div><div className="studio-art-shape shape-disc"/><div className="studio-art-shape shape-cutout"/><div className="studio-art-shape shape-bar"/><div className="studio-art-shape shape-orbit"><span /></div><div className="studio-art-stamp">DP<br /><span>STUDIO</span></div><div className="studio-art-bottom"><span>FORM FOLLOWS<br />FUNCTION.</span><span>FIG. 01</span></div></div>
    </div>
    <div className="studio-hero-foot"><span>BUILDING WITH INTENTION SINCE 2018</span><a href="#approach">SCROLL TO EXPLORE <ArrowDownRight size={14} /></a></div>
  </section>

  <section className="studio-intro-band" id="approach"><div className="studio-section-index">01 <span>OUR POINT OF VIEW</span></div><div className="studio-intro-band-copy"><h2>Good technology is felt<br />long before it’s noticed.</h2><div><p>It’s the confidence to move quickly. The calm of a system that simply works. The small details that make a big change feel natural.</p><p>We bring design thinking and deep engineering together to make those moments happen.</p><Link to="/about" className="studio-underlined">A little about us <ArrowUpRight size={15} /></Link></div></div></section>

  <section className="studio-disciplines"><div className="studio-section-heading"><div><p className="studio-eyebrow">WHAT WE DO</p><h2>Four disciplines.<br /><em>One thoughtful team.</em></h2></div><Link to="/solutions" className="studio-circle-link" aria-label="Explore all solutions"><ArrowUpRight /></Link></div><div className="studio-discipline-list">{disciplines.map(({ no, icon: Icon, title, line, href, note }) => <Link to={href} className="studio-discipline" key={no}><span className="discipline-number">{no}</span><span className="discipline-icon"><Icon size={21} strokeWidth={1.5} /></span><span className="discipline-copy"><small>{note}</small><strong>{title}</strong><span>{line}</span></span><MoveUpRight className="discipline-arrow" size={19} /></Link>)}</div></section>

  <section className="studio-feature"><div className="studio-feature-image"><div className="feature-grid-lines"/><div className="feature-graphic"><div className="feature-ring ring-a"/><div className="feature-ring ring-b"/><div className="feature-core"><AudioLines size={32} strokeWidth={1.3}/></div><span className="feature-label label-a">SIGNAL / 01</span><span className="feature-label label-b">IDEA → IMPACT</span></div><span className="feature-image-caption">A SYSTEM THAT LEARNS AS IT WORKS</span></div><div className="studio-feature-copy"><p className="studio-eyebrow">A BETTER KIND OF INTELLIGENCE</p><h2>AI with a job<br />to <em>do.</em></h2><p>We build practical AI into real workflows: with clear boundaries, measurable outcomes, and people firmly in control.</p><Link to="/solutions/ai-automation" className="studio-underlined">Explore applied AI <ArrowUpRight size={15}/></Link><span className="studio-feature-index">02 <span>CAPABILITY SPOTLIGHT</span></span></div></section>

  <ProductsSpotlight />

  <section className="studio-approach"><div className="studio-approach-head"><p className="studio-eyebrow">HOW WE WORK</p><h2>Careful thinking.<br /><em>Confident making.</em></h2><p>Senior people, close collaboration, and a steady hand from the first question to the last detail.</p></div><div className="studio-steps">{COMPANY_INFO.processSteps.slice(0, 4).map((step) => <article key={step.step}><span>{step.step}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div><Link to="/about#process" className="studio-underlined">See how we work <ArrowUpRight size={15}/></Link></section>

  <section className="studio-work-callout"><div><p className="studio-eyebrow">THE WORK SPEAKS</p><h2>Built for the<br /><em>real world.</em></h2><p>From the first version to the next million users, we make products ready for the moments that matter.</p><Link to="/work" className="studio-button">Explore selected work <ArrowUpRight size={17}/></Link></div><div className="work-callout-art"><div className="work-window"><div><span/><span/><span/></div><section><b>northstar</b><span>Make room<br />for better.</span><i>↗</i></section><footer><span>STRATEGY / PRODUCT / ENGINEERING</span><span>CASE 001</span></footer></div><span className="work-art-orbit orbit-one"/><span className="work-art-orbit orbit-two"/><span className="work-art-index">DP / WORK 2026</span></div></section>

  <section className="studio-contact-band"><div className="studio-section-index">03 <span>YOUR NEXT CHAPTER</span></div><div><h2>Have a knotty<br />problem? <em>Good.</em></h2><p>Tell us what you’re trying to change. We’ll help you find a thoughtful way forward.</p><Link to="/contact" className="studio-button studio-button-light">Start a conversation <ArrowUpRight size={17}/></Link></div><Compass className="contact-compass" strokeWidth={0.7}/></section>
</>;
