/**
 * SEO de las páginas de servicio (`/servicios/[slug]`): título y descripción
 * propios por servicio (con la ciudad y la intención de búsqueda), y preguntas
 * frecuentes para los servicios que no traen las suyas en `services.ts`.
 *
 * Los textos salen de lo que ya publica el sitio (páginas de servicio y lista
 * de precios); aquí no se inventan cifras, plazos ni prácticas.
 */

import type { CategoryServicePair } from "@/lib/content/service-utils";

export type ServiceSeo = {
  /** Título completo de la página (≤ 60 caracteres, sin plantilla). */
  title: string;
  /** Descripción base (≤ 120 caracteres); el precio se añade aparte. */
  description: string;
};

export const SERVICE_SEO: Record<string, ServiceSeo> = {
  "limpieza-facial": {
    title: "Limpieza facial profunda en Barranquilla | Glow Skin",
    description:
      "Limpieza facial profunda con diagnóstico, extracción profesional y alta frecuencia. 60 a 90 minutos. Reserva tu valoración.",
  },
  "limpieza-facial-anti-acne": {
    title: "Limpieza facial anti-acné en Barranquilla | Glow Skin",
    description:
      "Limpieza anti-acné enfocada en el exceso de sebo y la carga bacteriana, con extracción y alta frecuencia. Reserva tu valoración.",
  },
  "limpieza-facial-pieles-sensibles": {
    title: "Limpieza facial piel sensible en Barranquilla | Glow Skin",
    description:
      "Limpieza facial suave para piel sensible o con rosácea: productos hipoalergénicos y extracción mínima. Reserva tu valoración.",
  },
  hydraglow: {
    title: "HydraGlow: Hydrafacial en Barranquilla | Glow Skin",
    description:
      "HydraGlow combina tecnología Hydrafacial con activos a tu medida: limpia, exfolia e hidrata. Reserva tu valoración.",
  },
  "limpieza-seborreguladora": {
    title: "Limpieza seborreguladora en Barranquilla | Glow Skin",
    description:
      "Limpieza anti-acné con peeling seborregulador para piel grasa y acné comedogénico. 6 a 8 sesiones recomendadas.",
  },
  "tratamiento-despigmentante": {
    title: "Peeling despigmentante en Barranquilla | Glow Skin",
    description:
      "Peelings químicos para manchas, melasma y marcas posinflamatorias, con protocolo de 3 sesiones. Reserva tu valoración.",
  },
  "antiox-peel-pro": {
    title: "Antiox Peel Pro: peeling facial en Barranquilla | Glow Skin",
    description:
      "Peeling antioxidante para luminosidad, uniformidad y textura. Se recomienda cada 4 a 6 semanas. Reserva tu valoración.",
  },
  "porcelanizacion-facial": {
    title: "Porcelanización facial en Barranquilla | Glow Skin",
    description:
      "Limpieza con activos tensores y unificadores y mascarilla hidroplástica para un efecto glow. Reserva tu valoración.",
  },
  "hydraglow-antiox-peel": {
    title: "HydraGlow + Antiox Peel Pro en Barranquilla | Glow Skin",
    description:
      "HydraGlow y peeling antioxidante combinados para hidratación y luminosidad. Reserva tu valoración.",
  },
  "microneedling-exosomas": {
    title: "Microneedling con exosomas en Barranquilla | Glow Skin",
    description:
      "Microneedling con exosomas y terapia de luz LED para cicatrices, textura y flacidez. Reserva tu valoración.",
  },
  "microneedling-exosomas-3-sesiones": {
    title: "Microneedling con exosomas: 3 sesiones | Glow Skin",
    description:
      "Protocolo de 3 sesiones de microneedling con exosomas y terapia LED en Barranquilla, con seguimiento personalizado.",
  },
  "protocolo-pdrn": {
    title: "PDRN en Barranquilla: aplicación por sesión | Glow Skin",
    description:
      "Aplicación de PDRN con micropunciones en rostro, cuello y escote, por sesión. Reserva tu valoración.",
  },
  "protocolo-pdrn-3-sesiones": {
    title: "Protocolo PDRN de 3 sesiones en Barranquilla | Glow Skin",
    description:
      "Protocolo de 3 sesiones de PDRN con micropunciones para rostro, cuello y escote, con seguimiento personalizado.",
  },
  "tratamiento-regenerative-plus": {
    title: "Cicatrices de acné y textura en Barranquilla | Glow Skin",
    description:
      "Tratamiento regenerativo con microneedling para cicatrices y textura, con plan personalizado. Reserva tu valoración.",
  },
};

