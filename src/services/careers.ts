export interface CareerApplication {
  name: string;
  email: string;
  role: string;
  jobId: string;
  interestedRole?: string;
  employmentType: string;
  location: string;
  profileUrl: string;
  introduction: string;
  resumeDataUrl?: string;
  resumeName?: string;
}

const applicationsUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/inquiries').replace(/\/inquiries\/?$/, '/careers/applications');
const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/inquiries').replace(/\/inquiries\/?$/, '');
export interface JobListing {
  id: string; title: string; department: string; employmentType: string; location: string;
  summary: string; responsibilities: string[]; qualifications: string[]; status: 'open' | 'draft'; createdAt: string;
}

export async function getOpenJobs(): Promise<JobListing[]> {
  const response = await fetch(`${apiBase}/jobs`);
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Could not load open roles.');
  return result.data || [];
}

export async function submitCareerApplication(application: CareerApplication) {
  const response = await fetch(applicationsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(application),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Could not send your application.');
  return result;
}

export async function downloadApplicationResume(id: string): Promise<void> {
  const response = await fetch(`${apiBase}/admin/applications/${encodeURIComponent(id)}/resume`, { credentials: 'include' });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || 'Could not download resume.');
  }
  const blobUrl = URL.createObjectURL(await response.blob());
  const link = document.createElement('a'); link.href = blobUrl; link.download = 'applicant-resume.pdf'; link.click();
  URL.revokeObjectURL(blobUrl);
}
