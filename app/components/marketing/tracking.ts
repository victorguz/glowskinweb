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
let clientIpPromise: Promise<string | undefined> | null = null;

export async function getClientIp(): Promise<string | undefined> {
  if (typeof window === 'undefined') return undefined;
  // Se resuelve una sola vez por sesión: antes se llamaba a ipify en CADA
  // PageView, lo que añadía una dependencia externa y latencia a cada evento.
  if (!clientIpPromise) {
    clientIpPromise = (async () => {
      try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        return typeof data?.ip === 'string' ? data.ip : undefined;
      } catch {
        console.warn('[tracking] No se pudo obtener la IP del cliente');
        return undefined;
      }
    })();
  }
  return clientIpPromise;
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

/** Identificador compartido entre el evento del navegador y el de CAPI. */
export function newEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Dispara el evento en el navegador incluyendo el `eventID`.
 *
 * Sin ese identificador Meta no puede emparejar el evento del navegador con el
 * que envía la API de Conversiones y termina contando la misma conversión dos
 * veces. El mismo `eventId` DEBE viajar en el payload de `sendCapiEvent`.
 */
export function fbqTrackDeduped(
  eventName: string,
  customData: Record<string, unknown> | undefined,
  eventId: string,
) {
  fbqTrack('track', eventName, customData ?? {}, { eventID: eventId });
}

/**
 * Último recurso cuando `fetch` no puede completarse: el navegador se
 * compromete a entregar el beacon aunque la pestaña ya haya desaparecido.
 * No informa el resultado, por eso solo se usa si los intentos previos fallan.
 */
function beaconFallback(url: string, body: string): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.sendBeacon !== 'function') {
    return false;
  }
  try {
    return navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
  } catch {
    return false;
  }
}

/**
 * POST resistente a que el usuario se vaya de la página.
 *
 * Los dos destinos que importan —Meta y Vyva Forms— se disparan justo antes de
 * saltar a WhatsApp, así que el envío tiene que sobrevivir a que el navegador
 * congele o descarte la pestaña. `keepalive` hace exactamente eso; el reintento
 * cubre un fallo transitorio del upstream y el beacon es la última red.
 *
 * @param label solo para los logs, para saber qué destino falló.
 */
async function postJsonReliable(
  url: string,
  payload: unknown,
  label: string,
): Promise<boolean> {
  const body = JSON.stringify(payload);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      });
      if (res.ok) {
        const parsed = (await res.json().catch(() => null)) as {
          success?: boolean;
        } | null;
        if (parsed?.success) return true;
      }
      console.warn(`[tracking] ${label} no confirmado (intento ${attempt + 1})`);
    } catch (error) {
      console.warn(`[tracking] ${label} falló (intento ${attempt + 1})`, error);
    }
    if (attempt === 0) {
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }

  const queued = beaconFallback(url, body);
  console.error(`[tracking] ${label} agotó reintentos.`, { queuedViaBeacon: queued });
  return false;
}

/**
 * Envía el evento a la API de Conversiones de Meta.
 * Retorna `true` si el servidor confirmó el envío.
 */
export async function sendCapiEvent(payload: Record<string, unknown>): Promise<boolean> {
  return postJsonReliable('/api/facebook-conversion', payload, 'Meta CAPI');
}

/**
 * Envía la respuesta al formulario de Leads (API de Vyva Forms).
 * Es el dato del negocio: si se pierde, se pierde el cliente.
 */
export async function sendFormsLead(data: Record<string, unknown>): Promise<boolean> {
  return postJsonReliable('/api/forms/leads', { data }, 'Vyva Forms Lead');
}

/**
 * Describe la página actual para los eventos de Meta.
 *
 * Se deriva de la propia ruta a propósito: el mapa anterior
 * (`pagePathMetadata`) venía de otro proyecto y devolvía categorías de
 * gimnasio ("Plan Básico", "Pase de Cortesía") que no existen en Glow Skin.
 * Con la categoría por servicio se pueden armar públicos de remarketing
 * segmentados por tratamiento.
 */
const SERVICE_ROUTES = new Set([
  'anti-acne',
  'antiox-peel-pro',
  'limpieza-facial',
  'metodo-glow-skin',
  'microneedling',
  'porcelanizacion-facial',
]);

const LEGAL_ROUTES = new Set([
  'politica-de-cookies',
  'politica-de-privacidad',
  'terminos-y-condiciones',
]);

function toTitle(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function describePath(pathname: string): {
  contentName: string;
  pageType: string;
  contentCategory: string;
} {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return { contentName: 'Inicio', pageType: 'home', contentCategory: 'home' };
  }

  const [first, second] = segments;

  if (first === 'servicios') {
    return second
      ? { contentName: toTitle(second), pageType: 'servicio', contentCategory: second }
      : { contentName: 'Servicios', pageType: 'listado', contentCategory: 'servicios' };
  }

  if (SERVICE_ROUTES.has(first)) {
    return { contentName: toTitle(first), pageType: 'servicio', contentCategory: first };
  }

  if (first === 'blog') {
    return second
      ? { contentName: toTitle(second), pageType: 'articulo', contentCategory: 'blog' }
      : { contentName: 'Blog', pageType: 'listado', contentCategory: 'blog' };
  }

  if (LEGAL_ROUTES.has(first)) {
    return { contentName: toTitle(first), pageType: 'legal', contentCategory: 'legal' };
  }

  return { contentName: toTitle(first), pageType: 'otro', contentCategory: first };
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
