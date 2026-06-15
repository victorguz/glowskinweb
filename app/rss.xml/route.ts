import { getAllPosts } from "@/lib/blog/posts";
import { getSiteUrl, SITE_NAME } from "@/lib/seo/site";

export const dynamic = "force-static";
export const revalidate = 86400;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = getSiteUrl();
  const posts = getAllPosts();
  const lastBuildDate = posts[0]
    ? new Date(`${posts[0].datePublished}T12:00:00`).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const pubDate = new Date(`${post.datePublished}T12:00:00`).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} Barranquilla - Blog`)}</title>
    <description>Blog de ${SITE_NAME}: limpieza facial, acné, PDRN, exosomas y cuidado de la piel en Barranquilla.</description>
    <link>${base}</link>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>es-CO</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
