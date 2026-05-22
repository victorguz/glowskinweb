/**
 * Precios y descripciones alineados con `oldweb/src/app/constants/services.ts`
 */

export type PricingItem = {
  name: string;
  price: string;
  detail: string;
  /** Nota junto al precio (ej. valoración previa). */
  priceNote?: string;
  /** Inclusiones visibles en la lista, sin abrir detalles. */
  highlights?: string[];
};
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
      "Protocolos de higiene facial avanzados para diferentes necesidades de la piel",
    items: [
      {
        name: "Limpieza Facial Glow Skin",
        price: cop(125_000),
        detail:
          "Nuestro protocolo insignia. Purifica, equilibra y revitaliza todo tipo de piel.",
      },
      {
        name: "Limpieza Facial para Pieles Sensibles",
        price: cop(145_000),
        detail: "Protocolo ultra-suave para pieles reactivas o con rosácea.",
      },
      {
        name: 'Limpieza "Piel de Porcelana" (Efecto Glow)',
        price: cop(250_000),
        detail:
          "Todos los beneficios de nuestra limpieza facial Glow Skin, + ácidos que unifica el tono, minimizan los poros y aporta un brillo saludable.",
      },
      {
        name: "Limpieza Facial HydraGlow",
        price: cop(350_000),
        detail: "Tecnología Hydrafacial combinada con activos seleccionados.",
      },
    ],
  },
  {
    category: "Protocolos para Acné",
    description:
      "Tratamientos especializados para el control y eliminación del acné.",
    items: [
      {
        name: "Limpieza Facial Anti-Acné",
        price: cop(165_000),
        detail:
          "Enfocado en el control sebáceo y reducción de carga bacteriana.",
      },
      {
        name: "Limpieza Anti-Acné Seborreguladora",
        price: cop(415_000),
        detail:
          "Ideal para acné comedogénico activo y alta producción de grasa.",
      },
      {
        name: "Protocolo Anti-Acné Intensivo",
        price: cop(2_160_000),
        priceNote: "Requiere valoración",
        detail:
          "Programa integral diseñado para tratar el acné activo de leve a severo y devolverle el Glow a tu piel.",
        highlights: [
          "4 Limpiezas Faciales Anti-Acné",
          "4 Sesiones de Peeling Seborregulador",
          "4 Sesiones de Microneedling o Peeling Despigmentante",
        ],
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
        priceNote: "Incluye 3 sesiones",
        detail:
          "Renovación celular con ácidos de última generación para manchas y cicatrices.",
      },
      {
        name: "Tratamiento Regenerative (Cicatrices con Textura)",
        price: cop(1_200_000),
        detail:
          "6 Sesiones de Bioestimulación Celular con micropunciones y alta nutrición.",
      },
    ],
  },
  {
    category: "Rejuvenecimiento e Hidratación",
    description:
      "Tratamientos para combatir los signos del envejecimiento y mejorar la textura y la hidratación.",
    items: [
      {
        name: "Porcelanización Facial (Efecto Glow)",
        price: cop(250_000),
        detail:
          "Unifica el tono, minimiza poros y aporta un brillo saludable.",
      },
      {
        name: "Antiox Peel Pro (Efecto Lifting)",
        price: cop(375_000),
        detail:
          "Combate radicales libres, aporta luminosidad y mejora textura.",
      },
      {
        name: "HydraGlow + AntioxPeelPro",
        price: cop(450_000),
        detail:
          "La combinación perfecta para lograr un Glow inmediato y duradero.",
      },
    ],
  },
  {
    category: "Regeneración Avanzada con Exosomas",
    description:
      "La última frontera en regeneración celular y reparación intensiva.",
    items: [
      {
        name: "Microneedling Regenerativo con Exosomas (Regeneración celular x1000)",
        price: cop(1_200_000),
        priceNote: "Valor por sesión",
        detail:
          "Los exosomas son vesículas extracelulares diminutas que actúan como mensajeros biológicos entre células. Promueven la reparación intensiva de cicatrices, arrugas y flacidez.",
      },
      {
        name: "Tratamiento Regenerativo con Exosomas (Regeneración celular x10.000)",
        price: cop(2_700_000),
        detail:
          "Continúa enviando información a las células muertas y dañadas para que se reparen a sí mismas. Los exosomas son poderosos portadores de información que ayuda a nuestras células a regenerarse. Es una de las terapias más avanzadas de la medicina regenerativa.",
        highlights: ["3 Sesiones de Bioestimulación celular con Exosomas"],
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
];

/** Tratamientos más solicitados (destacados en precios / marketing). */
export const TOP_SELLER_TREATMENT_NAMES = [
  "Limpieza Facial Glow Skin",
  "Limpieza Facial Anti-Acné",
  "Protocolo Anti-Acné Intensivo",
] as const;

export type TopSellerTreatmentName = (typeof TOP_SELLER_TREATMENT_NAMES)[number];

export function isTopSellerTreatment(name: string): name is TopSellerTreatmentName {
  return (TOP_SELLER_TREATMENT_NAMES as readonly string[]).includes(name);
}

/** Ancla estable en /precios para enlazar desde best sellers u otras secciones. */
export function getPricingItemAnchorId(treatmentName: string): string {
  return (
    "precio-" +
    treatmentName
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

/** Nombres planos de tratamientos (formularios / leads). */
export function getPricingTreatmentNames(): string[] {
  return SERVICES_PRICING.flatMap((c) => c.items.map((i) => i.name));
}
export function getPricingByTreatmentName(name: string): string {
  for (const category of SERVICES_PRICING) {
    const item = category.items.find((i) => i.name === name);
    if (item) return item.price;
  }
  return "";
}