/** Preguntas frecuentes de los servicios sin página propia (`page.faq`). */
type FaqEntry = { question: string; answer: string };

const PDRN_FAQ: FaqEntry[] = [
  {
    question: "¿Cuántas sesiones tiene el tratamiento con PDRN?",
    answer:
      "Hay una opción de 1 sesión, con valor por sesión, y un protocolo de 3 sesiones, con seguimiento personalizado durante todo el proceso.",
  },
  {
    question: "¿Para qué zonas se puede aplicar?",
    answer: "Para rostro, cuello y escote.",
  },
  {
    question: "¿Cómo se aplica el PDRN?",
    answer:
      "Mediante micropunciones, una técnica que permite entregarlo en la dermis de forma efectiva.",
  },
  {
    question: "¿Cuándo se ven los resultados?",
    answer:
      "Los resultados son progresivos y requieren cuidado posterior. Cada piel responde distinto, y eso se ajusta con el seguimiento.",
  },
  {
    question: "¿Qué cuidados debo tener después?",
    answer:
      "Dependen de tu sesión. En los tratamientos con microneedling, por ejemplo, las primeras 24 a 48 horas se evitan el sol, el maquillaje y los productos activos, y se usa protector solar SPF 50+ a diario. Pregunta por las indicaciones de tu sesión.",
  },
];

const MICRONEEDLING_FAQ: FaqEntry[] = [
  {
    question: "¿Es doloroso el microneedling?",
    answer:
      "Aplicamos crema anestésica antes del procedimiento para minimizar la incomodidad. La mayoría de las personas describe una sensación de presión leve y tolerable.",
  },
  {
    question: "¿Cuántas sesiones necesito?",
    answer:
      "Para cicatrices y textura, recomendamos 3 sesiones separadas por 4 a 6 semanas. En la consulta inicial evaluamos tu caso para definir el plan.",
  },
  {
    question: "¿Cuándo veré resultados?",
    answer:
      "La piel comienza a mejorar desde las 2 semanas posteriores a la sesión. Los cambios más significativos se aprecian a partir del segundo mes, cuando el colágeno nuevo ya está activo.",
  },
  {
    question: "¿Qué cuidados debo tener después?",
    answer:
      "Durante las primeras 24 a 48 horas evita el sol, el maquillaje y los productos activos. Usa solo los productos recomendados y aplica SPF 50+ a diario durante el tratamiento.",
  },
];

export const SERVICE_FALLBACK_FAQ: Record<string, FaqEntry[]> = {
  "protocolo-pdrn": PDRN_FAQ,
  "protocolo-pdrn-3-sesiones": PDRN_FAQ,
  "microneedling-exosomas-3-sesiones": MICRONEEDLING_FAQ,
  "tratamiento-regenerative-plus": MICRONEEDLING_FAQ,
};

export function getServiceSeo(serviceId: string, serviceName: string): ServiceSeo {
  return (
    SERVICE_SEO[serviceId] ?? {
      title: `${serviceName} en Barranquilla | Glow Skin`,
      description: `${serviceName} en Glow Skin, Barranquilla. Reserva tu valoración.`,
    }
  );
}

/** Preguntas frecuentes del servicio: las propias de `page.faq` o las de respaldo. */
export function getServiceFaqItems(
  service: CategoryServicePair["service"],
): FaqEntry[] {
  const page = (service as { page?: { faq?: unknown } }).page;
  if (page && Array.isArray(page.faq) && page.faq.length > 0) {
    return page.faq as FaqEntry[];
  }
  return SERVICE_FALLBACK_FAQ[service.id] ?? [];
}

/** "$ 125.000" → 125000 */
export function parsePriceToNumber(price: string): number | null {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

/** "$ 125.000" → "$125.000" */
export function compactPrice(price: string): string {
  return price.replace(/\$\s+/, "$");
}
