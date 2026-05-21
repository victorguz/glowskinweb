import { landingAsset } from "@/lib/landings/cdn";

const MICRONEEDLING = "microneedling/manchas-y-cicatrices-3-meses";

export type LandingImage = {
  src: string;
  alt: string;
  /** Antes / Después — orden de aparición según config */
  label?: string;
};

export type QuickLandingConfig = {
  whatsappContext: string;
  badge: string;
  titleLine: string;
  titleAccent: string;
  body: string;
  images: LandingImage[];
  ctaEyebrow: string;
  ctaTitleLine: string;
  ctaTitleAccent?: string;
  ctaBody: string;
  ctaFootnote: string;
  metadata: {
    title: string;
    description: string;
  };
};

export const quickLandings = {
  "limpieza-facial": {
    whatsappContext: "limpieza-facial",
    badge: "Glow real",
    titleLine: "¿Extrañas ese glow",
    titleAccent: "en tu rostro?",
    body: "Si tu rostro luce opaco, pesado o sin vida, quizá no necesitas más maquillaje ni filtros encima. Una limpieza facial profesional retira lo que opaca tu piel y devuelve frescura visible desde la primera sesión — más ligera, más limpia y mucho más viva.",
    images: [
      {
        src: landingAsset("limpieza-facial/extraccion/extraccion.jpg"),
        alt: "Extracción profesional durante limpieza facial en Glow Skin",
        label: "Antes",
      },
      {
        src: landingAsset("limpieza-facial/extraccion/piel-glow-min.jpg"),
        alt: "Piel con glow después de limpieza facial en Glow Skin",
        label: "Después",
      },
    ],
    ctaEyebrow: "Una sesión basta",
    ctaTitleLine: "Devuélvele",
    ctaTitleAccent: "la luz.",
    ctaBody:
      "Tu rostro no siempre necesita más producto: a veces necesita menos acumulación y mejores manos. Agenda tu limpieza facial en Barranquilla.",
    ctaFootnote: "Sin compromiso · Diagnóstico profesional",
    metadata: {
      title: "Limpieza facial con efecto glow",
      description:
        "Impurezas fuera, glow visible y piel más fresca. Limpieza facial profesional en Glow Skin Barranquilla.",
    },
  },
  "antiox-peel-pro": {
    whatsappContext: "antiox-peel-pro",
    badge: "Reacción real",
    titleLine: "¿Tu piel está",
    titleAccent: "sin vida?",
    body: "Esa sorpresa frente al espejo no es casualidad: Antiox Peel Pro deja la piel tan luminosa que el cambio se nota al instante — más uniforme, más fresca y con un glow que muchas sienten apenas termina la sesión. La mejor prueba es una reacción auténtica, no una promesa vacía.",
    images: [
      {
        src: landingAsset(
          "antiox-peel-pro/reacciones-reales-pacientes/antiox-peel-pro-reaccion-paciente-1.jpg",
        ),
        alt: "Paciente durante Antiox Peel Pro en Glow Skin",
        label: "Antes",
      },
      {
        src: landingAsset("antiox-peel-pro/antiox-min.png"),
        alt: "Resultado luminoso tras Antiox Peel Pro",
        label: "Después",
      },
    ],
    ctaEyebrow: "Glow inmediato",
    ctaTitleLine: "Míralo",
    ctaTitleAccent: "en el espejo.",
    ctaBody:
      "El hit de Glow Skin: textura más fina, luz renovada y un facial que se siente premium desde el primer día. Reserva tu Antiox Peel Pro.",
    ctaFootnote: "Resultado visible · Valoración incluida",
    metadata: {
      title: "Antiox Peel Pro — facial antioxidante",
      description:
        "Piel luminosa al instante tras la sesión. El tratamiento favorito de Glow Skin en Barranquilla con glow real.",
    },
  },
  "anti-acne": {
    whatsappContext: "anti-acne",
    badge: "Caso Valentina",
    titleLine: "¿Te cansaste de",
    titleAccent: "esconder el acné?",
    body: "El caso de Valentina impacta porque muestra lo que ocurre cuando la piel deja de improvisar y sigue un plan anti-acné real: valoración, constancia y protocolo pensado para su rostro. No es suerte — es una ruta clara que devuelve calma, menos inflamación y un cambio que se ve.",
    images: [
      {
        src: landingAsset(
          "anti-acne/caso-real-valentina/caso-valentina-acne-1.jpg",
        ),
        alt: "Valentina antes del tratamiento anti-acné en Glow Skin",
        label: "Antes",
      },
      {
        src: landingAsset(
          "anti-acne/caso-real-valentina/caso-valentina-acne-4.jpg",
        ),
        alt: "Valentina después del tratamiento anti-acné en Glow Skin",
        label: "Después",
      },
    ],
    ctaEyebrow: "Cambio real",
    ctaTitleLine: "Tu proceso",
    ctaTitleAccent: "también empieza.",
    ctaBody:
      "Lo que hoy ves en Valentina comenzó con una valoración seria y decisiones a tiempo. Deja de posponerlo: agenda y conoce el protocolo indicado para tu piel.",
    ctaFootnote: "Caso documentado · Sin filtros",
    metadata: {
      title: "Tratamiento anti-acné en Barranquilla",
      description:
        "Menos inflamación, más confianza. Protocolo anti-acné en Glow Skin con seguimiento experto y resultados visibles.",
    },
  },
  microneedling: {
    whatsappContext: "microneedling",
    badge: "3 meses después",
    titleLine: "¿Sigues viviendo con",
    titleAccent: "marcas y cicatrices?",
    body: "Las marcas no tienen que definir tu rostro para siempre. Con microneedling y un plan serio en Glow Skin, la textura puede volverse más uniforme y limpia — no es magia: es constancia, técnica y el estímulo correcto mes a mes hasta que el cambio sorprende.",
    images: [
      {
        src: landingAsset(
          `${MICRONEEDLING}/microneedling-cicatrices-antes-despues-1.jpg`,
        ),
        alt: "Antes del tratamiento de microneedling en Glow Skin",
        label: "Antes",
      },
      {
        src: landingAsset(
          `${MICRONEEDLING}/microneedling-cicatrices-antes-despues-2.jpg`,
        ),
        alt: "Después del tratamiento de microneedling en Glow Skin",
        label: "Después",
      },
    ],
    ctaEyebrow: "Proceso visible",
    ctaTitleLine: "Textura",
    ctaTitleAccent: "nueva.",
    ctaBody:
      "Tres meses de trabajo constante pueden devolverte uniformidad y confianza frente al espejo. Agenda tu valoración y diseñemos tu protocolo de microneedling.",
    ctaFootnote: "Resultados progresivos · Expectativas realistas",
    metadata: {
      title: "Microneedling en Barranquilla",
      description:
        "Un cambio real en manchas, marcas y textura. Microneedling con seguimiento profesional en Glow Skin.",
    },
  },
  "porcelanizacion-facial": {
    whatsappContext: "porcelanizacion-facial",
    badge: "Glow elegante",
    titleLine: "Imagina tu piel",
    titleAccent: "con más luz",
    body: "Hoy tu rostro puede verse apagado o irregular; después, más pulido, fresco y radiante sin perder naturalidad. La porcelanización facial en Glow Skin unifica, ilumina y eleva la apariencia de tu piel desde la primera sesión — el tipo de glow que se nota incluso sin filtro.",
    images: [
      {
        src: landingAsset(
          "porcelanizacion-facial/porcelanizacion-facial-resultado-glow.jpg",
        ),
        alt: "Antes y después de porcelanización facial en Glow Skin",
      },
    ],
    ctaEyebrow: "Rostro pulido",
    ctaTitleLine: "Sin",
    ctaTitleAccent: "exagerar.",
    ctaBody:
      "Acabado uniforme, textura más fina y un look cuidado que habla solo. Reserva tu porcelanización facial en Barranquilla.",
    ctaFootnote: "Primera sesión · Valoración incluida",
    metadata: {
      title: "Porcelanización facial en Barranquilla",
      description:
        "Revitaliza e ilumina con acabado pulido y elegante. Porcelanización facial en Glow Skin.",
    },
  },
} satisfies Record<string, QuickLandingConfig>;

export type QuickLandingSlug = keyof typeof quickLandings;
