import { landingAsset } from "@/lib/landings/cdn";

const MICRONEEDLING = "microneedling/manchas-y-cicatrices-3-meses";

export type LandingImage = {
  src: string;
  alt: string;
  /** Antes / Después — orden de aparición según config */
  label?: string;
};

export type QuickLandingFaqItem = {
  question: string;
  answer: string;
};

export type QuickLandingConfig = {
  whatsappContext: string;
  faq?: QuickLandingFaqItem[];
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
    faq: [
      {
        question: "¿Con qué frecuencia debo hacerme una limpieza facial?",
        answer:
          "Se recomienda una limpieza facial cada 30-45 días para mantenimiento general. Para pieles con problemas específicos como acné, la frecuencia puede ser cada 21 días.",
      },
      {
        question: "¿Es normal que mi piel se vea roja después del tratamiento?",
        answer:
          "Es completamente normal experimentar un ligero enrojecimiento que desaparece en 2-4 horas. Esto indica que el tratamiento está activando la circulación sanguínea.",
      },
      {
        question: "¿Puedo usar maquillaje después de la limpieza facial?",
        answer:
          "Recomendamos esperar al menos 4-6 horas antes de aplicar maquillaje para permitir que la piel absorba completamente los productos aplicados.",
      },
      {
        question: "¿Qué cuidados debo tener después del tratamiento?",
        answer:
          "Evita la exposición solar directa por 24 horas, usa protector solar, mantén la piel hidratada y evita productos con alcohol o ácidos fuertes por 48 horas.",
      },
    ],
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
    ctaTitleAccent: "la luz a tu piel.",
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
    faq: [
      {
        question: "¿Es doloroso el tratamiento?",
        answer:
          "No. Puedes sentir una ligera sensación de hormigueo durante la aplicación del peeling, pero es bien tolerado y desaparece rápidamente.",
      },
      {
        question: "¿Cuándo veré los resultados?",
        answer:
          "Los resultados son inmediatos. Tu piel se verá más luminosa, fresca y uniforme desde la primera sesión.",
      },
      {
        question: "¿Con qué frecuencia puedo hacerme Antiox Peel Pro?",
        answer:
          "Recomendamos cada 4-6 semanas para permitir la renovación celular completa y maximizar los beneficios acumulativos.",
      },
      {
        question: "¿Puedo hacerme este tratamiento si tengo piel sensible?",
        answer:
          "Sí, adaptamos las concentraciones según tu tipo de piel. Es importante informarnos sobre tu sensibilidad durante la consulta para personalizar el protocolo.",
      },
      {
        question: "¿Qué cuidados debo tener después?",
        answer:
          "Evita el sol directo por 48 horas, usa protector solar diariamente y sigue las indicaciones de productos recomendados para prolongar el resultado.",
      },
    ],
    titleLine: "¿Tu piel está",
    titleAccent: "sin vida?",
    body: "Esa sorpresa frente al espejo no es casualidad: Antiox Peel Pro deja la piel tan luminosa que el cambio se nota al instante — más uniforme, más fresca y con un glow que muchas sienten apenas termina la sesión. La mejor prueba es una reacción auténtica, no una promesa vacía.",
    images: [
      {
        src: landingAsset("antiox-peel-pro/antiox-min.png"),
        alt: "Resultado luminoso tras Antiox Peel Pro",
        label: "Antes",
      },
      {
        src: landingAsset(
          "antiox-peel-pro/reacciones-reales-pacientes/antiox-peel-pro-reaccion-paciente-1.jpg",
        ),
        alt: "Persona durante Antiox Peel Pro en Glow Skin",
        label: "Después",
      },
    ],
    ctaEyebrow: "Glow inmediato",
    ctaTitleLine: "Mírate de nuevo",
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
    faq: [
      {
        question: "¿A partir de qué edad puedo hacerme este tratamiento?",
        answer:
          "El tratamiento es seguro a partir de los 12-13 años. Para menores, recomendamos una consulta previa para evaluar el tipo de piel y severidad del acné.",
      },
      {
        question: "¿Puedo usar maquillaje después del tratamiento?",
        answer:
          "Recomendamos esperar 6-8 horas antes de aplicar maquillaje. Usa solo productos no comedogénicos y libres de aceite.",
      },
      {
        question: "¿Cuánto tiempo tardaré en ver resultados?",
        answer:
          "Los primeros cambios se notan después de 2-3 sesiones. Para resultados significativos, se requieren entre 6-8 sesiones, dependiendo de la severidad del acné.",
      },
      {
        question: "¿El tratamiento es doloroso?",
        answer:
          "La extracción de comedones puede causar molestias leves. La alta frecuencia produce una sensación de hormigueo suave. El tratamiento es generalmente bien tolerado.",
      },
      {
        question:
          "¿Puedo combinar este tratamiento con medicamentos para el acné?",
        answer:
          "Sí, pero es importante informarnos sobre cualquier medicamento tópico u oral que estés usando. Algunos requieren ajustes en el protocolo de tratamiento.",
      },
    ],
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
    ctaEyebrow: "Cambios reales",
    ctaTitleLine: "Tu transformación",
    ctaTitleAccent: "empieza hoy.",
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
    faq: [
      {
        question: "¿Es doloroso el microneedling?",
        answer:
          "Aplicamos crema anestésica antes del procedimiento para minimizar la incomodidad. La mayoría de personas describe una sensación de presión leve y tolerable.",
      },
      {
        question: "¿Cuántas sesiones necesito?",
        answer:
          "Para cicatrices y textura, recomendamos 3 sesiones separadas por 4-6 semanas. En la consulta inicial evaluamos tu caso específico para definir el plan.",
      },
      {
        question: "¿Cuándo veré resultados?",
        answer:
          "La piel comienza a mejorar desde las 2 semanas post-sesión. Los cambios más significativos se aprecian a partir del segundo mes, cuando el colágeno nuevo ya está activo.",
      },
      {
        question: "¿Qué cuidados debo tener después?",
        answer:
          "Las primeras 24-48 horas evita el sol, maquillaje y productos activos. Usa solo los productos recomendados y aplica SPF 50+ diariamente durante el tratamiento.",
      },
    ],
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
    ctaEyebrow: "Procesos visibles",
    ctaTitleLine: "Devuélvele",
    ctaTitleAccent: "el Glow a tu piel.",
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
    faq: [
      {
        question: "¿En qué se diferencia de una limpieza facial normal?",
        answer:
          "La porcelanización va más allá de la limpieza: incluye activos tensores, unificadores y una mascarilla hidroplástica que sella los resultados para un efecto glow duradero.",
      },
      {
        question: "¿Cuánto dura el efecto?",
        answer:
          "El glow inmediato puede durar de 2 a 4 semanas dependiendo de tu rutina en casa. Con mantenimiento mensual, los resultados se acumulan visiblemente.",
      },
      {
        question: "¿Puedo hacerme este tratamiento si tengo piel sensible?",
        answer:
          "Sí. Adaptamos los activos a tu tipo de piel. Infórmanos durante la consulta para ajustar el protocolo.",
      },
      {
        question: "¿Puedo usar maquillaje después?",
        answer:
          "Recomendamos esperar al menos 4-6 horas para permitir que los activos terminen su acción y el resultado sea óptimo.",
      },
    ],
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
    ctaEyebrow: "Rostro radiante",
    ctaTitleLine: "No necesitarás",
    ctaTitleAccent: "maquillaje para lucirte.",
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
