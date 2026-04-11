import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo/site';
import { getAllServiceSlugs } from '@/lib/content/service-utils';
import { getAllBlogSlugs } from '@/lib/blog/posts';

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
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: lastMod,
    changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/servicios' || path === '/precios' ? 0.9 : 0.8,
  }));

  for (const slug of getAllServiceSlugs()) {
    entries.push({
      url: `${base}/servicios/${slug}`,
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

  return entries;
}
