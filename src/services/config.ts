const localApi = 'http://localhost:5000/api/inquiries';
const prodApi = 'https://tdpt-backend.onrender.com/api';

export const apiInquiriesUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? localApi : '/api/inquiries');
export const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? apiInquiriesUrl.replace(/\/inquiries\/?$/, '') : prodApi);
// export const apiBaseUrl = apiInquiriesUrl.replace(/\/inquiries\/?$/, '');
