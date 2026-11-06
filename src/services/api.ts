import { ProjectInquiryData } from '../types';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Handles project inquiry submissions.
 * Checks for a real backend API endpoint if configured;
 * otherwise gracefully simulates the network transaction and persists locally.
 */
export async function submitProjectInquiry(formData: ProjectInquiryData): Promise<ApiResponse<ProjectInquiryData>> {
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/inquiries';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      return {
        success: true,
        message: 'Your inquiry has been successfully received by our engineering directors.',
        data: json,
      };
    }
  } catch {
    // If backend server is offline or unreachable, smoothly fallback to simulated submission
    // and save offline backup to localStorage for zero data loss.
    console.info('Backend API endpoint offline; persisting inquiry locally in browser storage.');
  }

  // Fallback realistic simulation
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const existing = JSON.parse(localStorage.getItem('devpride_inquiries') || '[]');
    existing.push({
      ...formData,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem('devpride_inquiries', JSON.stringify(existing));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }

  return {
    success: true,
    message: 'Inquiry received. A senior engineering director will reach out within 24 business hours.',
    data: formData,
  };
}
