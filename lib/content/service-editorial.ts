/**
 * Texto editorial y vínculos al blog para enriquecer páginas de servicios
 * (`/servicios/[slug]`), alineado con el tono del artículo de limpieza facial.
 */

export type ServiceEditorialBlock = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
  quote?: { text: string; attribution: string };
  /** Artículo del blog relacionado (cuando aplica). */
  relatedArticle?: { href: string; title: string; excerpt: string };
};

const BLOG_FACIAL_HREF = "/blog/limpieza-facial-profunda";
const BLOG_FACIAL_TITLE = "El impacto de un facial profesional";
const BLOG_FACIAL_EXCERPT =
  "Cómo una higiene facial profunda puede marcar el inicio de una transformación en textura del cutis y autoestima, con protocolo y diagnóstico personalizado.";

function facialArticle(): NonNullable<ServiceEditorialBlock["relatedArticle"]> {
  return {
    href: BLOG_FACIAL_HREF,
    title: BLOG_FACIAL_TITLE,
    excerpt: BLOG_FACIAL_EXCERPT,
  };
}

function blogIndexArticle(): NonNullable<
  ServiceEditorialBlock["relatedArticle"]
> {
  return {
    href: "/blog",
    title: "Blog Glow Skin",
    excerpt:
      "Artículos sobre ciencia del cuidado facial, protocolos y bienestar de la piel.",
  };
}

