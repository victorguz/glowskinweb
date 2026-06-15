/**
 * Slugs antiguos del blog → slug canónico actual.
 * Mantener 301s aquí evita "Page with redirect" hacia landings irrelevantes.
 */
export const BLOG_LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  "como-realizar-limpieza-facial-casa": "limpieza-facial-en-casa-por-que-evitarla",
  "envejecimiento-prematuro": "envejecimiento-prematuro-como-prevenirlo",
  "pdrn-exosomas": "pdrn-o-exosomas-cual-elegir",
  "por-que-daddy-yankee-joven": "por-que-daddy-yankee-se-ve-joven",
  "que-es-pdrn-famosos": "que-es-pdrn-por-que-lo-prefieren-los-famosos",
  "que-hacer-despues-limpieza-facial": "que-hacer-despues-de-una-limpieza-facial",
  "que-son-exosomas": "que-son-los-exosomas",
  "resenas-pacientes-glow-skin": "resenas-pacientes-google-maps",
  "reseñas-pacientes-glow-skin": "resenas-pacientes-google-maps",
};

export function normalizeBlogSlug(slug: string): string {
  return decodeURIComponent(slug).trim().toLowerCase();
}

export function resolveBlogLegacySlug(slug: string): string | undefined {
  return BLOG_LEGACY_SLUG_REDIRECTS[normalizeBlogSlug(slug)];
}

export function getBlogLegacyRedirectsForConfig(): Array<{
  source: string;
  destination: string;
  permanent: true;
}> {
  return Object.entries(BLOG_LEGACY_SLUG_REDIRECTS).map(([legacy, canonical]) => ({
    source: `/blog/${legacy}`,
    destination: `/blog/${canonical}`,
    permanent: true,
  }));
}
