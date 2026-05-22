import { getAllServiceSlugs } from "@/lib/content/service-utils";

export const DEFAULT_NOT_FOUND_DESTINATION = "/limpieza-facial";

type RouteCandidate = {
  path: string;
  keywords: string[];
};

/** Rutas canónicas y palabras que suelen aparecer en URLs rotas o campañas. */
const ROUTE_CANDIDATES: RouteCandidate[] = [
  {
    path: "/limpieza-facial",
    keywords: [
      "limpieza",
      "limpiezas",
      "facial",
      "faciales",
      "extraccion",
      "higiene",
      "profunda",
      "hydraglow",
      "glow-skin",
      "glowskin",
    ],
  },
  {
    path: "/anti-acne",
    keywords: [
      "anti-acne",
      "antiacne",
      "acne",
      "acné",
      "acnee",
      "seborrea",
      "seborreguladora",
      "granos",
      "espinillas",
    ],
  },
  {
    path: "/antiox-peel-pro",
    keywords: [
      "antiox",
      "peel",
      "peeling",
      "peel-pro",
      "antioxidante",
      "luminosidad",
      "luminosa",
    ],
  },
  {
    path: "/microneedling",
    keywords: [
      "microneedling",
      "microagujas",
      "micro-agujas",
      "dermapen",
      "cicatrices",
      "cicatriz",
      "manchas",
      "despigmentante",
      "regenerative",
      "exosomas",
      "pdrn",
    ],
  },
  {
    path: "/porcelanizacion-facial",
    keywords: [
      "porcelanizacion",
      "porcelanización",
      "porcelana",
      "porcelain",
      "porcelanizado",
    ],
  },
  {
    path: "/metodo-glow-skin",
    keywords: ["metodo", "método", "metodologia", "metodología", "glow-skin"],
  },
  { path: "/servicios", keywords: ["servicios", "servicio", "services", "tratamiento", "tratamientos", "protocolo"] },
  { path: "/precios", keywords: ["precios", "precio", "tarifas", "tarifa", "costo", "costos", "valor"] },
  { path: "/blog", keywords: ["blog", "articulo", "artículo", "articulos", "noticia", "noticias"] },
  { path: "/casos", keywords: ["casos", "caso", "antes-despues", "resultados", "testimonio"] },
  { path: "/nosotros", keywords: ["nosotros", "quienes-somos", "equipo", "clinica", "clínica", "spa"] },
  { path: "/", keywords: ["inicio", "home", "principal"] },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[_\s]+/g, "-");
}

function scoreKeyword(haystack: string, segments: string[], keyword: string): number {
  const kw = normalize(keyword);
  if (!kw) return 0;

  let score = 0;
  if (haystack.includes(kw)) {
    score += kw.length >= 8 ? 4 : kw.length >= 5 ? 3 : 2;
  }

  for (const segment of segments) {
    if (segment === kw) score += 8;
    else if (segment.startsWith(kw) || kw.startsWith(segment)) score += 5;
    else if (segment.includes(kw) || kw.includes(segment)) score += 3;
  }

  return score;
}

function scoreServiceSlug(haystack: string, segments: string[], slug: string): number {
  const normalizedSlug = normalize(slug);
  let score = 0;

  if (haystack.includes(normalizedSlug)) score += 10;

  for (const part of normalizedSlug.split("-")) {
    if (part.length < 3) continue;
    score += scoreKeyword(haystack, segments, part);
  }

  return score;
}

/**
 * Dada una ruta inexistente, devuelve la ruta canónica más parecida por palabras en la URL.
 * Si no hay coincidencias, usa la landing por defecto.
 */
export function resolveSimilarRoute(pathname: string): string {
  const normalizedPath = normalize(pathname || "/");
  const segments = normalizedPath.split("/").filter(Boolean);
  const haystack = segments.join("-");

  if (!haystack) return DEFAULT_NOT_FOUND_DESTINATION;

  let bestPath = DEFAULT_NOT_FOUND_DESTINATION;
  let bestScore = 0;

  for (const candidate of ROUTE_CANDIDATES) {
    let score = 0;
    for (const keyword of candidate.keywords) {
      score += scoreKeyword(haystack, segments, keyword);
    }
    const routeSlug = candidate.path.replace(/^\//, "");
    if (routeSlug && haystack.includes(routeSlug)) {
      score += 6;
    }
    if (score > bestScore) {
      bestScore = score;
      bestPath = candidate.path;
    }
  }

  for (const slug of getAllServiceSlugs()) {
    const score = scoreServiceSlug(haystack, segments, slug);
    if (score > bestScore) {
      bestScore = score;
      bestPath = `/servicios/${slug}`;
    }
  }

  return bestScore > 0 ? bestPath : DEFAULT_NOT_FOUND_DESTINATION;
}
