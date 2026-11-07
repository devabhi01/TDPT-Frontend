const localApi = 'http://localhost:5000/api/inquiries';

// Production must use the same-origin Cloudflare Worker proxy so the admin
// session cookie remains first-party. VITE_API_URL is only used for local dev.
export const apiInquiriesUrl = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || localApi)
  : '/api/inquiries';
export const apiBaseUrl = apiInquiriesUrl.replace(/\/inquiries\/?$/, '');
