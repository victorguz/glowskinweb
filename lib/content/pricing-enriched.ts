/**
 * Enlaza ítems de `SERVICES_PRICING` con `SERVICES_DATA` para mostrar
 * sesiones, duración, frecuencia e incluye en /precios.
 */

import type { PricingCategory, PricingItem } from '@/lib/content/pricing';
import { SERVICES_PRICING } from '@/lib/content/pricing';
import { SERVICES_DATA } from '@/lib/content/services';

/** Nombre en lista de precios → nombre exacto en SERVICES_DATA (si difiere). */
const PRICING_NAME_TO_SERVICE_NAME: Record<string, string> = {
  'Despigmentante con Peelings Químicos': 'Tratamiento Despigmentante con Peelings Químicos',
  'Regenerative + (Cicatrices y Textura)': 'Tratamiento Regenerative + (Cicatrices y Textura)',
  'Tratamiento 3 Sesiones Exosomas': 'Tratamiento 3 Sesiones Microneedling + Exosomas',
  'Tratamiento 3 Sesiones PDRN': 'Tratamiento 3 Sesiones PDRN Rejuvenecimiento Intensivo',
};

type ServiceShape = {
  name: string;
  details?: Record<string, unknown>;
  page?: { process?: { duration?: string; durationUnit?: string; includes?: string[] } };
};

function findService(pricingItemName: string): ServiceShape | undefined {
  const target = PRICING_NAME_TO_SERVICE_NAME[pricingItemName] ?? pricingItemName;
  for (const cat of SERVICES_DATA.categories) {
    for (const s of cat.services) {
      if (s.name === target) return s as ServiceShape;
    }
  }
  return undefined;
}

function sessionsSummaryFromService(svc: ServiceShape, pricingName: string): string {
  const n = pricingName.toLowerCase();
  if (n.includes('3 sesiones')) return 'Paquete de 3 sesiones';
  if (svc.name.includes('Tratamiento Anti-Acné Intensivo'))
    return 'Programa: 4 peelings químicos + 2 limpiezas anti-acné (incluido)';
  const inc = svc.details?.includes;
  if (Array.isArray(inc)) {
    const line = inc.find((x) => /^\d+\s*sesi[oó]n(es)?\b/i.test(String(x)));
    if (line) {
      const head = String(line).split(':')[0]?.trim();
      if (head) return head;
    }
  }
  return '1 sesión por visita (precio mostrado por sesión)';
}

function durationSummary(svc: ServiceShape): string | undefined {
  const d = svc.details;
  if (d && typeof d.duration === 'string' && d.duration.trim()) return d.duration.trim();
  const proc = svc.page?.process;
  if (proc?.duration) {
    const u = proc.durationUnit ? ` ${proc.durationUnit}` : '';
    return `${proc.duration}${u}`.trim();
  }
  return undefined;
}

function frequencySummary(svc: ServiceShape): string | undefined {
  const f = svc.details?.frequency;
  return typeof f === 'string' && f.trim() ? f.trim() : undefined;
}

function includesList(svc: ServiceShape): string[] {
  const d = svc.details;
  if (Array.isArray(d?.includes) && d.includes.length) {
    return d.includes.map(String);
  }
  const proc = svc.page?.process;
  if (Array.isArray(proc?.includes) && proc.includes.length) {
    return proc.includes.map(String);
  }
  return [];
}

export type EnrichedPricingItem = PricingItem & {
  sessionsSummary: string;
  durationSummary?: string;
  frequencySummary?: string;
  includes: string[];
};

export type EnrichedPricingCategory = Omit<PricingCategory, 'items'> & {
  items: EnrichedPricingItem[];
};

function enrichItem(item: PricingItem): EnrichedPricingItem {
  const svc = findService(item.name);
  if (!svc) {
    return {
      ...item,
      sessionsSummary: 'Consulta en estudio para plan personalizado',
      includes: [],
    };
  }
  return {
    ...item,
    sessionsSummary: sessionsSummaryFromService(svc, item.name),
    durationSummary: durationSummary(svc),
    frequencySummary: frequencySummary(svc),
    includes: includesList(svc),
  };
}

export const SERVICES_PRICING_ENRICHED: EnrichedPricingCategory[] = SERVICES_PRICING.map(
  (cat) => ({
    ...cat,
    items: cat.items.map(enrichItem),
  }),
);
