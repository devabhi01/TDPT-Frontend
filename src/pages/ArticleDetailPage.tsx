import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { ARTICLES_DATA } from '../data/insights';
import { ArrowLeft, Clock, Calendar, User, Share2, CheckCircle2 } from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES_DATA.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Dev Pride Technology',
      url: 'https://thedevpride.com',
    },
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonical={`https://thedevpride.com/insights/${article.slug}`}
        schema={articleSchema}
      />

      <article className="pt-12 pb-24 relative overflow-hidden">
        <Container size="narrow">
          {/* Back link */}
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-brand-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>

          {/* Header */}
          <div className="space-y-4 pb-8 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-brand-400 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
                {article.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.publishedAt}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400">
                <div className="w-8 h-8 rounded-full bg-dark-850 border border-white/10 flex items-center justify-center text-brand-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-200 font-semibold">{article.author.name}</div>
                  <div className="text-[11px] text-slate-400">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="py-10 space-y-8 text-base text-slate-300 leading-relaxed font-normal">
            {article.content.map((p, idx) => (
              <p key={idx} className="text-base sm:text-lg leading-relaxed">
                {p}
              </p>
            ))}

            <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4 my-8">
              <h3 className="text-xl font-bold text-white">
                Architectural Takeaways & Implementation Rules
              </h3>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 mt-1 shrink-0" />
                  <span>
                    Decouple business logic layers from foundational LLM providers to ensure seamless fallback and vendor independence.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 mt-1 shrink-0" />
                  <span>
                    Maintain deterministic validation gates (Pydantic / Zod contracts) on every synthetic input/output stream.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-400 mt-1 shrink-0" />
                  <span>
                    Implement distributed tracing and latency budgets across all inter-service mesh calls.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Conversion Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 text-center space-y-4 mt-8">
            <h3 className="text-2xl font-bold text-white">
              Need assistance architecting this in your product?
            </h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Our principal engineering group can evaluate your existing codebase and design a production-ready rollout.
            </p>
            <div className="pt-2">
              <Button to="/contact" variant="primary" size="md" withArrow>
                Start Engineering Scoping
              </Button>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
};
