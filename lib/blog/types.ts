export type BlogBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; items: { q: string; a: string }[] };

export type BlogPost = {
  slug: string;
  title: string;
  /** Subtítulo corto bajo el H1 */
  deck?: string;
  description: string;
  keywords: string[];
  datePublished: string;
  /** Última revisión del contenido (AAAA-MM-DD); si falta, se usa datePublished. */
  dateModified?: string;
  category: string;
  readTimeLabel: string;
  image: string;
  /**
   * Contexto del botón de reserva al final del artículo (ver `whatsapp-messages.ts`).
   * Por defecto, "limpieza-facial".
   */
  ctaContext?: string;
  /** Slugs de artículos relacionados; si falta, se calculan por categoría y palabras clave. */
  related?: string[];
  /**
   * Los bloques `p`, `lead`, `list` y `faq` admiten enlaces con la sintaxis
   * `[texto](/ruta)`.
   */
  blocks: BlogBlock[];
};
