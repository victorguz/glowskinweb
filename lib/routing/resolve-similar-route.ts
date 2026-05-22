import landingPages from "@/app/landing-pages.config";
import { getAllServiceSlugs } from "@/lib/content/service-utils";

export const DEFAULT_NOT_FOUND_DESTINATION = "/limpieza-facial";

const LANDING_PATHS = new Set<string>(landingPages);

type RouteCandidate = {
  path: string;
  keywords: string[];
};

/** Solo landings de acción rápida + método Glow Skin. */
const LANDING_ROUTE_CANDIDATES: RouteCandidate[] = [
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
      "glowskin",
      "pieles-sensibles",
      "sensible",
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
    keywords: [
      "metodo",
      "método",
      "metodologia",
      "metodología",
      "glow-skin",
      "protocolos-acne",
      "protocolo-acne",
      "tratamiento-anti-acne-intensivo",
      "anti-acne-intensivo",
      "metodo-anti-acne",
      "protocolo",
      "protocolos",
      "tratamiento",
      "tratamientos",
      "servicio",
      "servicios",
    ],
  },
];

/** Slugs de ficha de servicio → landing más cercana (nunca `/servicios/...`). */
const SERVICE_SLUG_TO_LANDING: Record<string, string> = {
  "limpieza-facial": "/limpieza-facial",
  "limpieza-facial-anti-acne": "/anti-acne",
  "limpieza-facial-pieles-sensibles": "/limpieza-facial",
  hydraglow: "/limpieza-facial",
  "limpieza-seborreguladora": "/anti-acne",
  "tratamiento-anti-acne-intensivo": "/metodo-glow-skin",
  "tratamiento-despigmentante": "/microneedling",
  "tratamiento-regenerative-plus": "/microneedling",
  "antiox-peel-pro": "/antiox-peel-pro",
  "porcelanizacion-facial": "/porcelanizacion-facial",
  "hydraglow-antiox-peel": "/antiox-peel-pro",
  "microneedling-exosomas": "/microneedling",
  "microneedling-exosomas-3-sesiones": "/microneedling",
  "protocolo-pdrn": "/microneedling",
  "protocolo-pdrn-3-sesiones": "/microneedling",
};

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

function assertLandingPath(path: string): string {
  return LANDING_PATHS.has(path) ? path : DEFAULT_NOT_FOUND_DESTINATION;
}

/**
 * Dada una ruta inexistente, devuelve la landing más parecida por palabras en la URL.
 * Si no hay coincidencias, usa `/limpieza-facial`.
 */
export function resolveSimilarRoute(pathname: string): string {
  const normalizedPath = normalize(pathname || "/");
  const segments = normalizedPath.split("/").filter(Boolean);
  const haystack = segments.join("-");

  if (!haystack) return DEFAULT_NOT_FOUND_DESTINATION;

  let bestPath = DEFAULT_NOT_FOUND_DESTINATION;
  let bestScore = 0;

  for (const candidate of LANDING_ROUTE_CANDIDATES) {
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
    const landing = SERVICE_SLUG_TO_LANDING[slug];
    if (!landing) continue;

    const score = scoreServiceSlug(haystack, segments, slug);
    if (score > bestScore) {
      bestScore = score;
      bestPath = landing;
    }
  }

  return assertLandingPath(bestScore > 0 ? bestPath : DEFAULT_NOT_FOUND_DESTINATION);
}
