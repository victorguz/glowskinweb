/**
 * Enlaza ítems de `SERVICES_PRICING` con `SERVICES_DATA` para mostrar
 * sesiones, duración, frecuencia e incluye en /precios.
 */

import type { PricingCategory, PricingItem } from '@/lib/content/pricing';
import { SERVICES_PRICING } from '@/lib/content/pricing';
import { SERVICES_DATA } from '@/lib/content/services';

/** Nombre en lista de precios → nombre exacto en SERVICES_DATA (si difiere). */
const PRICING_NAME_TO_SERVICE_NAME: Record<string, string> = {
  'Limpieza "Piel de Porcelana" (Efecto Glow)': 'Porcelanización Facial (Efecto Glow)',
  'Antiox Peel Pro (Efecto Lifting)': 'Antiox Peel Pro (Peeling Antioxidante)',
  'HydraGlow + AntioxPeelPro': 'HydraGlow + Antiox Peel Pro',
  'Despigmentante con Peelings Químicos': 'Tratamiento Despigmentante con Peelings Químicos',
  'Tratamiento Regenerative (Cicatrices con Textura)':
    'Tratamiento Regenerative + (Cicatrices y Textura)',
  'Microneedling Regenerativo con Exosomas (Regeneración celular x1000)':
    'Microneedling Regenerativo + Exosomas',
  'Tratamiento Regenerativo con Exosomas (Regeneración celular x10.000)':
    'Tratamiento 3 Sesiones Microneedling + Exosomas',
  'Protocolo Anti-Acné Intensivo': 'Tratamiento Anti-Acné Intensivo',
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
  if (n.includes('3 sesiones') || n.includes('x10.000')) {
    return '3 sesiones de bioestimulación celular con exosomas';
  }
  if (n.includes('x1000')) return '1 sesión (valor por sesión)';
  if (svc.name.includes('Tratamiento Anti-Acné Intensivo'))
    return 'Programa integral: 4 limpiezas + 4 peelings + 4 microneedling o despigmentante';
  if (svc.name.includes('Tratamiento Regenerative'))
    return '6 sesiones de bioestimulación celular (micropunciones y alta nutrición)';
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

const INTENSIVE_ACNE_INCLUDES = [
  '4 Limpiezas Faciales Anti-Acné',
  '4 Sesiones de Peeling Seborregulador',
  '4 Sesiones de Microneedling o Peeling Despigmentante',
];

function enrichItem(item: PricingItem): EnrichedPricingItem {
  const svc = findService(item.name);
  if (!svc) {
    return {
      ...item,
      sessionsSummary: 'Consulta en estudio para plan personalizado',
      includes: item.highlights ?? [],
    };
  }
  const includes =
    item.highlights && item.highlights.length > 0
      ? item.highlights
      : item.name === 'Protocolo Anti-Acné Intensivo'
        ? INTENSIVE_ACNE_INCLUDES
        : includesList(svc);
  return {
    ...item,
    sessionsSummary: sessionsSummaryFromService(svc, item.name),
    durationSummary: durationSummary(svc),
    frequencySummary: frequencySummary(svc),
    includes,
  };
}

export const SERVICES_PRICING_ENRICHED: EnrichedPricingCategory[] = SERVICES_PRICING.map(
  (cat) => ({
    ...cat,
    items: cat.items.map(enrichItem),
  }),
);

