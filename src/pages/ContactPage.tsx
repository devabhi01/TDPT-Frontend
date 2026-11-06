import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEO } from '../components/common/SEO';
import { submitProjectInquiry } from '../services/api';
import { ProjectInquiryData } from '../types';
import {
  ShieldCheck,
  Clock,
  Mail,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Send,
  Building,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const SERVICE_OPTIONS = [
  'AI & Automation',
  'Web Application',
  'Mobile Application',
  'SaaS / Digital Product',
  'Cloud & DevOps',
  'Data & Analytics',
  'Security',
  'Consulting',
  'Other',
];

const BUDGET_OPTIONS = [
  '< $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
];

const TIMELINE_OPTIONS = [
  '< 1 Month',
  '1 - 3 Months',
  '3 - 6 Months',
  'Flexible / Long-term',
];

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('product')?.slice(0, 100);
  const [formData, setFormData] = useState<ProjectInquiryData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: productName ? 'SaaS / Digital Product' : 'AI & Automation',
    budget: '$25,000 - $50,000',
    timeline: '1 - 3 Months',
    details: productName ? `I’m interested in learning more about ${productName}.` : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name or organization is required.';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Please describe what you are looking to build.';
    } else if (formData.details.trim().length < 15) {
      newErrors.details = 'Please provide a bit more detail (minimum 15 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      const res = await submitProjectInquiry(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setServerError('An unexpected network error occurred. Please try again or email us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: 'AI & Automation',
      budget: '$25,000 - $50,000',
      timeline: '1 - 3 Months',
      details: '',
    });
    setErrors({});
  };

  return (
    <>
      <SEO
        title="Start a Project | Engineering Inquiry & Scoping"
        description="Initiate an engineering project with The Dev Pride Technology. Fast 24-hour turnaround, mutual NDA protection, and direct access to senior system architects."
        canonical="https://thedevpride.com/contact"
      />

      {/* Hero */}
      <section className="page-hero page-hero-compact pt-16 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-brand-500/[0.04] blur-[120px] pointer-events-none rounded-full" />

        <Container size="default">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <Badge variant="brand" pulse={true}>PROJECT CONSULTATION</Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Start Your <br />
              <span className="text-brand-gradient">Engineering Project</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Tell us what you're building. Every inquiry is reviewed directly by our senior technical directors—never by non-technical sales staff.
            </p>
          </div>
        </Container>
      </section>

      {/* Form & Sidebar Grid */}
      <section className="py-12 pb-24 bg-dark-950">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Form Column (7 cols) */}
            <div className="lg:col-span-8">
              <div className="p-8 sm:p-12 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl relative">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center mx-auto text-brand-400 shadow-glow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h2 className="text-3xl font-bold text-white">
                      Inquiry Successfully Received
                    </h2>

                    <p className="text-base text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Dev Pride, <strong>{formData.name}</strong>. Our senior engineering leads are reviewing your project requirements.
                    </p>

                    <div className="p-5 rounded-2xl bg-dark-850 border border-white/5 max-w-lg mx-auto text-left text-xs font-mono space-y-2 text-slate-300">
                      <div><strong className="text-white">Service:</strong> {formData.service}</div>
                      <div><strong className="text-white">Company:</strong> {formData.company}</div>
                      <div><strong className="text-white">Timeline:</strong> {formData.timeline}</div>
                      <div><strong className="text-white">Response SLA:</strong> Under 24 business hours</div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                      <Button onClick={handleReset} variant="outline" size="sm">
                        Submit Another Inquiry
                      </Button>
                      <Button to="/" variant="primary" size="sm">
                        Return Home
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {serverError && (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{serverError}</span>
                      </div>
                    )}

                    {/* Step 1: Contact Details */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-brand-500/20 text-brand-400 text-xs font-mono flex items-center justify-center">1</span>
                        Your Information
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Full Name <span className="text-brand-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Sarah Jenkins"
                            className={`w-full bg-dark-850 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-colors ${
                              errors.name ? 'border-rose-500/60' : 'border-white/10 focus:border-brand-500/60'
                            }`}
                          />
                          {errors.name && <span className="text-[11px] text-rose-400 mt-1 block">{errors.name}</span>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Work Email <span className="text-brand-400">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="sarah@company.com"
                            className={`w-full bg-dark-850 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-colors ${
                              errors.email ? 'border-rose-500/60' : 'border-white/10 focus:border-brand-500/60'
                            }`}
                          />
                          {errors.email && <span className="text-[11px] text-rose-400 mt-1 block">{errors.email}</span>}
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Company / Organization <span className="text-brand-400">*</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Technologies"
                            className={`w-full bg-dark-850 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-colors ${
                              errors.company ? 'border-rose-500/60' : 'border-white/10 focus:border-brand-500/60'
                            }`}
                          />
                          {errors.company && <span className="text-[11px] text-rose-400 mt-1 block">{errors.company}</span>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                            Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-dark-850 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/40 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Service Selection */}
                    <div className="pt-4 border-t border-white/5">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-brand-500/20 text-brand-400 text-xs font-mono flex items-center justify-center">2</span>
                        Service Required
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {SERVICE_OPTIONS.map((srv) => {
                          const isSelected = formData.service === srv;
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => setFormData({ ...formData, service: srv })}
                              className={`p-3 rounded-xl text-xs font-semibold transition-all border text-left cursor-pointer ${
                                isSelected
                                  ? 'bg-brand-500/15 border-brand-500 text-brand-300 shadow-glow-sm'
                                  : 'bg-dark-850 border-white/5 text-slate-300 hover:border-white/15'
                              }`}
                            >
                              {srv}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Budget & Timeline */}
                    <div className="pt-4 border-t border-white/5">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-brand-500/20 text-brand-400 text-xs font-mono flex items-center justify-center">3</span>
                        Budget & Desired Timeline
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Estimated Budget
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {BUDGET_OPTIONS.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setFormData({ ...formData, budget: b })}
                                className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                                  formData.budget === b
                                    ? 'bg-brand-500/15 border-brand-500 text-brand-300'
                                    : 'bg-dark-850 border-white/5 text-slate-400 hover:border-white/15'
                                }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Desired Launch Timeline
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {TIMELINE_OPTIONS.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setFormData({ ...formData, timeline: t })}
                                className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                                  formData.timeline === t
                                    ? 'bg-brand-500/15 border-brand-500 text-brand-300'
                                    : 'bg-dark-850 border-white/5 text-slate-400 hover:border-white/15'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 4: Details */}
                    <div className="pt-4 border-t border-white/5">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-brand-500/20 text-brand-400 text-xs font-mono flex items-center justify-center">4</span>
                        What are you looking to build? <span className="text-brand-400">*</span>
                      </h3>

                      <div>
                        <textarea
                          id="details"
                          rows={4}
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          placeholder="Describe the system, problem, target users, or architectural goals..."
                          className={`w-full bg-dark-850 border rounded-xl p-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-colors ${
                            errors.details ? 'border-rose-500/60' : 'border-white/10 focus:border-brand-500/60'
                          }`}
                        />
                        {errors.details && <span className="text-[11px] text-rose-400 mt-1 block">{errors.details}</span>}
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        isLoading={isLoading}
                        withArrow
                      >
                        Submit Project Inquiry
                      </Button>
                      <p className="text-center text-xs text-slate-400 mt-3 font-mono">
                        Guaranteed response in &lt; 24 business hours • Strict mutual NDA protected
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Trust Box */}
              <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6 shadow-xl">
                <span className="text-xs font-mono uppercase text-brand-400 tracking-wider">
                  The Dev Pride Commitment
                </span>

                <h3 className="text-xl font-bold text-white leading-snug">
                  What Happens Next?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Under 24h Review</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        A senior solutions architect analyzes your requirements and prepares initial architecture notes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Mutual NDA Protected</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        We execute our standard bilateral NDA before inspecting confidential codebase repos or data schemas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Direct Technical Scoping</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                        A 30-minute discovery call directly with the engineering lead assigned to your engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="p-8 rounded-3xl bg-dark-850 border border-white/5 space-y-4">
                <div className="text-xs font-mono uppercase text-slate-400">
                  Direct Inquiries
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-brand-400" />
                    <a href="mailto:contact@thedevpride.com" className="hover:text-brand-300 transition-colors">
                      contact@thedevpride.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building className="w-4 h-4 text-brand-400" />
                    <span>Global Remote-First HQ Hub</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

