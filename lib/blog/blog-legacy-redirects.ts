/**
 * Slugs antiguos o retirados del blog → destino.
 * Si el destino empieza por "/" se usa tal cual (otra sección del sitio);
 * si no, es el slug canónico de un artículo del blog.
 * Mantener 301s aquí evita "Page with redirect" hacia landings irrelevantes.
 */
export const BLOG_LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  "como-realizar-limpieza-facial-casa": "limpieza-facial-en-casa-por-que-evitarla",
  "envejecimiento-prematuro": "envejecimiento-prematuro-como-prevenirlo",
  "pdrn-exosomas": "pdrn-o-exosomas-cual-elegir",
  "por-que-daddy-yankee-joven": "envejecimiento-prematuro-como-prevenirlo",
  "que-es-pdrn-famosos": "que-es-el-pdrn-y-para-que-se-usa",
  "que-hacer-despues-limpieza-facial": "que-hacer-despues-de-una-limpieza-facial",
  "que-son-exosomas": "que-son-los-exosomas",
  "resenas-pacientes-glow-skin": "/casos",
  "reseñas-pacientes-glow-skin": "/casos",

  // Artículos retirados o renombrados el 16 oct 2026.
  "por-que-daddy-yankee-se-ve-joven": "envejecimiento-prematuro-como-prevenirlo",
  "secreto-kardashians-piel-porcelana": "/servicios/porcelanizacion-facial",
  "mejor-limpieza-facial-norte-barranquilla":
    "como-elegir-donde-hacerte-una-limpieza-facial-en-barranquilla",
  "mejor-limpieza-facial-alto-prado":
    "como-elegir-donde-hacerte-una-limpieza-facial-en-barranquilla",
  "resenas-pacientes-google-maps": "/casos",
  "que-es-pdrn-por-que-lo-prefieren-los-famosos": "que-es-el-pdrn-y-para-que-se-usa",
};

export function normalizeBlogSlug(slug: string): string {
  return decodeURIComponent(slug).trim().toLowerCase();
}

export function resolveBlogLegacySlug(slug: string): string | undefined {
  return BLOG_LEGACY_SLUG_REDIRECTS[normalizeBlogSlug(slug)];
}

/** Ruta final de un destino del mapa: rutas del sitio tal cual, slugs bajo /blog. */
export function blogLegacyDestination(target: string): string {
  return target.startsWith("/") ? target : `/blog/${target}`;
}

export function getBlogLegacyRedirectsForConfig(): Array<{
  source: string;
  destination: string;
  permanent: true;
}> {
  return Object.entries(BLOG_LEGACY_SLUG_REDIRECTS).map(([legacy, target]) => ({
    source: `/blog/${legacy}`,
    destination: blogLegacyDestination(target),
    permanent: true,
  }));
}
