'use client';

import { getIdentity, getOrCreateExternalId } from '../../utilities/secureStorage';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Obtiene la IP pública del cliente, prefiriendo IPv6 cuando el navegador la
 * soporte (api64.ipify.org retorna IPv6 si está disponible, si no IPv4).
 * Se usa para que el evento PageView llegue con la misma IP que ve el Pixel,
 * ya que el servidor (detrás de Amplify/CloudFront) puede recibir solo IPv4.
 */
export async function getClientIp(): Promise<string | undefined> {
  if (typeof window === 'undefined') return undefined;
  try {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    console.warn('[tracking] No se pudo obtener la IP del cliente');
    return undefined;
  }
}

/** Datos de identidad (externalId siempre; email/phone si el visitante ya fue identificado). */
export async function getIdentityUserData(): Promise<{
  externalId?: string;
  email?: string;
  phone?: string;
}> {
  const [externalId, identity] = await Promise.all([
    getOrCreateExternalId(),
    getIdentity(),
  ]);
  return { externalId, email: identity.email, phone: identity.phone };
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

/** Envía el evento a la API de Conversiones. Retorna `true` si el servidor confirmó el envío. */
export async function sendCapiEvent(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch('/api/facebook-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return false;
    const body = await res.json().catch(() => null);
    return Boolean(body?.success);
  } catch {
    return false;
  }
}

/** Envía la respuesta al formulario de Leads. Retorna `true` si el upstream confirmó el envío. */
export async function sendFormsLead(data: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch('/api/forms/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    if (!res.ok) return false;
    const body = await res.json().catch(() => null);
    return Boolean(body?.success);
  } catch {
    return false;
  }
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
