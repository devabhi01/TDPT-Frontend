import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ARTICLES_DATA } from '../../data/insights';

export const InsightsSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-dark-950">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            eyebrow="ENGINEERING INSIGHTS"
            title="Perspectives on Modern Systems Engineering"
            highlight="Systems Engineering"
            subtitle="Deep technical analysis, architecture post-mortems, and engineering patterns from our team."
            align="left"
            className="mb-0 md:mb-0 max-w-2xl"
          />

          <div className="mt-6 md:mt-0">
            <Button to="/insights" variant="outline" size="sm" withArrow>
              Explore All Articles
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {ARTICLES_DATA.slice(0, 3).map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col justify-between p-7 rounded-3xl bg-dark-900 border border-white/10 hover:border-brand-500/30 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="text-brand-400">{article.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <Link to={`/insights/${article.slug}`}>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-300 transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {article.author.name}
                </span>

                <Link
                  to={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 group-hover:translate-x-1 transition-transform"
                >
                  Read Paper <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
};
