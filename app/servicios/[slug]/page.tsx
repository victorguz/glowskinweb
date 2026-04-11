import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetailContent } from '@/app/components/services/ServiceDetailContent';
import { getAllServiceSlugs, getServiceBySlug } from '@/lib/content/service-utils';
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from '@/lib/seo/site';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pair = getServiceBySlug(slug);
  if (!pair) {
    return { title: 'Servicio | Glow Skin' };
  }
  const { service } = pair;
  const url = `${getSiteUrl()}/servicios/${slug}`;
  const description = `${service.description} — ${SITE_NAME}, ${LOCAL_SEO.city} (${LOCAL_SEO.addressStreet}).`;
  return {
    title: service.name,
    description,
    keywords: [service.name, 'Barranquilla', SITE_NAME, 'limpieza facial', 'tratamiento facial'],
    alternates: { canonical: url },
    openGraph: {
      title: `${service.name} | ${SITE_NAME}`,
      description,
      url,
      locale: 'es_CO',
    },
  };
}

export default async function ServiceBySlugPage({ params }: Props) {
  const { slug } = await params;
  const pair = getServiceBySlug(slug);
  if (!pair) {
    notFound();
  }
  return <ServiceDetailContent pair={pair} />;
}
