import type { Metadata } from 'next';
import { SERVICES_PRICING } from '@/lib/content/pricing';
import { compactPrice, parsePriceToNumber } from '@/lib/content/service-seo';
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from '@/lib/seo/site';

/** Precio más bajo de la lista, para decirlo en la descripción ("desde $125.000"). */
function lowestPrice(): string | null {
  let best: { n: number; label: string } | null = null;
  for (const cat of SERVICES_PRICING) {
    for (const item of cat.items) {
      const n = parsePriceToNumber(item.price);
      if (n && (!best || n < best.n)) best = { n, label: compactPrice(item.price) };
    }
  }
  return best?.label ?? null;
}

const from = lowestPrice();
const title = `Precios de limpieza facial y peeling en ${LOCAL_SEO.city} | ${SITE_NAME}`;
const description = `Precios de limpieza facial, peeling, acné y microneedling en ${LOCAL_SEO.city}${
  from ? `, desde ${from}` : ''
}. Sesiones, duración y qué incluye cada tratamiento.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    'precios limpieza facial Barranquilla',
    'precio peeling facial Barranquilla',
    'tratamientos faciales precio',
    SITE_NAME,
  ],
  alternates: { canonical: `${getSiteUrl()}/precios` },
  openGraph: {
    title,
    description,
    url: `${getSiteUrl()}/precios`,
    locale: 'es_CO',
  },
};

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