/** Contenido fijo por id de servicio (mismos strings que en `services.ts`). */
const BY_ID: Record<string, ServiceEditorialBlock> = {
  "limpieza-facial": {
    eyebrow: "Por qué importa la técnica",
    title: "Cuando el trabajo está bien hecho, el rostro cambia",
    subtitle:
      "No todas las limpiezas faciales son iguales, y eso se nota muchísimo en el resultado.",
    paragraphs: [
      "Cuando hay técnica, cuidado y experiencia, la piel se ve más limpia, más ligera y mucho más sana sin sentirse agredida ni maltratada. Eso es lo que buscamos en Glow Skin en cada procedimiento: que tu rostro respire mejor, luzca más despejado y se sienta tratado con criterio profesional.",
      "La diferencia no está solo en sacar puntos negros, sino en hacerlo de una manera que respete tu rostro y deje una mejora visible. Por eso combinamos vapor ozono, espátula ultrasónica, extracción manual aséptica y activos de nutrición según tu diagnóstico.",
      "La constancia respeta el ciclo de renovación: un facial profesional cada 30-45 días ayuda a mantener resultados en el tiempo y evita que la saturación termine robando frescura y claridad a tu cara.",
    ],
    quote: {
      text: "Tu piel no siempre necesita más producto, a veces necesita menos acumulación y mejores manos para volver a brillar.",
      attribution: "Enfoque clínico Glow Skin",
    },
    relatedArticle: facialArticle(),
  },
  "limpieza-facial-anti-acne": {
    eyebrow: "Protocolo clínico",
    title: "Tratar el acné es un proceso que se construye paso a paso",
    subtitle:
      "Cuando lo haces con profesionales, cada sesión aporta limpieza, control y una mejor base para que la piel vuelva a sentirse más tranquila.",
    paragraphs: [
      "El acné no solo se ve, también se siente en la incomodidad, la frustración y la forma en que muchas veces te relacionas con tu imagen. Por eso trabajamos para desinflamar, equilibrar y cuidar tu piel mientras avanzamos hacia un rostro más limpio, uniforme y saludable.",
      "Este protocolo prioriza higiene profunda con foco en exceso de sebo y carga bacteriana, siempre sin traumatizar la piel. El orden de los pasos y la elección de activos marcan la diferencia entre calmar y empeorar un brote.",
      "El cambio no aparece por casualidad, se trabaja con seguimiento, disciplina y decisiones correctas. Y cuando eso pasa, tu piel empieza a agradecerlo de una forma muy visible.",
    ],
    relatedArticle: facialArticle(),
  },
  "limpieza-facial-pieles-sensibles": {
    eyebrow: "Pieles reactivas",
    title: "Suavidad extrema, mismos estándares de asepsia",
    paragraphs: [
      "Pieles sensibles o con rosácea necesitan tiempos más cortos en ciertos pasos, productos con menos fragancia y fricción mínima. El objetivo es limpiar sin disparar eritema ni descamación.",
      "Nuestro criterio es el mismo que en el protocolo insignia: evaluar primero y ajustar vapor, extracción y sellado para que salgas con alivio, no con la piel “castigada”.",
    ],
    relatedArticle: facialArticle(),
  },
  hydraglow: {
    eyebrow: "Tecnología + activos",
    title: "Hidratación profunda con enfoque médico-estético",
    paragraphs: [
      "HydraGlow combina succión suave, infusión de sueros y pasos de sellado para pieles que se ven opacas o con poros visibles. Es una excelente opción cuando quieres glow inmediato sin postergar higiene real.",
      "Lo integramos en una filosofía de diagnóstico previo: la misma sesión puede matizarse si tienes sensibilidad o tendencia al acné.",
    ],
    relatedArticle: facialArticle(),
  },
  "limpieza-seborreguladora": {
    eyebrow: "Pieles muy grasas",
    title: "Regulación del sebo con protocolo intensivo",
    paragraphs: [
      "Pensado para pieles con producción elevada de grasa y comedones persistentes. Refuerza la higiene facial con activos y pasos orientados a desincrustar y regular.",
      "Suele alternarse o complementarse con limpiezas anti-acné según fase de la piel; en consulta definimos ritmo y combinaciones seguras.",
    ],
    relatedArticle: facialArticle(),
  },
  "tratamiento-anti-acne-intensivo": {
    eyebrow: "Programa integral",
    title: "Acné activo: plan progresivo y seguimiento",
    paragraphs: [
      "No se trata de una sola sesión “fuerte”, sino de un programa que respeta la evolución de la piel: control de inflamación, higiene, y en muchos casos ácidos o protocolos clínicos en dosis progresivas.",
      "La educación en casa (limpieza, protector solar, qué evitar) forma parte del resultado; por eso documentamos expectativas y cuidados entre citas.",
    ],
    relatedArticle: facialArticle(),
  },
  "tratamiento-despigmentante": {
    eyebrow: "Manchas y tono",
    title: "Peelings y renovación con objetivo despigmentante",
    paragraphs: [
      "Melasma, HPI o manchas posinflamatorias requieren enfoque por capas: fotoprotección estricta, activos que inhiben la melanina de forma controlada y renovación celular medida.",
      "Cada piel tolera distinto ritmo de ácidos; el plan se ajusta con fototipo, historia solar y sensibilidad.",
    ],
    relatedArticle: blogIndexArticle(),
  },
  "tratamiento-regenerative-plus": {
    eyebrow: "Textura y cicatrices",
    title: "Bioestimulación y microneedling para calidad de piel",
    paragraphs: [
      "Orientado a cicatrices, poros dilatados o pérdida de firmeza: combinamos microlesiones controladas con nutrición profunda para inducir colágeno de forma ordenada.",
      "Suele plantearse en series de sesiones; los intervalos dependen de la respuesta y del tiempo de recuperación real de tu piel.",
    ],
    relatedArticle: blogIndexArticle(),
  },
  "antiox-peel-pro": {
    eyebrow: "El favorito de cabina",
    title: "Cuando un tratamiento combina ciencia, técnica y glow inmediato",
    subtitle:
      "Antiox Peel Pro ya está en Glow Skin para quienes quieren un facial avanzado con resultados que se ven, se sienten y dejan ganas de repetir.",
    paragraphs: [
      "No es una limpieza común ni un facial básico que solo deja una sensación momentanea. Antiox Peel Pro eleva el cuidado de tu piel con un enfoque de medicina estética avanzada para quienes quieren más luminosidad, frescura, uniformidad y presencia.",
      "Cuando tu rostro recibe un tratamiento con esta combinación de técnica y renovación, el cambio se percibe tanto en la textura como en el brillo general de la piel. Piel más fina, más viva y mucho más cuidada desde la primera sesión.",
    ],
    relatedArticle: facialArticle(),
  },
  "porcelanizacion-facial": {
    eyebrow: "Efecto glow elegante",
    title: "Redefine la presencia de tu piel",
    subtitle:
      "Cuando la piel se ve más fina y uniforme, toda tu expresión cambia.",
    paragraphs: [
      "La porcelanización facial es perfecta para quienes quieren un rostro más pulido, fresco y radiante sin perder la sensación de piel natural. Trabajamos para que el cambio se vea delicado, luminoso y muy favorecedor desde la primera sesión.",
      "No sustituye una limpieza profunda cuando hay mucha retención de sebo; en esos casos conviene ordenar primero la higiene facial. Pero para quien busca elevar la apariencia general de su piel, este tratamiento es una gran elección.",
    ],
    relatedArticle: facialArticle(),
  },
  "hydraglow-antiox-peel": {
    eyebrow: "Combo",
    title: "HydraGlow + Antiox Peel: hidratación y renovación",
    paragraphs: [
      "Unimos hidratación profunda con peeling antioxidante para quien busca brillo y textura en una misma visita, siempre tras valorar tolerancia.",
      "Ideal cuando la piel tolera bien exfoliación química moderada y necesita un impulso visible.",
    ],
    relatedArticle: facialArticle(),
  },
  "microneedling-exosomas": {
    eyebrow: "Regeneración avanzada",
    title: "Microneedling con exosomas",
    paragraphs: [
      "Los exosomas aportan señales regenerativas en un contexto de microcanales controlados; se usa en cicatrices, fotoenvejecimiento o calidad de piel que ya no responde solo a cosmética.",
      "El número de sesiones y la profundidad se definen en consulta; el post cuidado es clave para el resultado.",
    ],
    relatedArticle: blogIndexArticle(),
  },
  "microneedling-exosomas-3-sesiones": {
    eyebrow: "Paquete",
    title: "Protocolo de choque en tres sesiones",
    paragraphs: [
      "Diseñado para quien busca acumular beneficio regenerativo en ventana corta, con evaluación entre sesiones para ajustar intensidad.",
    ],
    relatedArticle: blogIndexArticle(),
  },
  "protocolo-pdrn": {
    eyebrow: "PDRN",
    title: "Polinucleótidos para firmeza y reparación",
    paragraphs: [
      "El PDRN se asocia a mejora de elasticidad y calidad dérmica; encaja en planes de rejuvenecimiento o piel dañada por sol.",
      "Se integra con tu historial médico y expectativas realistas de tiempo de respuesta.",
    ],
    relatedArticle: blogIndexArticle(),
  },
  "protocolo-pdrn-3-sesiones": {
    eyebrow: "Paquete PDRN",
    title: "Tres sesiones para resultado acumulado",
    paragraphs: [
      "Permite espaciar estimulación con tiempo de recuperación adecuado entre visitas, priorizando seguridad sobre rapidez aparente.",
    ],
    relatedArticle: blogIndexArticle(),
  },
  // Bloques editoriales de labios eliminados
};

export function getServiceEditorial(
  serviceId: string,
  fallback: { name: string; description: string; categoryTitle: string },
): ServiceEditorialBlock {
  const preset = BY_ID[serviceId];
  if (preset) return preset;

  return {
    eyebrow: fallback.categoryTitle,
    title: `Sobre ${fallback.name}`,
    paragraphs: [
      fallback.description,
      `En Glow Skin este servicio se ofrece dentro de nuestra línea de ${fallback.categoryTitle.toLowerCase()}, con valoración previa para adaptar intensidad y productos a tu piel.`,
      "En el blog publicamos contenido sobre cuidado de la piel y protocolos; es un buen complemento para entender qué esperar del estudio.",
    ],
    relatedArticle: blogIndexArticle(),
  };
}
