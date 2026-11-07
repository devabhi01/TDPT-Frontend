import { useEffect, useState } from 'react';
import { apiBaseUrl } from '../services/config';

export function useBrandingLogo() {
  const [logoUrl, setLogoUrl] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${apiBaseUrl}/branding`, { signal: controller.signal })
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
