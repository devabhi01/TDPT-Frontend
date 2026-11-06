import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, CircleAlert, Compass, LoaderCircle, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Container } from '../components/common/Container';
import { getOpenJobs, JobListing } from '../services/careers';

export const CareersPage: React.FC = () => {
  const navigate = useNavigate();
  const [openJobs, setOpenJobs] = useState<JobListing[]>([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState('');
  useEffect(() => { getOpenJobs().then(setOpenJobs).catch((reason) => setJobsError(reason instanceof Error ? reason.message : 'Open roles are temporarily unavailable.')).finally(() => setJobsLoading(false)); }, []);

  return <>
    <SEO title="Careers | Open roles at Dev Pride" description="Explore open roles at The Dev Pride Technology and apply to join our remote-first studio." canonical="https://thedevpride.com/careers" />
    <section className="careers-hero"><Container size="wide"><div className="careers-hero-top"><span><i/> CAREERS AT DEV PRIDE</span><span>PEOPLE · CRAFT · CURIOSITY</span></div><div className="careers-hero-body"><div><p className="studio-eyebrow">Come make good things with us.</p><h1>Bring your<br/>point of <em>view.</em></h1><p>We’re looking for thoughtful people who care about the things they make and the people they make them for.</p><a href="#open-roles" className="studio-button">Explore open roles <ArrowDownRight size={16}/></a></div><aside><span className="careers-hero-mark"><Compass size={30} strokeWidth={1.1}/></span><p>Good work needs different perspectives, generous collaboration, and room to keep learning.</p><small>OUR WAY OF WORKING / 01</small></aside></div><div className="careers-hero-foot"><span>NO HIRING CHECKLISTS. NO EGO.</span><span>JUST GOOD PEOPLE, DOING CONSIDERED WORK.</span></div></Container></section>
    <section className="careers-types" id="open-roles"><Container size="wide"><div className="careers-section-top"><span>01 / OPEN POSITIONS</span><p>Join a remote-first studio building thoughtful software, products, and applied AI.</p></div>{jobsLoading ? <div className="careers-jobs-state"><LoaderCircle className="animate-spin"/> Loading current openings</div> : jobsError ? <div className="careers-jobs-state"><CircleAlert/>{jobsError}</div> : openJobs.length ? <div className="careers-job-grid">{openJobs.map((job) => <article className="careers-job-card" key={job.id}><div className="careers-job-top"><span>{job.id.toUpperCase()}</span><span>{job.employmentType}</span></div><BriefcaseBusiness size={20}/><h2>{job.title}</h2><div className="careers-job-location"><MapPin size={13}/>{job.location} · {job.department}</div><p>{job.summary}</p>{job.responsibilities.length > 0 && <ul className="careers-job-details">{job.responsibilities.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>}<button onClick={() => navigate(`/careers/apply/${encodeURIComponent(job.id)}`)}>Apply for this role <ArrowUpRight size={15}/></button></article>)}</div> : <div className="careers-jobs-state"><BriefcaseBusiness/><span>There are no open roles at the moment. You can still send an open application below.</span></div>}<div className="careers-open-note"><Compass size={16}/><p><strong>Not seeing your role?</strong> Send an open application and tell us where you’d like to contribute. We’re always glad to meet good people.</p><button onClick={() => navigate('/careers/apply/open')}>Open application <ArrowUpRight size={14}/></button></div></Container></section>
    <section className="careers-open-application-cta"><Container size="wide"><p className="studio-eyebrow">NO ROLE FITS?</p><h2>Make an introduction <em>anyway.</em></h2><p>Share your background, upload a resume, and tell us where you would like to contribute.</p><Link className="studio-button" to="/careers/apply/open">Start an open application <ArrowUpRight size={16}/></Link></Container></section>
  </>;
};
