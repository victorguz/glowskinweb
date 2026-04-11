/**
 * Precios y descripciones alineados con `oldweb/src/app/constants/services.ts`
 */

export type PricingItem = { name: string; price: string; detail: string };
export type PricingCategory = {
  category: string;
  description: string;
  items: PricingItem[];
};

function cop(n: number): string {
  return `$ ${n.toLocaleString("es-CO")}`;
}

export const SERVICES_PRICING: PricingCategory[] = [
  {
    category: "Limpiezas Faciales",
    description:
      "Protocolos de higiene facial avanzados para diferentes necesidades de la piel.",
    items: [
      {
        name: "Limpieza Facial Glow Skin",
        price: cop(125_000),
        detail:
          "Nuestro protocolo insignia. Purifica, equilibra y revitaliza todo tipo de piel.",
      },
      {
        name: "Limpieza Facial Anti-Acné",
        price: cop(165_000),
        detail:
          "Enfocado en el control sebáceo y reducción de carga bacteriana.",
      },
      {
        name: "Limpieza Facial para Pieles Sensibles",
        price: cop(140_000),
        detail: "Protocolo ultra-suave para pieles reactivas o con rosácea.",
      },
      {
        name: "Limpieza Facial HydraGlow",
        price: cop(350_000),
        detail: "Tecnología Hydrafacial combinada con activos seleccionados.",
      },
      {
        name: "Limpieza Anti-Acné Seborreguladora",
        price: cop(415_000),
        detail:
          "Ideal para acné comedogénico activo y alta producción de grasa.",
      },
    ],
  },
  {
    category: "Protocolos para Acné",
    description:
      "Tratamientos especializados para el control y eliminación del acné.",
    items: [
      {
        name: "Tratamiento Anti-Acné Intensivo",
        price: cop(830_000),
        detail:
          "Programa integral diseñado para tratar el acné activo de leve a severo.",
      },
    ],
  },
  {
    category: "Manchas y Cicatrices",
    description:
      "Tratamientos especializados para la eliminación de manchas y mejora de cicatrices.",
    items: [
      {
        name: "Despigmentante con Peelings Químicos",
        price: cop(600_000),
        detail:
          "Renovación celular con ácidos de última generación para melasma e HPI.",
      },
      {
        name: "Regenerative + (Cicatrices y Textura)",
        price: cop(1_200_000),
        detail: "Bioestimulación celular con micropunciones y alta nutrición.",
      },
    ],
  },
  {
    category: "Rejuvenecimiento",
    description:
      "Tratamientos para combatir los signos del envejecimiento y mejorar la textura.",
    items: [
      {
        name: "Antiox Peel Pro (Peeling Antioxidante)",
        price: cop(375_000),
        detail:
          "Combate radicales libres, aporta luminosidad y mejora textura.",
      },
      {
        name: "Porcelanización Facial (Efecto Glow)",
        price: cop(250_000),
        detail: "Unifica el tono, minimiza poros y aporta un brillo saludable.",
      },
      {
        name: "HydraGlow + Antiox Peel Pro",
        price: cop(450_000),
        detail:
          "La combinación perfecta para lograr un Glow inmediato y duradero.",
      },
    ],
  },
  {
    category: "Terapia Avanzada con Exosomas",
    description:
      "La última frontera en regeneración celular y reparación intensiva.",
    items: [
      {
        name: "Microneedling Regenerativo + Exosomas",
        price: cop(1_200_000),
        detail: "Reparación intensiva de cicatrices, arrugas y flacidez.",
      },
      {
        name: "Tratamiento 3 Sesiones Exosomas",
        price: cop(2_700_000),
        detail: "Máximo beneficio regenerativo con protocolo de choque.",
      },
    ],
  },
  {
    category: "Bio-regeneración PDRN",
    description: "Reparación del ADN celular con polinucleótidos de salmón.",
    items: [
      {
        name: "Protocolo PDRN Rejuvenecimiento Intensivo",
        price: cop(900_000),
        detail: "Restaura firmeza, elasticidad y atenúa arrugas finas.",
      },
      {
        name: "Tratamiento 3 Sesiones PDRN",
        price: cop(2_100_000),
        detail: "Resultados duraderos en firmeza y calidad de la piel.",
      },
    ],
  },
  {
    category: "Cuidado de Labios",
    description:
      "Tratamientos para revitalizar y mejorar la apariencia de los labios.",
    items: [
      {
        name: "Glow Lips",
        price: cop(120_000),
        detail: "Revitaliza, neutraliza y devuelve la vida a tus labios.",
      },
      {
        name: "Tratamiento 3 Sesiones Glow Lips",
        price: cop(300_000),
        detail: "Resultado óptimo y duradero en la revitalización labial.",
      },
    ],
  },
];

/** Nombres planos de tratamientos (formularios / leads). */
export function getPricingTreatmentNames(): string[] {
  return SERVICES_PRICING.flatMap((c) => c.items.map((i) => i.name));
}
