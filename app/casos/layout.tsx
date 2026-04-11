import type { Metadata } from 'next';
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from '@/lib/seo/site';

const description = `Casos reales y resultados de pacientes en ${SITE_NAME}, ${LOCAL_SEO.city}: acné, limpieza facial, manchas y rejuvenecimiento.`;

export const metadata: Metadata = {
  title: 'Casos y resultados',
  description,
  keywords: ['antes y después facial Barranquilla', 'resultados Glow Skin', 'casos reales acné'],
  alternates: { canonical: `${getSiteUrl()}/casos` },
  openGraph: {
    title: `Resultados | ${SITE_NAME}`,
    description,
    url: `${getSiteUrl()}/casos`,
    locale: 'es_CO',
  },
};

export default function CasosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
