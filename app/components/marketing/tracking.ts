'use client';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function readFbCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === 'undefined') return {};
  const get = (name: string) => {
    const m = document.cookie.match(
      new RegExp(`(?:^|; )${name.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&')}=([^;]*)`),
    );
    return m?.[1] ? decodeURIComponent(m[1]) : undefined;
  };
  return { fbp: get('_fbp'), fbc: get('_fbc') };
}

export function fbqTrack(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.fbq?.(...args);
}

export async function sendCapiEvent(payload: Record<string, unknown>) {
  await fetch('/api/facebook-conversion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

export async function sendFormsLead(data: Record<string, unknown>) {
  const res = await fetch('/api/forms/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  return res.json().catch(() => ({}));
}

export function splitFullName(nombre: string): { firstName: string; lastName: string } {
  const p = nombre.trim().split(/\s+/).filter(Boolean);
  if (p.length === 0) return { firstName: '', lastName: '' };
  if (p.length === 1) return { firstName: p[0], lastName: '' };
  return { firstName: p[0], lastName: p.slice(1).join(' ') };
}

export function buildWaMeUrl(digits: string, text: string) {
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
