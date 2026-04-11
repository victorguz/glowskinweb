import type { Metadata } from 'next';
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from '@/lib/seo/site';

const description = `${SITE_NAME} — experiencia Glow y tratamientos faciales en ${LOCAL_SEO.city}, ${LOCAL_SEO.addressStreet}.`;

export const metadata: Metadata = {
  title: 'Glow Skin',
  description,
  alternates: { canonical: `${getSiteUrl()}/otra` },
  openGraph: {
    title: `${SITE_NAME} | ${LOCAL_SEO.city}`,
    description,
    url: `${getSiteUrl()}/otra`,
    locale: 'es_CO',
  },
};

export default function OtraLayout({ children }: { children: React.ReactNode }) {
  return children;
}
