import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { PHONE_TEL } from '@/app/components/site-config';
import { ServiceDetailContent } from '@/app/components/services/ServiceDetailContent';
import { getEnrichedPricingForService } from '@/lib/content/pricing-enriched';
import {
  compactPrice,
  getServiceFaqItems,
  getServiceSeo,
  parsePriceToNumber,
} from '@/lib/content/service-seo';
import { getServiceHeroImage } from '@/lib/content/service-media';
import { getAllServiceSlugs, getServiceBySlug } from '@/lib/content/service-utils';
import { getServiceHref, isServicePathOverride } from '@/lib/routing/service-routes';
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from '@/lib/seo/site';

type Props = {
  params: Promise<{ slug: string }>;
};

type ServicePair = NonNullable<ReturnType<typeof getServiceBySlug>>;

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

/** Descripción base del servicio + precio publicado, para quien busca "cuánto cuesta". */
function buildDescription(pair: ServicePair, slug: string): string {
  const seo = getServiceSeo(slug, pair.service.name);
  const price = getEnrichedPricingForService(pair.service.name);
  return price
    ? `${seo.description} Precio: ${compactPrice(price.price)}.`
    : seo.description;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pair = getServiceBySlug(slug);
  if (!pair) {
    return { title: 'Servicio | Glow Skin' };
  }
  const { service, categoryTitle } = pair;
  const seo = getServiceSeo(slug, service.name);
  const url = `${getSiteUrl()}${getServiceHref(slug)}`;
  const description = buildDescription(pair, slug);
  return {
    title: { absolute: seo.title },
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
      title: seo.title,
      description,
      url,
      locale: 'es_CO',
    },
  };
}

function buildServiceJsonLd(pair: ServicePair, slug: string) {
  const { service, categoryTitle } = pair;
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${getServiceHref(slug)}`;
  const seo = getServiceSeo(slug, service.name);
  const price = getEnrichedPricingForService(service.name);
  const priceNumber = price ? parsePriceToNumber(price.price) : null;

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: categoryTitle,
    description: buildDescription(pair, slug),
    url,
    image: getServiceHeroImage(service.id),
    areaServed: {
      '@type': 'City',
      name: LOCAL_SEO.city,
    },
    provider: {
      '@type': 'BeautySalon',
      '@id': `${siteUrl}/#local`,
      name: SITE_NAME,
      url: siteUrl,
      telephone: PHONE_TEL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: LOCAL_SEO.addressStreet,
        addressLocality: LOCAL_SEO.city,
        addressRegion: LOCAL_SEO.region,
        postalCode: LOCAL_SEO.postalCode,
        addressCountry: LOCAL_SEO.countryCode,
      },
    },
    ...(priceNumber
      ? {
          offers: {
            '@type': 'Offer',
            price: String(priceNumber),
            priceCurrency: 'COP',
            availability: 'https://schema.org/InStock',
            url,
          },
        }
      : {}),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${siteUrl}/servicios` },
      { '@type': 'ListItem', position: 3, name: seo.title.split(' | ')[0], item: url },
    ],
  };

  const faqItems = getServiceFaqItems(service);
  const faqLd = faqItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return [serviceLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])];
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
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <ServiceDetailContent pair={pair} />
    </>
  );
}
