import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ServiceDetailContent } from '@/app/components/services/ServiceDetailContent';
import { getAllServiceSlugs, getServiceBySlug } from '@/lib/content/service-utils';
import { getServiceHref, isServicePathOverride } from '@/lib/routing/service-routes';
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
  const { service, categoryTitle } = pair;
  const url = `${getSiteUrl()}${getServiceHref(slug)}`;
  const description = `${service.description} — ${SITE_NAME}, ${LOCAL_SEO.city} (${LOCAL_SEO.addressStreet}).`;
  return {
    title: service.name,
    description,
    keywords: [
      service.name,
      categoryTitle,
      `${service.name} ${LOCAL_SEO.city}`,
      LOCAL_SEO.city,
      SITE_NAME,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${service.name} | ${SITE_NAME}`,
      description,
      url,
      locale: 'es_CO',
    },
  };
}

function buildServiceJsonLd(pair: NonNullable<ReturnType<typeof getServiceBySlug>>, slug: string) {
  const { service } = pair;
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${getServiceHref(slug)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url,
    areaServed: {
      '@type': 'City',
      name: LOCAL_SEO.city,
    },
    provider: {
      '@type': 'BeautySalon',
      '@id': `${siteUrl}/#local`,
      name: SITE_NAME,
      url: siteUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: LOCAL_SEO.addressStreet,
        addressLocality: LOCAL_SEO.city,
        addressRegion: LOCAL_SEO.region,
        postalCode: LOCAL_SEO.postalCode,
        addressCountry: LOCAL_SEO.countryCode,
      },
    },
  };
}

export default async function ServiceBySlugPage({ params }: Props) {
  const { slug } = await params;
  if (isServicePathOverride(slug)) {
    redirect(getServiceHref(slug));
  }
  const pair = getServiceBySlug(slug);
  if (!pair) {
    notFound();
  }
  const jsonLd = buildServiceJsonLd(pair, slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailContent pair={pair} />
    </>
  );
}
