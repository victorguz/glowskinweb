import type { Metadata } from 'next';
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from '@/lib/seo/site';

const description = `Precios orientativos de tratamientos faciales en ${LOCAL_SEO.city}: limpieza profunda, acné, manchas y más en ${SITE_NAME}, ${LOCAL_SEO.addressStreet}.`;

export const metadata: Metadata = {
  title: 'Precios',
  description,
  keywords: ['precios limpieza facial Barranquilla', 'tratamientos faciales precio', SITE_NAME],
  alternates: { canonical: `${getSiteUrl()}/precios` },
  openGraph: {
    title: `Precios | ${SITE_NAME} ${LOCAL_SEO.city}`,
    description,
    url: `${getSiteUrl()}/precios`,
    locale: 'es_CO',
  },
};

export default function PreciosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
