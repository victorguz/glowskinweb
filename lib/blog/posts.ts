import { BLOG_POSTS } from '@/lib/blog/posts-data';
import type { BlogPost } from '@/lib/blog/types';

export type { BlogPost } from '@/lib/blog/types';

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  );
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
    excerpt: p.description.length > 155 ? `${p.description.slice(0, 152)}…` : p.description,
    date: formatBlogDate(p.datePublished),
    category: p.category,
    readTime: p.readTimeLabel,
    img: p.image,
  }));
}

function formatBlogDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
}
