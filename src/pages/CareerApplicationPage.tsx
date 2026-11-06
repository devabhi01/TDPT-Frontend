import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, CheckCircle2, CircleAlert, FileText, LoaderCircle, MapPin, Send, Trash2, Upload } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { CareerApplication, getOpenJobs, JobListing, submitCareerApplication } from '../services/careers';

const blank: CareerApplication = { name: '', email: '', role: '', jobId: '', employmentType: '', location: '', profileUrl: '', introduction: '' };
const asDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => typeof reader.result === 'string'
    ? resolve(reader.result.replace(/^data:[^;]+;base64,/i, 'data:application/pdf;base64,'))
    : reject(new Error('Could not read the selected PDF.'));
  reader.onerror = () => reject(new Error('Could not read the selected PDF.'));
  reader.readAsDataURL(file);
});

export const CareerApplicationPage: React.FC = () => {
  const { jobId = '' } = useParams();
  const isOpenApplication = jobId === 'open';
  const [job, setJob] = useState<JobListing | null>(null);
  const [openJobs, setOpenJobs] = useState<JobListing[]>([]);
  const [customInterestedRole, setCustomInterestedRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [application, setApplication] = useState(blank);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeDataUrl, setResumeDataUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getOpenJobs().then((jobs) => {
      setOpenJobs(jobs);
      if (isOpenApplication) { setApplication({ ...blank, role: 'Open application', employmentType: 'Open to opportunities' }); return; }
      const selected = jobs.find((item) => item.id === jobId);
      if (!selected) { setLoadError('This role is no longer accepting applications.'); return; }
      setJob(selected);
      setApplication({ ...blank, role: selected.title, jobId: selected.id, interestedRole: selected.title, employmentType: selected.employmentType });
    }).catch((reason) => {
      if (!isOpenApplication) setLoadError(reason instanceof Error ? reason.message : 'Could not load this role.');
    }).finally(() => setLoading(false));
  }, [isOpenApplication, jobId]);

  const change = (key: keyof CareerApplication, value: string) => setApplication((current) => ({ ...current, [key]: value }));
  const chooseResume = async (file?: File) => {
    if (!file) return;
    setError('');
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) { setError('Please choose a PDF file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Your PDF must be 5 MB or smaller.'); return; }
    try { setResume(file); setResumeDataUrl(await asDataUrl(file)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not read the selected PDF.'); }
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setSubmitting(true); setError('');
    if (!resume || !resumeDataUrl) { setError('Please attach your PDF resume before submitting.'); setSubmitting(false); return; }
    if (isOpenApplication && (!application.interestedRole || (application.interestedRole === 'Other / not listed' && !customInterestedRole.trim()))) {
      setError('Choose the role you are interested in.'); setSubmitting(false); return;
    }
    const interestedRole = application.interestedRole === 'Other / not listed' ? customInterestedRole.trim() : application.interestedRole;
    try { await submitCareerApplication({ ...application, interestedRole, resumeDataUrl, resumeName: resume.name }); setSubmitted(true); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'We could not submit your application. Please try again.'); }
    finally { setSubmitting(false); }
  };

  if (loading) return <div className="careers-jobs-state"><LoaderCircle className="animate-spin"/> Loading the application</div>;
  if (loadError) return <section className="career-application-page"><Container size="wide"><div className="career-apply-error"><CircleAlert/><h1>Application unavailable</h1><p>{loadError}</p><Link to="/careers"><ArrowLeft size={15}/> Back to careers</Link></div></Container></section>;

  return <>
    <SEO title={`${isOpenApplication ? 'Open application' : `Apply: ${job?.title}`} | Dev Pride Careers`} description="Apply to The Dev Pride Technology and upload your required PDF resume." canonical={`https://thedevpride.com/careers/apply/${jobId}`} />
    <section className="career-application-page"><Container size="wide">
      <Link className="career-apply-back" to="/careers"><ArrowLeft size={15}/> All careers</Link>
      <div className="career-apply-layout">
        <aside className="career-apply-intro">
          <p className="studio-eyebrow">{isOpenApplication ? 'OPEN APPLICATION' : `JOB APPLICATION · ${job?.id}`}</p>
          <h1>{isOpenApplication ? <>Start a<br/>conversation.</> : <>Apply for<br/><em>{job?.title}</em></>}</h1>
          {job ? <>
            <div className="career-apply-meta"><span><BriefcaseBusiness size={14}/>{job.employmentType}</span><span><MapPin size={14}/>{job.location}</span><span>{job.department}</span></div>
            <p>{job.summary}</p>
            {job.responsibilities.length > 0 && <div className="career-apply-summary"><strong>THE ROLE</strong><ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div>}
          </> : <p>Tell us about your experience, what you care about, and where you’d like to contribute.</p>}
          <div className="career-apply-id">APPLICATION TYPE <strong>{isOpenApplication ? 'General talent introduction' : job?.id}</strong></div>
        </aside>
        {submitted ? <div className="careers-success career-apply-success"><CheckCircle2 size={29}/><p className="studio-eyebrow">APPLICATION RECEIVED</p><h2>Thanks for reaching out.</h2><p>Your application for {isOpenApplication ? `an open role: ${application.interestedRole === 'Other / not listed' ? customInterestedRole : application.interestedRole}` : application.role} has been received.</p><Link to="/careers">Return to careers <ArrowUpRight size={15}/></Link></div> :
          <form className="careers-form career-apply-form" onSubmit={submit}>
            <div className="careers-form-heading"><span>YOUR DETAILS</span><span>~ 3 MIN</span></div>
            <div className="careers-form-grid">
              <label>Your name<input autoComplete="name" required maxLength={120} value={application.name} onChange={(event) => change('name', event.target.value)} placeholder="Name you go by"/></label>
              <label>Email address<input autoComplete="email" type="email" required maxLength={254} value={application.email} onChange={(event) => change('email', event.target.value)} placeholder="you@example.com"/></label>
              {isOpenApplication && <>
                <label>Interested job role<select required value={application.interestedRole === 'Other / not listed' ? 'other' : application.interestedRole || ''} onChange={(event) => { setCustomInterestedRole(''); change('interestedRole', event.target.value === 'other' ? 'Other / not listed' : event.target.value); }}><option value="" disabled>Select a role</option>{openJobs.map((item) => <option key={item.id} value={item.title}>{item.title}</option>)}<option value="other">Other / not listed</option></select></label>
                {application.interestedRole === 'Other / not listed' && <label>Role you’re interested in<input required maxLength={120} value={customInterestedRole} onChange={(event) => setCustomInterestedRole(event.target.value)} placeholder="Tell us the role you have in mind"/></label>}
              </>}
              <label>Where are you based?<input autoComplete="address-level2" maxLength={120} value={application.location} onChange={(event) => change('location', event.target.value)} placeholder="City, country or time zone"/></label>
              <label>Portfolio or profile link <span>OPTIONAL</span><input type="url" maxLength={500} value={application.profileUrl} onChange={(event) => change('profileUrl', event.target.value)} placeholder="https://"/></label>
              <label className="careers-message-field">A short introduction<textarea required minLength={30} maxLength={2500} rows={6} value={application.introduction} onChange={(event) => change('introduction', event.target.value)} placeholder="What kind of work do you enjoy? What would you bring to the team?"/><small>{application.introduction.length} / 2500</small></label>
              <div className="career-resume-field"><label htmlFor="career-resume">Resume <span>PDF · REQUIRED · MAX 5 MB</span></label>
                {resume ? <div className="career-resume-selected"><FileText size={17}/><span><strong>{resume.name}</strong><small>{(resume.size / 1024 / 1024).toFixed(2)} MB · PDF document</small></span><button type="button" onClick={() => { setResume(null); setResumeDataUrl(''); }} aria-label="Remove resume"><Trash2 size={15}/></button></div> : <label className="career-resume-upload" htmlFor="career-resume"><Upload size={18}/><span>Choose a PDF resume</span><small>Required · PDF only · up to 5 MB</small><input id="career-resume" type="file" accept="application/pdf,.pdf" onChange={(event) => { void chooseResume(event.target.files?.[0]); }}/></label>}
              </div>
            </div>
            {error && <p className="careers-form-error"><CircleAlert size={15}/>{error}</p>}
            <div className="careers-form-footer"><p>Your details and resume are stored locally for recruitment review.</p><button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Submit application'} <Send size={15}/></button></div>
          </form>}
      </div>
    </Container></section>
  </>;
};
