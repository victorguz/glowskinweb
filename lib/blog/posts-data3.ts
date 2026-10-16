import type { BlogPost } from "@/lib/blog/types";

import { IMAGES_CDN } from "@/lib/landings/cdn";

const IMG = IMAGES_CDN;

export const BLOG_POSTS3: BlogPost[] = [
  {
    slug: "envejecimiento-prematuro-como-prevenirlo",
    title: "Qué es el envejecimiento prematuro y cómo prevenirlo",
    deck: "El sol de Barranquilla pesa más de lo que parece.",
    description:
      "Qué es el envejecimiento prematuro de la piel, por qué el sol de Barranquilla influye tanto y cómo prevenirlo con hábitos y tratamientos.",
    keywords: [
      "envejecimiento prematuro",
      "fotoenvejecimiento",
      "cómo prevenir las arrugas",
      "protector solar Barranquilla",
      "Glow Skin",
    ],
    datePublished: "2024-03-28",
    dateModified: "2026-10-16",
    category: "Ciencia",
    readTimeLabel: "5 min",
    image: `${IMG}/blog/blog-envejecimiento-prematuro.jpg`,
    ctaContext: "microneedling",
    related: [
      "piel-opaca-sin-vida",
      "que-es-el-dermapen",
      "que-es-el-pdrn-y-para-que-se-usa",
    ],
    blocks: [
      {
        type: "lead",
        text: "El envejecimiento prematuro es el desgaste visible de la piel (arrugas finas, manchas, flacidez leve) que aparece antes de lo esperado para tu edad, muy a menudo impulsado por la radiación UV.",
      },
      { type: "h2", text: "Por qué el sol pesa tanto aquí" },
      {
        type: "p",
        text: "En Barranquilla no hay estaciones que le den un descanso al sol: el índice UV es alto buena parte del año, y el daño se acumula día tras día, incluso cuando no vas a la playa. Un trayecto en carro, una caminata al mediodía o una ventana sin filtro también cuentan.",
      },
      { type: "h2", text: "Pilares de prevención" },
      {
        type: "list",
        items: [
          "Protector solar todos los días, y reaplicado si te expones al sol.",
          "Protección física: sombrero, gorra y lentes con filtro UV.",
          "Evitar el tabaco y el exceso de alcohol.",
          "Dormir bien y manejar el estrés: el cortisol también marca la piel.",
          "Una alimentación y una hidratación que acompañen.",
        ],
      },
      { type: "h2", text: "¿Y las personas que se ven jóvenes a cualquier edad?" },
      {
        type: "p",
        text: "Cuando alguien parece más joven de lo que es, suele sumar varias cosas: genética, protección solar constante, hábitos, descanso y, a veces, procedimientos. Desde afuera es imposible saber cuáles; lo replicable para cualquiera son los hábitos, no los secretos de nadie.",
      },
      { type: "h2", text: "Qué puede hacer un tratamiento en cabina" },
      {
        type: "p",
        text: "Los tratamientos no frenan el tiempo, pero pueden ayudar a que la piel se vea más cuidada y a estimular su renovación de forma progresiva. Algunas opciones que ofrecemos en Glow Skin:",
      },
      {
        type: "list",
        items: [
          "[Microneedling](/servicios/microneedling-exosomas), para estimular colágeno y elastina.",
          "[PDRN](/servicios/protocolo-pdrn), aplicado con micropunciones en rostro, cuello y escote.",
          "[Antiox Peel Pro](/servicios/antiox-peel-pro), un peeling antioxidante para luminosidad y uniformidad.",
        ],
      },
      {
        type: "p",
        text: "Ninguno reemplaza el protector solar. Sin esa base, cualquier resultado dura menos.",
      },
      { type: "h2", text: "Cómo usar el protector solar para que sirva" },
      {
        type: "list",
        items: [
          "Aplícalo todos los días, también si vas a estar bajo techo: la luz entra por las ventanas.",
          "Usa una cantidad generosa para rostro, cuello y orejas, no una pizca.",
          "Reaplícalo si te expones al sol durante varias horas o si sudas mucho.",
          "Elige una textura que tu piel tolere: si te incomoda, no la vas a usar.",
        ],
      },
      {
        type: "quote",
        text: "Una de las inversiones más útiles para tu piel es la que haces todos los días: protegerla del sol.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿A qué edad conviene empezar a prevenir el envejecimiento?",
            a: "La prevención más efectiva, el protector solar diario, sirve desde joven. Los tratamientos dependen de tu piel y de lo que quieras lograr; se definen en la valoración.",
          },
          {
            q: "¿Un tratamiento puede reemplazar el protector solar?",
            a: "No. Sin protección solar diaria, el sol sigue dañando la piel y los resultados duran menos.",
          },
        ],
      },
      {
        type: "p",
        text: "Si quieres saber qué tendría sentido para tu piel hoy, escríbeme VALORACIÓN por WhatsApp. Y si lo que más te preocupa es la falta de luz en la piel, lee [piel opaca en Barranquilla](/blog/piel-opaca-sin-vida).",
      },
    ],
  },
  {
    slug: "como-curarse-del-acne-guia",
    title: "¿El acné se cura? Lo que sí puedes lograr con constancia",
    deck: "Controlarlo es posible. Prometer una cura rápida, no.",
    description:
      "¿El acné se cura? Qué significa controlarlo, cuándo hace falta un dermatólogo y qué puede hacer una cosmiatra por tu piel en Barranquilla.",
    keywords: [
      "curar el acné",
      "el acné se cura",
      "tratamiento acné Barranquilla",
      "acné inflamatorio",
      "Glow Skin",
    ],
    datePublished: "2024-03-26",
    dateModified: "2026-10-16",
    category: "Tratamientos",
    readTimeLabel: "6 min",
    image: `${IMG}/blog/blog-como-curarse-del-acne.png`,
    ctaContext: "anti-acne",
    related: [
      "metodo-glow-skin-tratamiento-acne",
      "limpieza-facial-en-casa-por-que-evitarla",
      "piel-grasa-acido-seborregulador",
    ],
    blocks: [
      {
        type: "lead",
        text: "El acné es una condición inflamatoria con varias causas. «Curarse» suele significar alcanzar un control estable, con brotes mínimos, no una piel perfecta en una semana.",
      },
      {
        type: "p",
        text: "Yo pasé por el acné, y sé lo que es taparse el espejo con una toalla. Por eso prefiero decirte desde el principio qué se puede esperar y qué no, antes que venderte una promesa.",
      },
      { type: "h2", text: "Cuándo hace falta un dermatólogo" },
      {
        type: "p",
        text: "Según el grado, puede hacer falta un enfoque dermatológico con medicación. Si tu acné es muy inflamado, doloroso, deja cicatrices o no mejora, empieza por un dermatólogo. Una cosmiatra no diagnostica ni trata enfermedades: complementa con limpiezas, peelings y cuidado de las marcas cuando el cuadro lo permite.",
      },
      { type: "h2", text: "Qué suele funcionar" },
      {
        type: "list",
        items: [
          "Constancia, más que productos milagro.",
          "No tocar ni exprimir las lesiones.",
          "Limpiar la piel suavemente dos veces al día.",
          "Usar protector solar todos los días.",
          "Hidratar con productos adecuados para tu piel.",
          "Cambiar las fundas de la almohada con regularidad.",
        ],
      },
      { type: "h2", text: "Qué conviene evitar" },
      {
        type: "list",
        items: [
          "Productos con alcohol.",
          "Limpiar de más: sobre-limpiar la piel la irrita.",
          "Maquillaje comedogénico.",
        ],
      },
      { type: "h2", text: "Qué hace una cosmiatra por tu piel" },
      {
        type: "p",
        text: "En Glow Skin la [limpieza anti-acné](/servicios/limpieza-facial-anti-acne) hace foco en el exceso de sebo y en la carga bacteriana, con extracción de comedones cuando procede y alta frecuencia. Cuando la piel lo necesita, se suma el [peeling seborregulador](/servicios/limpieza-seborreguladora). Y para las marcas, hay opciones como el microneedling. Así se organiza en el [método Glow Skin](/blog/metodo-glow-skin-tratamiento-acne).",
      },
      { type: "h2", text: "Cuánto toma" },
      {
        type: "p",
        text: "Según lo que publicamos en la página del servicio, los primeros cambios se notan después de 2 o 3 sesiones, y para resultados significativos se requieren entre 6 y 8 sesiones, según la severidad. La frecuencia de las limpiezas en pieles con acné puede ser cada 21 días. No es una promesa: es lo que suele pasar, y cada piel tiene su ritmo.",
      },
      {
        type: "quote",
        text: "El acné responde a la constancia, no a la intensidad. Mejor tratar suave y seguido que fuerte y de vez en cuando.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Puedo combinar la limpieza anti-acné con medicamentos?",
            a: "Sí, pero es importante informarnos sobre cualquier medicamento tópico u oral que uses, porque algunos requieren ajustes en el protocolo.",
          },
          {
            q: "¿Desde qué edad se puede hacer este tratamiento?",
            a: "Es seguro a partir de los 12 a 13 años. Para menores, recomendamos una consulta previa para evaluar la piel y la severidad del acné.",
          },
          {
            q: "¿Es doloroso?",
            a: "La extracción de comedones puede causar molestias leves y la alta frecuencia, un hormigueo suave. Generalmente se tolera bien.",
          },
        ],
      },
      {
        type: "p",
        text: "Si quieres que miremos tu piel y veamos por dónde empezar, escríbeme VALORACIÓN por WhatsApp y empecemos a tratar tu acné hoy mismo.",
      },
    ],
  },
  {
    slug: "metodo-glow-skin-tratamiento-acne",
    title: "El método Glow Skin para el acné: etapas y cómo se decide cada una",
    deck: "No es un protocolo cerrado: se ajusta a tu piel en cada visita.",
    description:
      "Cómo estructuramos el acné en Glow Skin: limpieza anti-acné, peeling seborregulador y microneedling para marcas, con valoración en cada visita.",
    keywords: [
      "método Glow Skin acné",
      "limpieza anti-acné Barranquilla",
      "peeling seborregulador",
      "cicatrices de acné",
      "Glow Skin",
    ],
    datePublished: "2024-03-24",
    dateModified: "2026-10-16",
    category: "Tratamientos",
    readTimeLabel: "5 min",
    image: `${IMG}/blog/blog-metodo-glow-skin-acne.png`,
    ctaContext: "metodo-glow-skin",
    related: [
      "como-curarse-del-acne-guia",
      "piel-grasa-acido-seborregulador",
      "que-es-el-dermapen",
    ],
    blocks: [
      {
        type: "lead",
        text: "No usamos un solo protocolo cerrado: partimos de tu tipo de acné y de cómo está tu piel hoy, y de ahí decidimos qué hacer y a qué ritmo.",
      },
      { type: "h2", text: "Las tres etapas" },
      {
        type: "p",
        text: "El [método Glow Skin](/metodo-glow-skin) se organiza en tres etapas, que no siempre se hacen todas ni en el mismo orden:",
      },
      {
        type: "list",
        items: [
          "Limpieza anti-acné profunda: higiene con foco en el exceso de sebo y la carga bacteriana, con extracción de comedones cuando procede, alta frecuencia para oxigenar y acción bactericida, y mascarilla calmante o purificante según tu piel.",
          "Peeling seborregulador: un peeling químico para regular la producción de sebo, seguido de activos calmantes.",
          "Restauración con microneedling: para las marcas y la textura que deja el acné, cuando ya no hay inflamación activa.",
        ],
      },
      { type: "h2", text: "Evaluación en cada visita" },
      {
        type: "p",
        text: "Cada visita empieza mirando cómo respondió tu piel. Si hay irritación, se baja el ritmo; si la barrera está bien, se puede avanzar. Subimos la intensidad solo si la piel acompaña.",
      },
      {
        type: "quote",
        text: "El acné castiga la impaciencia: por eso se ajusta en cada visita y no se fuerza.",
      },
      { type: "h2", text: "Resultados progresivos y honestos" },
      {
        type: "p",
        text: "Según lo que publicamos en la página del servicio, los primeros cambios suelen notarse después de 2 o 3 sesiones, y para resultados significativos se requieren entre 6 y 8 sesiones, según la severidad del acné. En pieles con acné, la limpieza puede repetirse cada 21 días. No prometemos plazos exactos porque cada piel responde distinto.",
      },
      { type: "h2", text: "Tratamiento integral: adentro y afuera" },
      {
        type: "p",
        text: "Lo que pasa en la cabina es una parte. La otra es lo que haces en casa: limpiar suave dos veces al día, usar protector solar, hidratar bien, cambiar las fundas de la almohada y no tocar ni exprimir los granos. Y si tu acné necesita medicación, el camino empieza con un dermatólogo; en la cabina podemos acompañar y adaptar el protocolo si nos cuentas qué estás usando.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Cuántas sesiones necesito para ver resultados?",
            a: "Los primeros cambios se notan después de 2 o 3 sesiones. Para resultados significativos se requieren entre 6 y 8 sesiones, según la severidad del acné.",
          },
          {
            q: "¿Puedo hacer el método si uso medicamentos para el acné?",
            a: "Sí, pero cuéntanos qué medicamentos tópicos u orales usas, porque algunos requieren ajustes en el protocolo.",
          },
          {
            q: "¿Cuándo puedo maquillarme después de una limpieza anti-acné?",
            a: "Recomendamos esperar de 6 a 8 horas y usar solo productos no comedogénicos y libres de aceite.",
          },
        ],
      },
      {
        type: "p",
        text: "Si quieres entender mejor qué esperar, empieza por [¿el acné se cura?](/blog/como-curarse-del-acne-guia). Y para ver cómo sería en tu caso, escríbeme VALORACIÓN por WhatsApp. También puedes ver la [limpieza anti-acné](/servicios/limpieza-facial-anti-acne).",
      },
    ],
  },
  {
    slug: "pdrn-o-exosomas-cual-elegir",
    title: "PDRN o exosomas: en qué se diferencian y cómo se decide",
    deck: "No son intercambiables, y ninguno es «mejor» en abstracto.",
    description:
      "PDRN o exosomas: qué es cada uno, en qué se diferencian y cómo se elige según tu piel y tus objetivos. Explicado sin promesas.",
    keywords: [
      "PDRN o exosomas",
      "diferencia entre PDRN y exosomas",
      "bioestimulación facial",
      "regeneración de la piel",
      "Barranquilla",
    ],
    datePublished: "2024-03-22",
    dateModified: "2026-10-16",
    category: "Ciencia",
    readTimeLabel: "5 min",
    image: `${IMG}/blog/blog-pdrn-o-exosomas.png`,
    ctaContext: "microneedling",
    related: [
      "que-es-el-pdrn-y-para-que-se-usa",
      "que-son-los-exosomas",
      "que-es-el-dermapen",
    ],
    blocks: [
      {
        type: "lead",
        text: "Los dos nombres aparecen en la regeneración de la piel, pero no son intercambiables ni «mejor» uno que otro en abstracto: depende de tu objetivo y del producto concreto.",
      },
      { type: "h2", text: "Qué es el PDRN" },
      {
        type: "p",
        text: "El PDRN (polidesoxirribonucleótido) es un compuesto que en estética suele obtenerse de ADN de salmón purificado. Se usa por su relación con la reparación de la piel y con la mejora de su calidad: hidratación, elasticidad y textura. Tiene un historial de uso más largo en medicina regenerativa que los exosomas. En Glow Skin se aplica con micropunciones, en [rostro, cuello y escote](/servicios/protocolo-pdrn).",
      },
      { type: "h2", text: "Qué son los exosomas" },
      {
        type: "p",
        text: "Los exosomas son vesículas diminutas que las células usan para comunicarse entre sí. En estética se usan preparados que los contienen, con el objetivo de apoyar la regeneración de la piel. Es un campo en evolución: el origen y la calidad del preparado marcan mucho el resultado, y la evidencia en estética facial todavía se está construyendo. Lo explicamos con más calma en [qué son los exosomas](/blog/que-son-los-exosomas).",
      },
      { type: "h2", text: "En qué se diferencian, de forma práctica" },
      {
        type: "list",
        items: [
          "Historia de uso: el PDRN lleva más tiempo en medicina regenerativa; los exosomas son más recientes y su evidencia en estética se está desarrollando.",
          "Cómo se aplican en Glow Skin: el PDRN, con micropunciones; los exosomas, con microneedling y terapia de luz LED.",
          "Qué buscan: ambos apuntan a mejorar la calidad de la piel, pero no se eligen por moda sino por tu piel y tu objetivo.",
        ],
      },
      { type: "h2", text: "Cómo se decide cuál" },
      {
        type: "p",
        text: "En la valoración se mira tu piel, lo que quieres lograr y si estás en buen momento para el procedimiento. Los dos protocolos que publicamos son de 3 sesiones, con seguimiento personalizado. Hay que decirlo con claridad: ninguno promete un resultado igual para todas las pieles, y los resultados suelen ser progresivos y requerir cuidado posterior.",
      },
      { type: "h2", text: "Preguntas para hacer antes de decidir" },
      {
        type: "list",
        items: [
          "¿Qué producto exacto van a usar y de qué laboratorio es?",
          "¿Cuántas sesiones son y cada cuánto?",
          "¿Qué cuidados tengo que seguir después?",
          "¿Qué resultado es razonable esperar en mi caso?",
        ],
      },
      {
        type: "quote",
        text: "La elección entre PDRN y exosomas no es sobre cuál es «mejor», sino cuál es el adecuado para tu piel y tus objetivos en este momento.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Cuántas sesiones tiene cada protocolo?",
            a: "Los protocolos que ofrecemos, tanto el de PDRN como el de microneedling con exosomas, son de 3 sesiones, con seguimiento personalizado.",
          },
          {
            q: "¿Se pueden hacer a la vez?",
            a: "Depende de tu piel y de tu objetivo; eso se decide en la valoración, no por tu cuenta.",
          },
        ],
      },
      {
        type: "p",
        text: "Si quieres saber cuál tendría sentido para ti, escríbeme VALORACIÓN por WhatsApp. Antes, puedes leer [qué es el PDRN y para qué se usa](/blog/que-es-el-pdrn-y-para-que-se-usa).",
      },
    ],
  },
  {
    slug: "que-son-los-exosomas",
    title: "Qué son los exosomas en estética facial: lo esencial",
    deck: "Una explicación sencilla de un campo que todavía se está estudiando.",
    description:
      "Qué son los exosomas, cómo se usan en estética facial, qué dice la evidencia hasta hoy y qué preguntar antes de decidir. Explicado sin promesas.",
    keywords: [
      "qué son los exosomas",
      "exosomas estética facial",
      "microneedling con exosomas",
      "regeneración celular",
      "Barranquilla",
    ],
    datePublished: "2024-03-18",
    dateModified: "2026-10-16",
    category: "Ciencia",
    readTimeLabel: "5 min",
    image: `${IMG}/methods/1-metodo-regenerativo.webp`,
    ctaContext: "microneedling",
    related: [
      "pdrn-o-exosomas-cual-elegir",
      "que-es-el-dermapen",
      "que-es-el-pdrn-y-para-que-se-usa",
    ],
    blocks: [
      {
        type: "lead",
        text: "Los exosomas son vesículas diminutas que liberan las células y que transportan proteínas, lípidos y material genético. Sirven para que unas células le «hablen» a otras.",
      },
      { type: "h2", text: "Por qué se habla de ellos en estética" },
      {
        type: "p",
        text: "En medicina se investiga su papel en procesos de reparación de tejidos. En estética facial se usan preparados que los contienen, con la idea de apoyar la regeneración y la calidad de la piel. Lo importante, para ti, es la fuente del preparado, que esté estandarizado y que cumpla el marco legal del país.",
      },
      { type: "h2", text: "Qué dice la evidencia hasta hoy" },
      {
        type: "p",
        text: "Es un campo en evolución. Hay estudios preliminares con resultados prometedores en la calidad de la piel, pero la evidencia en estética facial todavía se está construyendo. Por eso conviene desconfiar de quien los presenta como una solución definitiva.",
      },
      { type: "h2", text: "Cómo se aplican en Glow Skin" },
      {
        type: "p",
        text: "Se aplican con microneedling: un vial de exosomas de alta concentración de un laboratorio reconocido, acompañado de terapia de luz LED para apoyar la absorción y la respuesta celular. El protocolo que publicamos es de 3 sesiones, con seguimiento personalizado. Puedes ver los detalles en la página de [microneedling con exosomas](/servicios/microneedling-exosomas).",
      },
      { type: "h2", text: "Tres ideas que conviene aclarar" },
      {
        type: "list",
        items: [
          "No son células madre: son vesículas que las células liberan; no se trata de aplicar células.",
          "No son un resultado definitivo: la piel sigue su ciclo y los cambios requieren cuidado y, muchas veces, varias sesiones.",
          "Más caro no significa mejor: lo que cuenta es el origen del preparado, su estandarización y que el protocolo se ajuste a tu piel.",
        ],
      },
      { type: "h2", text: "Qué preguntar antes de decidir" },
      {
        type: "list",
        items: [
          "¿De qué laboratorio es el preparado y qué respaldo tiene?",
          "¿Cuántas sesiones se esperan y cuáles son los cuidados posteriores?",
          "¿Qué resultado es razonable esperar en mi piel?",
          "¿Qué pasa si no me siento cómoda con alguno de los pasos?",
        ],
      },
      {
        type: "p",
        text: "Evita las promesas absolutas: resultados graduales, no una transformación de un día para otro.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Cuándo veré resultados?",
            a: "Los resultados del microneedling aparecen de forma progresiva: la piel comienza a mejorar desde las 2 semanas y los cambios más significativos se aprecian a partir del segundo mes.",
          },
          {
            q: "¿Los exosomas son lo mismo que el PDRN?",
            a: "No. Son productos distintos, con historias y aplicaciones diferentes. Lo explicamos en [PDRN o exosomas](/blog/pdrn-o-exosomas-cual-elegir).",
          },
        ],
      },
      {
        type: "p",
        text: "Si te interesa saber si tendría sentido para tu piel, escríbeme VALORACIÓN por WhatsApp. Antes, puedes leer [qué es el Dermapen o microneedling](/blog/que-es-el-dermapen).",
      },
    ],
  },
  {
    slug: "que-es-el-pdrn-y-para-que-se-usa",
    title: "Qué es el PDRN y para qué se usa",
    deck: "Lo que sí hace, lo que no y cómo se aplica.",
    description:
      "Qué es el PDRN, para qué se usa en estética facial, cómo se aplica en Glow Skin y qué expectativas tener frente a las pieles «de filtro».",
    keywords: [
      "qué es el PDRN",
      "PDRN estética facial",
      "PDRN Barranquilla",
      "bioestimulación de la piel",
      "Glow Skin",
    ],
    datePublished: "2024-03-20",
    dateModified: "2026-10-16",
    category: "Ciencia",
    readTimeLabel: "5 min",
    image: `${IMG}/blog/blog-que-es-pdrn.png`,
    ctaContext: "Protocolo PDRN",
    related: [
      "pdrn-o-exosomas-cual-elegir",
      "que-es-el-dermapen",
      "envejecimiento-prematuro-como-prevenirlo",
    ],
    blocks: [
      {
        type: "lead",
        text: "El PDRN (polidesoxirribonucleótido) es un compuesto que se usa en estética por sus efectos asociados a la mejora de la hidratación, la elasticidad y la «calidad de la piel» en series de tratamientos.",
      },
      {
        type: "p",
        text: "Este artículo es informativo. Eso no elimina la necesidad de una valoración ni de expectativas realistas.",
      },
      { type: "h2", text: "Para qué se usa" },
      {
        type: "list",
        items: [
          "Mejorar la calidad y la densidad de la piel.",
          "Apoyar la reparación de la piel después de otros tratamientos.",
          "Trabajar rostro, cuello y escote.",
        ],
      },
      { type: "h2", text: "Cómo se aplica en Glow Skin" },
      {
        type: "p",
        text: "El PDRN se aplica mediante micropunciones, una técnica que permite entregarlo en la dermis de forma efectiva. Ofrecemos [una sesión o un protocolo de 3 sesiones](/servicios/protocolo-pdrn), con seguimiento personalizado durante todo el proceso. Los resultados son progresivos y, como todo en la piel, requieren cuidado posterior.",
      },
      { type: "h2", text: "El fenómeno de las pieles «de filtro»" },
      {
        type: "p",
        text: "En redes vemos pieles perfectas que parecen digitales. Eso ha creado una demanda de tratamientos que prometan resultados «de filtro» en la vida real, y el PDRN es uno de los activos que más se mencionan en ese contexto.",
      },
      { type: "h2", text: "Realidad frente a expectativas" },
      {
        type: "list",
        items: [
          "En el consultorio: una mejora gradual, con una serie de sesiones y constancia.",
          "En redes: resultados instantáneos y perfectos, con edición e iluminación.",
          "Lo razonable: una piel de mejor calidad, no una piel distinta.",
        ],
      },
      { type: "h2", text: "Qué esperar realmente" },
      {
        type: "p",
        text: "El PDRN puede ayudar con la calidad de la piel, la hidratación y la textura, pero no cambia la estructura de tu cara ni elimina todas las imperfecciones. Es una herramienta de mejora, no de transformación total.",
      },
      { type: "h2", text: "Lo que el PDRN no es" },
      {
        type: "list",
        items: [
          "No es un relleno: no está pensado para dar volumen ni para modelar el rostro.",
          "No es toxina botulínica: no paraliza la expresión.",
          "No es un resultado de un día: lo habitual es una serie de sesiones y constancia.",
        ],
      },
      { type: "h2", text: "Cuidados después" },
      {
        type: "p",
        text: "Como en cualquier tratamiento con micropunciones, los cuidados dependen de tu sesión: pregunta qué evitar y por cuánto tiempo. En microneedling, por ejemplo, las primeras 24 a 48 horas se evitan el sol, el maquillaje y los productos activos, y se usa protector solar SPF 50+ a diario.",
      },
      {
        type: "quote",
        text: "El PDRN puede ser una buena herramienta, pero no reemplaza los buenos hábitos, la protección solar y las expectativas realistas.",
      },
      {
        type: "faq",
        items: [
          {
            q: "¿Cuántas sesiones tiene el protocolo de PDRN?",
            a: "Hay una opción de 1 sesión y un protocolo de 3 sesiones, con seguimiento personalizado.",
          },
          {
            q: "¿Para qué zonas se puede aplicar?",
            a: "Rostro, cuello y escote.",
          },
        ],
      },
      {
        type: "p",
        text: "Si quieres saber si el PDRN tendría sentido en tu caso, escríbeme VALORACIÓN por WhatsApp. Y si dudas entre PDRN y exosomas, lee [PDRN o exosomas](/blog/pdrn-o-exosomas-cual-elegir).",
      },
    ],
  },
];
