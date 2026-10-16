import { BLOG_POSTS } from "@/lib/blog/posts-data";
import { BLOG_POSTS2 } from "@/lib/blog/posts-data2";
import { BLOG_POSTS3 } from "@/lib/blog/posts-data3";
import type { BlogPost } from "@/lib/blog/types";

export type { BlogPost } from "@/lib/blog/types";

// Combinar todos los posts de los archivos de datos
const ALL_BLOG_POSTS = [...BLOG_POSTS, ...BLOG_POSTS2, ...BLOG_POSTS3];

export function getAllBlogSlugs(): string[] {
  return ALL_BLOG_POSTS.map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...ALL_BLOG_POSTS].sort(
    (a, b) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
}

/**
 * Artículos relacionados: los que el propio artículo declara en `related` y, si
 * faltan, los que comparten más palabras clave o categoría.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const chosen: BlogPost[] = [];
  for (const relatedSlug of current.related ?? []) {
    const post = getPostBySlug(relatedSlug);
    if (post && post.slug !== slug) chosen.push(post);
  }

  if (chosen.length < limit) {
    const taken = new Set([slug, ...chosen.map((p) => p.slug)]);
    const words = new Set(
      current.keywords.flatMap((k) => k.toLowerCase().split(/\s+/)),
    );
    const scored = ALL_BLOG_POSTS.filter((p) => !taken.has(p.slug))
      .map((p) => ({
        post: p,
        score:
          (p.category === current.category ? 2 : 0) +
          p.keywords
            .flatMap((k) => k.toLowerCase().split(/\s+/))
            .filter((w) => w.length > 3 && words.has(w)).length,
      }))
      .sort((a, b) => b.score - a.score);
    for (const { post } of scored) {
      if (chosen.length >= limit) break;
      chosen.push(post);
    }
  }

  return chosen.slice(0, limit);
}

export type BlogListItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  img: string;
};

export function getBlogPostsForListing(): BlogListItem[] {
  return getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt:
      p.description.length > 155
        ? `${p.description.slice(0, 152)}…`
        : p.description,
    date: formatBlogDate(p.datePublished),
    category: p.category,
    readTime: p.readTimeLabel,
    img: p.image,
  }));
}

function formatBlogDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
