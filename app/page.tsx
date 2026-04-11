import type { Metadata } from 'next';
import HomePageClient from '@/app/HomePageClient';
import { DEFAULT_KEYWORDS, getSiteUrl, LOCAL_SEO, SITE_NAME, SITE_TAGLINE } from '@/lib/seo/site';

const description = `${SITE_TAGLINE}. Dirección: ${LOCAL_SEO.addressStreet}, ${LOCAL_SEO.city}. Zona norte, cercanía Alto Prado.`;

export const metadata: Metadata = {
  title: 'Limpieza facial profunda y estética facial en Barranquilla',
  description,
  keywords: [...DEFAULT_KEYWORDS, 'limpieza facial Alto Prado', 'Norte Centro Histórico'],
  openGraph: {
    url: getSiteUrl(),
    title: `${SITE_NAME} | ${LOCAL_SEO.city} — Limpieza facial y tratamientos`,
    description,
    images: [
      {
        url: '/files/glow-skin-sofia-nieto-aesthetics-logo-square.png',
        width: 512,
        height: 512,
        alt: `${SITE_NAME} ${LOCAL_SEO.city}`,
      },
    ],
  },
  twitter: {
    title: `${SITE_NAME} — ${LOCAL_SEO.city}`,
    description,
  },
  alternates: { canonical: getSiteUrl() },
  other: {
    'geo.region': 'CO-ATL',
    'geo.placename': LOCAL_SEO.city,
    'geo.position': `${LOCAL_SEO.latitude};${LOCAL_SEO.longitude}`,
    ICBM: `${LOCAL_SEO.latitude}, ${LOCAL_SEO.longitude}`,
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
