const localApi = 'http://localhost:5000/api/inquiries';

export const apiInquiriesUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? localApi : '/api/inquiries');
export const apiBaseUrl = apiInquiriesUrl.replace(/\/inquiries\/?$/, '');
