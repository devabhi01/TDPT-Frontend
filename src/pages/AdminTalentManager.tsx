import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, CircleAlert, ExternalLink, FileDown, LoaderCircle, ListFilter, Mail, RotateCcw, Search, Trash2, UserRoundSearch } from 'lucide-react';
import { downloadApplicationResume } from '../services/careers';

type Application = { id: string; name: string; email: string; role: string; jobId?: string; interestedRole?: string; employmentType: string; location: string; profileUrl: string; introduction: string; resume?: { originalName: string; size: number }; status: 'new' | 'reviewing' | 'interview' | 'talent_pool' | 'declined'; createdAt: string };
type Request = (path: string, init?: RequestInit) => Promise<{ data?: Application[] | Application; message?: string }>;
const dateLabel = (value: string) => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value));

export const AdminTalentManager: React.FC<{ request: Request }> = ({ request }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Application | null>(null);
  const [applicationType, setApplicationType] = useState<'jobs' | 'open'>('jobs');
  const [statusFilter, setStatusFilter] = useState('all');
  const [employmentFilter, setEmploymentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [dateOrder, setDateOrder] = useState<'newest' | 'oldest'>('newest');
  const refresh = useCallback(async () => {
    try { const result = await request('/applications'); setApplications(Array.isArray(result.data) ? result.data : []); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not load applications.'); }
    finally { setLoading(false); }
  }, [request]);
  useEffect(() => { refresh(); }, [refresh]);
  const updateStatus = async (candidate: Application, status: Application['status']) => {
    try { await request(`/applications/${encodeURIComponent(candidate.id)}`, { method: 'PATCH', body: JSON.stringify({ status }) }); setSelected((current) => current?.id === candidate.id ? { ...current, status } : current); await refresh(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not update application.'); }
  };
  const remove = async (candidate: Application) => {
    if (!window.confirm(`Delete the application from ${candidate.name}? This also removes its locally stored resume.`)) return;
    try { await request(`/applications/${encodeURIComponent(candidate.id)}`, { method: 'DELETE' }); setSelected(null); await refresh(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not delete application.'); }
  };
  const jobApplications = applications.filter((candidate) => Boolean(candidate.jobId));
  const openApplications = applications.filter((candidate) => !candidate.jobId);
  const currentApplications = applicationType === 'jobs' ? jobApplications : openApplications;
  const roleLabel = (candidate: Application) => candidate.jobId ? `${candidate.role} (${candidate.jobId})` : (candidate.interestedRole || candidate.role);
  const roleOptions = [...new Map(currentApplications.map((candidate) => [candidate.jobId || roleLabel(candidate), roleLabel(candidate)])).entries()];
  const employmentOptions = [...new Set(currentApplications.map((candidate) => candidate.employmentType).filter(Boolean))].sort();
  const filtered = currentApplications
    .filter((candidate) => [candidate.name, candidate.email, candidate.role, candidate.interestedRole, candidate.employmentType, candidate.location, candidate.jobId].join(' ').toLowerCase().includes(search.trim().toLowerCase()))
    .filter((candidate) => statusFilter === 'all' || candidate.status === statusFilter)
    .filter((candidate) => employmentFilter === 'all' || candidate.employmentType === employmentFilter)
    .filter((candidate) => roleFilter === 'all' || (candidate.jobId || roleLabel(candidate)) === roleFilter)
    .sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) * (dateOrder === 'newest' ? 1 : -1));
  const hasFilters = Boolean(search || statusFilter !== 'all' || employmentFilter !== 'all' || roleFilter !== 'all' || dateOrder !== 'newest');
  const resetFilters = () => { setSearch(''); setStatusFilter('all'); setEmploymentFilter('all'); setRoleFilter('all'); setDateOrder('newest'); };
  const downloadResume = async (candidate: Application) => {
    try { await downloadApplicationResume(candidate.id); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not download resume.'); }
  };

  return <div className="admin-talent"><div className="admin-heading-row"><div><p className="admin-kicker">PEOPLE & OPPORTUNITY</p><h1>Applications</h1><p className="admin-subtitle">Review applicants for listed jobs and open talent applications separately.</p></div><span className="admin-talent-total">{applications.length} APPLICATION{applications.length === 1 ? '' : 'S'}</span></div>
    {error && <div className="admin-notice"><CircleAlert size={16}/>{error}<button onClick={() => setError('')} aria-label="Dismiss">×</button></div>}
    <div className="admin-application-tabs"><button className={applicationType === 'jobs' ? 'active' : ''} onClick={() => { setApplicationType('jobs'); setRoleFilter('all'); }}>Job applicants <span>{jobApplications.length}</span></button><button className={applicationType === 'open' ? 'active' : ''} onClick={() => { setApplicationType('open'); setRoleFilter('all'); }}>Open applications <span>{openApplications.length}</span></button></div>
    <section className="admin-table-card"><div className="admin-table-heading"><div><h2>{applicationType === 'jobs' ? 'Applicants from job listings' : 'Open talent applications'}</h2><p>{applicationType === 'jobs' ? 'Applicants are linked to a specific job ID.' : 'General applications that are not tied to a current opening.'}</p></div><label className="admin-search"><Search size={16}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search people, role, job ID"/></label></div>
      <div className="admin-application-filters admin-filters"><span><ListFilter size={14}/> FILTER BY</span><select aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option><option value="new">New</option><option value="reviewing">Reviewing</option><option value="interview">Interview</option><option value="talent_pool">Talent pool</option><option value="declined">Closed</option></select><select aria-label="Filter by work type" value={employmentFilter} onChange={(event) => setEmploymentFilter(event.target.value)}><option value="all">All work types</option>{employmentOptions.map((type) => <option key={type} value={type}>{type}</option>)}</select><select aria-label={applicationType === 'jobs' ? 'Filter by job' : 'Filter by interested role'} value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}><option value="all">{applicationType === 'jobs' ? 'All jobs' : 'All roles'}</option>{roleOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><select aria-label="Sort by application date" value={dateOrder} onChange={(event) => setDateOrder(event.target.value as 'newest' | 'oldest')}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select>{hasFilters && <button type="button" onClick={resetFilters}><RotateCcw size={13}/> Clear filters</button>}</div>
      {loading ? <div className="admin-products-empty"><LoaderCircle className="animate-spin"/>Loading applications</div> : filtered.length ? <div className="admin-table-wrap"><table><thead><tr><th>PERSON</th><th>{applicationType === 'jobs' ? 'JOB' : 'INTEREST'}</th><th>WORK TYPE</th><th>RECEIVED</th><th>STATUS</th><th/></tr></thead><tbody>{filtered.map((candidate) => <tr key={candidate.id}><td><div className="admin-contact-cell"><span className="admin-contact-avatar">{candidate.name.slice(0, 1).toUpperCase()}</span><span><strong>{candidate.name}</strong><small>{candidate.email}{candidate.location ? ` · ${candidate.location}` : ''}</small></span></div></td><td>{candidate.jobId ? candidate.role : (candidate.interestedRole || candidate.role)}{candidate.jobId && <small className="admin-app-job-id">{candidate.jobId}</small>}</td><td>{candidate.employmentType}</td><td>{dateLabel(candidate.createdAt)}</td><td><select className={`admin-talent-status status-${candidate.status}`} aria-label={`Status for ${candidate.name}`} value={candidate.status} onChange={(event) => updateStatus(candidate, event.target.value as Application['status'])}><option value="new">New</option><option value="reviewing">Reviewing</option><option value="interview">Interview</option><option value="talent_pool">Talent pool</option><option value="declined">Closed</option></select></td><td><div className="admin-talent-actions"><a href={`mailto:${candidate.email}`} aria-label={`Email ${candidate.name}`}><Mail size={14}/></a>{candidate.resume && <button onClick={() => downloadResume(candidate)} aria-label={`Download ${candidate.name}'s resume`}><FileDown size={14}/></button>}{candidate.profileUrl && <a href={candidate.profileUrl} target="_blank" rel="noreferrer" aria-label={`${candidate.name}'s profile`}><ExternalLink size={14}/></a>}<button onClick={() => setSelected(candidate)} aria-label={`Read ${candidate.name}'s introduction`}><ArrowUpRight size={15}/></button><button className="danger" onClick={() => remove(candidate)} aria-label={`Delete ${candidate.name}'s application`}><Trash2 size={14}/></button></div></td></tr>)}</tbody></table></div> : <div className="admin-products-empty"><UserRoundSearch/><strong>{currentApplications.length ? 'No applications match these filters' : applicationType === 'jobs' ? 'No job applicants yet' : 'No open applications yet'}</strong><span>{currentApplications.length ? 'Try adjusting your search or clear the filters.' : 'Submissions will appear in this section.'}</span></div>}
      {!loading && currentApplications.length > 0 && <div className="admin-table-footer">Showing {filtered.length} of {currentApplications.length} applications<span>Applicant information is private to this workspace</span></div>}
    </section>
    {selected && <div className="admin-drawer-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><aside className="admin-drawer"><div className="admin-drawer-head"><div><p className="admin-kicker">{selected.jobId ? 'JOB APPLICATION' : 'OPEN APPLICATION'}</p><h2>{selected.name}</h2></div><button onClick={() => setSelected(null)} aria-label="Close application">×</button></div><p className="admin-drawer-company">{selected.jobId ? selected.role : (selected.interestedRole || selected.role)} · {selected.employmentType} · Received {dateLabel(selected.createdAt)}</p><div className="admin-detail-grid"><div><small>EMAIL</small><a href={`mailto:${selected.email}`}><Mail size={14}/>{selected.email}</a></div><div><small>LOCATION</small><strong>{selected.location || 'Not provided'}</strong></div>{selected.jobId && <div><small>JOB ID</small><strong>{selected.jobId}</strong></div>}{selected.profileUrl && <div><small>PROFILE</small><a href={selected.profileUrl} target="_blank" rel="noreferrer"><ExternalLink size={14}/>Open profile</a></div>}</div>{selected.resume && <button className="admin-resume-download" onClick={() => downloadResume(selected)}><FileDown size={16}/>Download resume · {selected.resume.originalName}</button>}<section className="admin-message"><small>INTRODUCTION</small><p>{selected.introduction}</p></section><label className="admin-status-edit">Application status<select className={`admin-talent-status status-${selected.status}`} value={selected.status} onChange={(event) => updateStatus(selected, event.target.value as Application['status'])}><option value="new">New</option><option value="reviewing">Reviewing</option><option value="interview">Interview</option><option value="talent_pool">Talent pool</option><option value="declined">Closed</option></select></label><button className="admin-delete" onClick={() => remove(selected)}><Trash2 size={15}/> Delete application</button></aside></div>}
  </div>;
};

