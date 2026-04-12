import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar } from 'lucide-react';
import { BlogArticleBody } from '@/app/components/blog/BlogArticleBody';
import { LeadTrigger } from '@/app/components/marketing/LeadTrigger';
import { getAllBlogSlugs, getPostBySlug } from '@/lib/blog/posts';
import { getSiteUrl, SITE_NAME } from '@/lib/seo/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'Artículo' };
  }
  const url = `${getSiteUrl()}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'es_CO',
      url,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${getSiteUrl()}/blog/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    author: {
      '@type': 'Person',
      name: 'Sofía Nieto',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
        logo: {
        '@type': 'ImageObject',
        url: `${getSiteUrl()}/files/glow-skin-sofia-nieto-logo-horizontal.png`,
      },
    },
    image: [post.image],
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] selection:bg-[#d4b499] selection:text-white">
        <header className="pt-24 md:pt-28 pb-12 text-center container mx-auto px-6">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="self-start mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#7d5a44] hover:text-[#d4b499] transition-colors"
            >
              ← Volver al blog
            </Link>
            <div className="w-16 h-px bg-[#d4b499] mb-6" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#a5846e] mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.05] tracking-tight text-[#4a3221] mb-6 text-balance">
              {post.title}
            </h1>
            {post.deck ? (
              <p className="text-lg md:text-xl font-medium text-[#7d5a44] italic leading-relaxed text-balance max-w-2xl">
                {post.deck}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#a5846e]">
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} aria-hidden />
                {new Date(`${post.datePublished}T12:00:00`).toLocaleDateString('es-CO', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#d4b499]" aria-hidden />
              <span>{post.readTimeLabel} lectura</span>
              <span className="w-1 h-1 rounded-full bg-[#d4b499]" aria-hidden />
              <span>Barranquilla, Colombia</span>
            </div>
          </div>
        </header>

        <section className="container mx-auto px-6 lg:px-12 mb-16">
          <div className="relative aspect-[21/9] max-h-[420px] overflow-hidden rounded-[2rem] shadow-[0_40px_100px_rgba(74,50,33,0.12)] mx-auto max-w-5xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 1024px"
              priority
            />
          </div>
        </section>

        <article className="container mx-auto px-6 max-w-3xl pb-24">
          <BlogArticleBody blocks={post.blocks} />
          <footer className="mt-16 pt-10 border-t border-[#4a3221]/10">
            <div className="flex flex-col items-center gap-6">
              <p className="text-sm text-[#7d5a44] leading-relaxed text-center">
                ¿Quieres una valoración personalizada en{' '}
                <strong className="text-[#4a3221]">Glow Skin</strong>?
              </p>
              <LeadTrigger
                mode="booking"
                className="bg-[#d4b499] hover:bg-[#c2a085] text-[#4a3221] px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 transform hover:scale-105 shadow-[0_20px_40px_rgba(212,180,153,0.3)]"
              >
                Agendar valoración ahora
              </LeadTrigger>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
