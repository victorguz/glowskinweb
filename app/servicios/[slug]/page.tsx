import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServiceDetailContent } from '@/app/components/services/ServiceDetailContent';
import { getAllServiceSlugs, getServiceBySlug } from '@/lib/content/service-utils';

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
  return {
    title: `${service.name} | Glow Skin`,
    description: service.description,
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
