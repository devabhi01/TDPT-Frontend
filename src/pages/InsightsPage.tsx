import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { ARTICLES_DATA } from '../data/insights';
import { Clock, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const InsightsPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const allTags = ['All', 'Architecture', 'AI Agents', 'Microservices', 'Databases', 'React'];

  const filteredArticles = selectedTag === 'All'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((a) => a.tags.includes(selectedTag));

  return (
    <>
      <SEO
        title="Engineering Insights & Research | The Dev Pride Technology"
        description="Technical papers, architectural essays, and engineering post-mortems on AI agent workflows, microservices, and modern cloud scalability."
        canonical="https://thedevpride.com/insights"
      />

      {/* Hero */}
      <section className="page-hero pt-16 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-500/[0.04] blur-[120px] pointer-events-none rounded-full" />

        <Container size="default">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <Badge variant="brand" pulse={true}>ENGINEERING DISPATCHES</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Engineering Insights & <br />
              <span className="text-brand-gradient">Technical Research</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Practical architecture breakdowns, systems design patterns, and lessons learned building production software for global scale.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-brand-500 text-dark-950 shadow-glow-sm'
                      : 'bg-dark-850 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-dark-950 border-t border-white/[0.08]">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/30 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                    <span className="text-brand-400 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <Link to={`/insights/${article.slug}`}>
                    <h2 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors mb-4 leading-snug">
                      {article.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {article.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-400">
                    <User className="w-3.5 h-3.5 text-brand-400" />
                    <span>{article.author.name}</span>
                  </div>

                  <Link
                    to={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-brand-400 group-hover:translate-x-1 transition-transform"
                  >
                    Read Technical Paper <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

