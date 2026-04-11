import type { Metadata } from 'next';
import { getSiteUrl, SITE_NAME, SITE_TAGLINE } from '@/lib/seo/site';

const desc =
  'Blog de Glow Skin en Barranquilla: limpieza facial, acné, PDRN, exosomas, consejos de piel y tratamientos con Sofía Nieto — Carrera 50 # 74-120.';

export const metadata: Metadata = {
  title: 'Blog',
  description: desc,
  keywords: [
    'blog estética Barranquilla',
    'limpieza facial blog',
    'Glow Skin blog',
    'Sofía Nieto',
    'PDRN',
    'exosomas',
  ],
  alternates: { canonical: `${getSiteUrl()}/blog` },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: `${getSiteUrl()}/blog`,
    siteName: SITE_NAME,
    title: `Blog | ${SITE_NAME} Barranquilla`,
    description: desc,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${SITE_NAME}`,
    description: SITE_TAGLINE,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
