import { useEffect, useState } from 'react';

const apiBase = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/inquiries').replace(/\/inquiries\/?$/, '');

export function useBrandingLogo() {
  const [logoUrl, setLogoUrl] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBase}/branding`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        const nextUrl = result?.data?.logoUrl || '';
        setLogoUrl(nextUrl);
        let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
        if (!favicon) { favicon = document.createElement('link'); favicon.rel = 'icon'; document.head.appendChild(favicon); }
        favicon.href = nextUrl || '/favicon.svg';
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);
  return logoUrl;
}
