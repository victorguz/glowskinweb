import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { BlogArticleBody } from "@/app/components/blog/BlogArticleBody";
import { BookingCtaButtons } from "@/app/components/marketing/BookingCtaButtons";
import {
  getAllBlogSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/posts";
import type { BlogPost } from "@/lib/blog/types";
import { getSiteUrl, SITE_NAME } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Quita la sintaxis de enlaces para usar el texto en datos estructurados. */
function plainText(text: string): string {
  return text.replace(LINK_PATTERN, "$1");
}

function countWords(post: BlogPost): number {
  const text = post.blocks
    .map((b) => {
      switch (b.type) {
        case "list":
          return b.items.join(" ");
        case "faq":
          return b.items.map((i) => `${i.q} ${i.a}`).join(" ");
        default:
          return b.text;
      }
    })
    .join(" ");
  return plainText(text).split(/\s+/).filter(Boolean).length;
}

function formatLongDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Artículo" };
  }
  const url = `${getSiteUrl()}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "es_CO",
      url,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
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

  const site = getSiteUrl();
  const url = `${site}/blog/${slug}`;
  const related = getRelatedPosts(slug, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    inLanguage: "es-CO",
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount: countWords(post),
    author: {
      "@type": "Person",
      name: "Sofía Nieto",
      jobTitle: "Cosmetóloga y cosmiatra",
      url: `${site}/nosotros`,
      worksFor: { "@type": "Organization", name: SITE_NAME, url: site },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${site}/files/glow-skin-sofia-nieto-logo-horizontal.png`,
      },
    },
    image: [post.image],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqItems = post.blocks.flatMap((b) => (b.type === "faq" ? b.items : []));
  const faqLd = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: plainText(item.a) },
        })),
      }
    : null;

  const jsonLd = [articleLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])];

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
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
                {formatLongDate(post.datePublished)}
              </span>
              {post.dateModified && post.dateModified !== post.datePublished ? (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#d4b499]" aria-hidden />
                  <span>Actualizado {formatLongDate(post.dateModified)}</span>
                </>
              ) : null}
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

        <article className="container mx-auto px-6 max-w-3xl pb-16">
          <BlogArticleBody blocks={post.blocks} />
        </article>

        <section
          aria-label="Reserva tu valoración"
          className="container mx-auto px-6 max-w-3xl pb-16"
        >
          <div className="rounded-[2rem] border border-[#d4b499]/40 bg-white/60 px-6 py-10 text-center md:px-12">
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-[#4a3221]">
              Si quieres que miremos tu piel
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-relaxed text-[#4a3221]/80">
              Empezamos con una valoración: te explicamos qué ve Sofía en tu piel
              y qué tendría sentido hacer, sin prisa.
            </p>
            <div className="mt-8">
              <BookingCtaButtons
                whatsappContext={post.ctaContext ?? "limpieza-facial"}
                reserveHereText="Reservar mi valoración"
                reserveWhatsappText="Escribir por WhatsApp"
              />
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <aside
            aria-label="Artículos relacionados"
            className="container mx-auto px-6 max-w-5xl pb-24"
          >
            <h2 className="mb-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#a5846e]">
              Sigue leyendo
            </h2>
            <ul className="grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="block h-full rounded-[1.5rem] border border-[#d4b499]/30 bg-white/50 p-6 transition-colors hover:bg-white"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a5846e]">
                      {r.category}
                    </span>
                    <span className="mt-3 block font-serif text-2xl leading-tight tracking-tight text-[#4a3221]">
                      {r.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </>
  );
}
