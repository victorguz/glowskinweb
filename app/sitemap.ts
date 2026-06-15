import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo/site';
import { getAllServiceSlugs } from '@/lib/content/service-utils';
import { getServiceHref } from '@/lib/routing/service-routes';
import { getAllBlogSlugs, getAllPosts } from '@/lib/blog/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastMod = new Date();

  const staticPaths = [
    '',
    '/nosotros',
    '/precios',
    '/casos',
    '/servicios',
    '/blog',
    '/otra',
    '/metodo-glow-skin',
    '/limpieza-facial',
    '/anti-acne',
    '/antiox-peel-pro',
    '/microneedling',
    '/porcelanizacion-facial',
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: lastMod,
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/servicios' || path === '/precios' ? 0.9 : 0.8,
  }));

  const servicePaths = new Set<string>();
  for (const slug of getAllServiceSlugs()) {
    servicePaths.add(getServiceHref(slug));
  }
  for (const path of servicePaths) {
    entries.push({
      url: `${base}${path}`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  }

  for (const slug of getAllBlogSlugs()) {
    entries.push({
      url: `${base}/blog/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.75,
    });
  }

  for (const post of getAllPosts()) {
    const idx = entries.findIndex((e) => e.url === `${base}/blog/${post.slug}`);
    if (idx >= 0) {
      entries[idx] = {
        ...entries[idx],
        lastModified: new Date(`${post.datePublished}T12:00:00`),
      };
    }
  }

  return entries;
}
