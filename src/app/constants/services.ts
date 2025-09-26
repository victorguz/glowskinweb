import { environment } from '../../environments/environment';

export enum ServiceIds {
  // Categories
  LIMPIEZAS_FACIALES = 'limpiezas-faciales',
  PROTOCOLOS_ACNE = 'protocolos-acne',
  MANCHAS_CICATRICES = 'manchas-cicatrices',
  REJUVENECIMIENTO = 'rejuvenecimiento',
  EXOSOMAS = 'exosomas',
  PDRN = 'pdrn',
  CUIDADO_LABIOS = 'cuidado-labios',

  // Services
  LIMPIEZA_FACIAL = 'limpieza-facial',
  LIMPIEZA_FACIAL_ANTI_ACNE = 'limpieza-facial-anti-acne',
  LIMPIEZA_FACIAL_PIELES_SENSIBLES = 'limpieza-facial-pieles-sensibles',
  HYDRAGLOW = 'hydraglow',
  LIMPIEZA_SEBORREGULADORA = 'limpieza-seborreguladora',
  HYDRAGLOW_ANTIOX_PEEL = 'hydraglow-antiox-peel',
  TRATAMIENTO_ANTI_ACNE_INTENSIVO = 'tratamiento-anti-acne-intensivo',
  TRATAMIENTO_DESPIGMENTANTE = 'tratamiento-despigmentante',
  TRATAMIENTO_REGENERATIVE_PLUS = 'tratamiento-regenerative-plus',
  ANTIOX_PEEL_PRO = 'antiox-peel-pro',
  PORCELANIZACION_FACIAL = 'porcelanizacion-facial',
  MICRONEEDLING_EXOSOMAS = 'microneedling-exosomas',
  PROTOCOLO_PDRN = 'protocolo-pdrn',
  GLOW_LIPS = 'glow-lips',
  TRATAMIENTO_3_SESIONES_GLOW_LIPS = 'tratamiento-3-sesiones-glow-lips',
}

export const SERVICES_DATA = {
  categories: [
    {
      id: ServiceIds.LIMPIEZAS_FACIALES,
      title: 'Limpiezas Faciales',
      description:
        'Protocolos de higiene facial avanzados para diferentes necesidades de la piel',
      services: [
        {
          id: ServiceIds.LIMPIEZA_FACIAL,
          name: 'Limpieza Facial Glow Skin',
          description:
            'Nuestro protocolo insignia. Una higiene facial profunda que combina tecnología y activos de alta gama para purificar, equilibrar y revitalizar todo tipo de piel.',
          price: 125000,
          currency: 'COP',
          details: {
            frequency: '1 sesión cada 30-45 días',
            idealFor:
              'Mantenimiento, pieles congestionadas, y como primer paso para cualquier tratamiento',
          },
          page: {
            hero: {
              title: 'Limpieza Facial',
              titleHighlight: 'Profunda',
              subtitle:
                'Purifica, equilibra y revitaliza tu piel con nuestros protocolos avanzados de higiene facial',
              primaryColor: 'pink',
              gradientFrom: 'from-pink-50',
              gradientTo: 'to-purple-100',
            },
            benefits: {
              title: '¿Por qué elegir nuestras limpiezas faciales?',
              subtitle:
                'Utilizamos tecnología avanzada y productos de alta gama para ofrecerte resultados excepcionales',
              items: [
                {
                  icon: 'flash',
                  title: 'Tecnología Avanzada',
                  description:
                    'Vapor ozono, espátula ultrasónica y alta frecuencia para resultados superiores',
                },
                {
                  icon: 'heart',
                  title: 'Personalizado',
                  description:
                    'Cada tratamiento se adapta a las necesidades específicas de tu tipo de piel',
                },
                {
                  icon: 'checkmark-circle',
                  title: 'Resultados Garantizados',
                  description:
                    'Más de 5 años de experiencia respaldando cada tratamiento',
                },
              ],
            },
            process: {
              title: 'Nuestro Proceso de Limpieza Facial',
              subtitle:
                'Cada paso está cuidadosamente diseñado para obtener los mejores resultados',
              duration: '60-90',
              durationUnit: 'minutos aproximadamente',
              steps: [
                {
                  number: 1,
                  title: 'Diagnóstico Inicial',
                  description:
                    'Evaluamos tu tipo de piel y necesidades específicas para personalizar el tratamiento.',
                },
                {
                  number: 2,
                  title: 'Limpieza Profunda',
                  description:
                    'Utilizamos vapor ozono y espátula ultrasónica para una purificación completa.',
                },
                {
                  number: 3,
                  title: 'Extracción y Purificación',
                  description:
                    'Removemos impurezas y puntos negros de forma segura y efectiva.',
                },
                {
                  number: 4,
                  title: 'Alta Frecuencia y Nutrición',
                  description:
                    'Aplicamos alta frecuencia para oxigenar y sellamos con productos nutritivos.',
                },
              ],
              includes: [
                'Consulta y diagnóstico',
                'Limpieza profunda',
                'Mascarilla personalizada',
                'Protección solar',
                'Recomendaciones post-tratamiento',
              ],
            },
            faq: [
              {
                question:
                  '¿Con qué frecuencia debo hacerme una limpieza facial?',
                answer:
                  'Se recomienda una limpieza facial cada 30-45 días para mantenimiento general. Para pieles con problemas específicos como acné, la frecuencia puede ser cada 21 días.',
              },
              {
                question:
                  '¿Es normal que mi piel se vea roja después del tratamiento?',
                answer:
                  'Es completamente normal experimentar un ligero enrojecimiento que desaparece en 2-4 horas. Esto indica que el tratamiento está activando la circulación sanguínea.',
              },
              {
                question:
                  '¿Puedo usar maquillaje después de la limpieza facial?',
                answer:
                  'Recomendamos esperar al menos 4-6 horas antes de aplicar maquillaje para permitir que la piel absorba completamente los productos aplicados.',
              },
              {
                question: '¿Qué cuidados debo tener después del tratamiento?',
                answer:
                  'Evita la exposición solar directa por 24 horas, usa protector solar, mantén la piel hidratada y evita productos con alcohol o ácidos fuertes por 48 horas.',
              },
            ],
            cta: {
              title: '¿Lista para transformar tu piel?',
              subtitle:
                'Agenda tu cita y descubre los beneficios de una limpieza facial profesional con tecnología avanzada',
            },
          },
        },
        {
          id: ServiceIds.LIMPIEZA_FACIAL_ANTI_ACNE,
          name: 'Limpieza Facial Anti-Acné',
          description:
            'Protocolo de higiene profunda enfocado en el control sebáceo y la reducción de la carga bacteriana. Ideal para pieles con tendencia a brotes e imperfecciones.',
          price: 165000,
          currency: 'COP',
          details: {
            frequency: '1 sesión cada 21 días durante la fase activa',
            activos:
              'Fórmulas seborreguladoras y bactericidas de laboratorios reconocidos',
          },
          page: {
            hero: {
              title: 'Limpieza Facial',
              titleHighlight: 'Anti-Acné',
              subtitle:
                'Protocolo especializado para el control sebáceo y reducción de la carga bacteriana en pieles con tendencia a brotes',
              primaryColor: 'green',
              gradientFrom: 'from-green-50',
              gradientTo: 'to-blue-100',
            },
            problemSection: {
              title: '¿Luchas contra el acné?',
              subtitle:
                'El acné es más que un problema estético. Afecta tu autoestima y confianza. Nuestro protocolo especializado está diseñado para atacar las causas raíz del problema.',
              causes: [
                {
                  title: 'Exceso de producción sebácea',
                  description:
                    'Las glándulas sebáceas producen más grasa de la necesaria, obstruyendo los poros.',
                },
                {
                  title: 'Carga bacteriana',
                  description:
                    'La bacteria Propionibacterium acnes prolifera en los poros obstruidos.',
                },
                {
                  title: 'Queratinización',
                  description:
                    'Las células muertas se acumulan y no se eliminan correctamente.',
                },
                {
                  title: 'Inflamación',
                  description:
                    'La respuesta inflamatoria del cuerpo genera enrojecimiento y dolor.',
                },
              ],
              approach: [
                { icon: 'water', title: 'Limpieza Profunda' },
                { icon: 'flash', title: 'Alta Frecuencia' },
                { icon: 'checkmark-done', title: 'Control Sebáceo' },
                { icon: 'medical', title: 'Acción Bactericida' },
              ],
            },
            expectations: {
              title: '¿Qué puedes esperar?',
              subtitle:
                'Los resultados varían según el tipo y severidad del acné, pero estos son los beneficios que experimentarás',
              timeline: [
                {
                  phase: 'Primera Sesión',
                  icon: 'sparkles',
                  description:
                    'Piel más limpia y fresca. Reducción visible de puntos negros y comedones.',
                },
                {
                  phase: '2-3 Sesiones',
                  icon: 'trending-down',
                  description:
                    'Disminución del brillo excesivo. Menor aparición de nuevos brotes.',
                },
                {
                  phase: '4-6 Sesiones',
                  icon: 'star',
                  description:
                    'Textura de piel mejorada. Control significativo de la producción sebácea.',
                },
                {
                  phase: 'Mantenimiento',
                  icon: 'shield-checkmark',
                  description:
                    'Piel equilibrada y saludable. Prevención de futuros brotes.',
                },
              ],
            },
            careInstructions: {
              title: 'Cuidados Especiales para Piel con Acné',
              subtitle:
                'El éxito del tratamiento también depende de los cuidados en casa',
              doList: [
                {
                  title: 'Limpieza suave 2 veces al día',
                  description: 'Usa productos libres de aceite y pH balanceado',
                },
                {
                  title: 'Usar protector solar diario',
                  description: 'Mínimo SPF 30, oil-free y no comedogénico',
                },
                {
                  title: 'Hidratar con productos adecuados',
                  description:
                    'Gel o loción libre de aceites para mantener el balance',
                },
                {
                  title: 'Cambiar fundas de almohada',
                  description:
                    'Cada 2-3 días para evitar acumulación de bacterias',
                },
              ],
              dontList: [
                {
                  title: 'Tocar o exprimir granos',
                  description:
                    'Puede causar cicatrices permanentes y extender la infección',
                },
                {
                  title: 'Usar productos con alcohol',
                  description:
                    'Resecan excesivamente y pueden empeorar la producción de grasa',
                },
                {
                  title: 'Sobre-limpiar la piel',
                  description:
                    'Más de 2 veces al día puede irritar y estimular más grasa',
                },
                {
                  title: 'Usar maquillaje comedogénico',
                  description: 'Evita productos que obstruyan los poros',
                },
              ],
            },
            faq: [
              {
                question:
                  '¿A partir de qué edad puedo hacerme este tratamiento?',
                answer:
                  'El tratamiento es seguro a partir de los 12-13 años. Para menores, recomendamos una consulta previa para evaluar el tipo de piel y severidad del acné.',
              },
              {
                question: '¿Puedo usar maquillaje después del tratamiento?',
                answer:
                  'Recomendamos esperar 6-8 horas antes de aplicar maquillaje. Usa solo productos no comedogénicos y libres de aceite.',
              },
              {
                question: '¿Cuánto tiempo tardaré en ver resultados?',
                answer:
                  'Los primeros cambios se notan después de 2-3 sesiones. Para resultados significativos, se requieren entre 6-8 sesiones, dependiendo de la severidad del acné.',
              },
              {
                question: '¿El tratamiento es doloroso?',
                answer:
                  'La extracción de comedones puede causar molestias leves. La alta frecuencia produce una sensación de hormigueo suave. El tratamiento es generalmente bien tolerado.',
              },
              {
                question:
                  '¿Puedo combinar este tratamiento con medicamentos para el acné?',
                answer:
                  'Sí, pero es importante informarnos sobre cualquier medicamento tópico u oral que estés usando. Algunos requieren ajustes en el protocolo de tratamiento.',
              },
            ],
            cta: {
              title: '¿Listo para decir adiós al acné?',
              subtitle:
                'No dejes que el acné controle tu vida. Agenda una consulta y descubre cómo nuestro protocolo especializado puede transformar tu piel.',
              tip: 'El acné severo requiere constancia. ¡Confía en el proceso!',
            },
          },
        },
        {
          id: ServiceIds.LIMPIEZA_FACIAL_PIELES_SENSIBLES,
          name: 'Limpieza Facial para Pieles Sensibles',
          description:
            'Protocolo ultra-suave diseñado específicamente para pieles reactivas, sensibles o con rosácea. Utilizamos técnicas delicadas y productos hipoalergénicos para limpiar sin irritar.',
          price: 140000,
          currency: 'COP',
          details: {
            frequency:
              '1 sesión cada 30-45 días, con protocolos adaptados según la reactividad',
            idealFor:
              'Pieles sensibles, reactivas, con rosácea, dermatitis o tendencia a irritación',
            activos:
              'Fórmulas hipoalergénicas, ingredientes calmantes como manzanilla, aloe vera y centella asiática',
          },
          page: {
            hero: {
              title: 'Limpieza Facial para',
              titleHighlight: 'Pieles Sensibles',
              subtitle:
                'Protocolo ultra-suave diseñado específicamente para pieles reactivas, sensibles o con rosácea',
              primaryColor: 'rose',
              gradientFrom: 'from-rose-50',
              gradientTo: 'to-pink-100',
            },
            understandingSection: {
              title: '¿Tienes piel sensible?',
              subtitle:
                'La piel sensible requiere cuidados especiales. No todos los tratamientos son adecuados para este tipo de piel que reacciona fácilmente a estímulos externos.',
              signs: [
                {
                  title: 'Enrojecimiento frecuente',
                  description:
                    'Tu piel se enrojece fácilmente con productos, clima o estrés.',
                },
                {
                  title: 'Sensación de ardor o picazón',
                  description:
                    'Experimentas molestias con productos que otros toleran bien.',
                },
                {
                  title: 'Reactividad al clima',
                  description:
                    'El viento, sol o frío provocan reacciones inmediatas en tu piel.',
                },
                {
                  title: 'Rosácea o dermatitis',
                  description:
                    'Tienes diagnóstico médico de rosácea, dermatitis o piel atópica.',
                },
              ],
              approach: [
                { icon: 'flower', title: 'Suavidad' },
                { icon: 'leaf', title: 'Hipoalergénico' },
                { icon: 'snow', title: 'Efecto Calmante' },
                { icon: 'shield', title: 'Protección' },
              ],
            },
            process: {
              title: 'Nuestro Proceso Ultra-Suave',
              subtitle:
                'Cada paso está diseñado para minimizar la irritación y maximizar el confort',
              duration: '75-90',
              durationUnit: 'minutos aproximadamente',
              steps: [
                {
                  number: 1,
                  title: 'Evaluación de Sensibilidad',
                  description:
                    'Analizamos tu piel y determinamos el nivel de reactividad para adaptar el tratamiento.',
                },
                {
                  number: 2,
                  title: 'Limpieza Delicada',
                  description:
                    'Utilizamos productos hipoalergénicos y vapor tibio para limpiar sin agredir.',
                },
                {
                  number: 3,
                  title: 'Extracción Mínima',
                  description:
                    'Solo extracciones esenciales con técnicas ultra-suaves para evitar irritación.',
                },
                {
                  number: 4,
                  title: 'Calma y Protección',
                  description:
                    'Aplicamos mascarillas calmantes y productos protectores para fortalecer la barrera cutánea.',
                },
              ],
              includes: [
                'Evaluación de sensibilidad',
                'Limpieza hipoalergénica',
                'Masaje linfático calmante',
                'Mascarilla descongestiva',
                'Protección y cuidados especiales',
              ],
            },
            avoidSection: {
              title: 'Lo que NO usamos en pieles sensibles',
              subtitle:
                'Conocemos los ingredientes que pueden irritar tu piel sensible y los evitamos completamente',
              items: [
                {
                  icon: 'ban',
                  title: 'Alcohol',
                  description:
                    'Evitamos productos con alcohol que resecan e irritan la piel sensible.',
                },
                {
                  icon: 'warning',
                  title: 'Fragancias',
                  description:
                    'No usamos perfumes o fragancias artificiales que pueden causar reacciones.',
                },
                {
                  icon: 'flame',
                  title: 'Ácidos Fuertes',
                  description:
                    'Evitamos ácidos agresivos que pueden causar irritación o quemaduras.',
                },
                {
                  icon: 'close-circle',
                  title: 'Exfoliantes Físicos',
                  description:
                    'No utilizamos scrubs o exfoliantes abrasivos que dañan la piel delicada.',
                },
              ],
            },
            homecare: {
              title: 'Cuidados Especiales en Casa',
              subtitle:
                'Tu rutina diaria es clave para mantener tu piel sensible calmada y saludable',
              recommended: [
                {
                  title: 'Limpiadores sin sulfatos',
                  description:
                    'Geles o cremas de limpieza suaves, sin detergentes agresivos',
                },
                {
                  title: 'Hidratantes hipoalergénicos',
                  description:
                    'Con ingredientes calmantes como ceramidas, niacinamida o aloe',
                },
                {
                  title: 'Protector solar mineral',
                  description:
                    'Con óxido de zinc o dióxido de titanio, SPF 30 o superior',
                },
                {
                  title: 'Agua termal',
                  description:
                    'Para calmar la piel cuando sientas irritación o calor',
                },
              ],
              avoid: [
                {
                  title: 'Productos con fragancia',
                  description:
                    'Perfumes, aceites esenciales o productos muy aromáticos',
                },
                {
                  title: 'Exfoliación frecuente',
                  description:
                    'Máximo 1 vez por semana con productos muy suaves',
                },
                {
                  title: 'Cambios bruscos de temperatura',
                  description:
                    'Agua muy caliente o fría, saunas o exposición solar directa',
                },
                {
                  title: 'Productos "anti-edad" agresivos',
                  description:
                    'Retinoides fuertes, ácidos o tratamientos muy activos',
                },
              ],
            },
            faq: [
              {
                question: '¿Cómo sé si tengo piel sensible?',
                answer:
                  'Si tu piel se enrojece fácilmente, sientes ardor o picazón con productos comunes, reaccionas al clima o tienes rosácea/dermatitis, probablemente tengas piel sensible.',
              },
              {
                question:
                  '¿Es seguro hacerse limpiezas faciales con piel sensible?',
                answer:
                  'Sí, pero solo con protocolos especializados. Nuestro tratamiento está diseñado específicamente para pieles reactivas, usando técnicas suaves y productos hipoalergénicos.',
              },
              {
                question: '¿Con qué frecuencia puedo hacerme este tratamiento?',
                answer:
                  'Para pieles sensibles recomendamos cada 30-45 días. Si tienes rosácea activa o dermatitis, podemos espaciar más las sesiones según tu reactividad.',
              },
              {
                question:
                  '¿Qué hago si mi piel se irrita después del tratamiento?',
                answer:
                  'Aunque nuestro protocolo minimiza la irritación, si sientes molestias aplica compresas frías, usa agua termal y contacta con nosotros inmediatamente para ajustar futuros tratamientos.',
              },
              {
                question:
                  '¿Puedo combinar este tratamiento con medicamentos para rosácea?',
                answer:
                  'Es importante informarnos sobre cualquier medicamento tópico que uses. Podemos adaptar el tratamiento y coordinar con tu dermatólogo para obtener los mejores resultados.',
              },
            ],
            cta: {
              title: 'Tu piel sensible merece cuidados especiales',
              subtitle:
                'No renuncies a tener una piel limpia y saludable. Nuestro protocolo especializado respeta tu sensibilidad mientras te brinda los mejores resultados.',
              promise: 'Cuidamos tu piel sensible como si fuera la nuestra',
            },
          },
        },
        {
          id: ServiceIds.HYDRAGLOW,
          name: 'Limpieza Facial HydraGlow',
          description:
            'La HydraGlow es nuestra limpieza facial más completa en Glow Skin. Combina la tecnología de la máquina Hydrafacial con principios activos seleccionados de acuerdo a las necesidades de tu piel.',
          price: 250000,
          currency: 'COP',
          details: {
            frequency: '1 sesión cada 30-45 días',
            benefits: [
              '🌿 Limpieza profunda',
              '💧 Hidratación en capas',
              '✨ Luminosidad inmediata',
            ],
            idealFor:
              'Renovar, hidratar y dejar la piel fresca, uniforme y radiante',
          },
          page: {
            hero: {
              title: 'Limpieza Facial',
              titleHighlight: 'HydraGlow',
              subtitle:
                'Nuestra limpieza facial más completa que combina tecnología Hydrafacial con principios activos personalizados',
              primaryColor: 'blue',
              gradientFrom: 'from-blue-50',
              gradientTo: 'to-cyan-100',
            },
            benefits: {
              title: '¿Por qué elegir HydraGlow?',
              subtitle:
                'La tecnología más avanzada para una experiencia de limpieza facial incomparable',
              items: [
                {
                  icon: 'water',
                  title: 'Tecnología Hydrafacial',
                  description:
                    'Limpieza, exfoliación e hidratación simultánea con resultados inmediatos',
                },
                {
                  icon: 'sparkles',
                  title: 'Principios Activos Personalizados',
                  description:
                    'Seleccionamos los activos específicos según las necesidades de tu piel',
                },
                {
                  icon: 'refresh',
                  title: 'Renovación Celular',
                  description:
                    'Estimula la regeneración natural para una piel más joven y radiante',
                },
              ],
            },
            process: {
              title: 'El Proceso HydraGlow',
              subtitle:
                'Una experiencia completa de renovación y nutrición facial',
              duration: '110-120',
              durationUnit: 'minutos aproximadamente',
              steps: [
                {
                  number: 1,
                  title: 'Análisis Personalizado',
                  description:
                    'Evaluamos tu piel para seleccionar los principios activos más adecuados.',
                },
                {
                  number: 2,
                  title: 'Limpieza Hydrafacial',
                  description:
                    'Limpieza profunda con tecnología de vórtice que remueve impurezas sin irritar.',
                },
                {
                  number: 3,
                  title: 'Exfoliación y Extracción',
                  description:
                    'Eliminamos células muertas y extraemos comedones de forma suave y efectiva.',
                },
                {
                  number: 4,
                  title: 'Infusión de Activos',
                  description:
                    'Aplicamos sueros concentrados que penetran profundamente en la piel.',
                },
                {
                  number: 5,
                  title: 'Hidratación y Protección',
                  description:
                    'Sellamos con hidratantes y protector solar para resultados duraderos.',
                },
              ],
              includes: [
                'Análisis de piel personalizado',
                'Limpieza Hydrafacial completa',
                'Principios activos seleccionados',
                'Mascarilla hidratante',
                'Protección solar premium',
              ],
            },
            faq: [
              {
                question: '¿Qué hace diferente a HydraGlow de otras limpiezas?',
                answer:
                  'HydraGlow utiliza tecnología Hydrafacial que combina limpieza, exfoliación e hidratación en un solo paso, además de principios activos personalizados según tu tipo de piel.',
              },
              {
                question: '¿Sentiré molestias durante el tratamiento?',
                answer:
                  'No, HydraGlow es completamente indoloro. La mayoría de clientes lo describen como relajante y refrescante.',
              },
              {
                question: '¿Cuándo veré los resultados?',
                answer:
                  'Los resultados son inmediatos. Tu piel se verá más luminosa, hidratada y uniforme desde la primera sesión.',
              },
              {
                question: '¿Puedo hacerme HydraGlow si tengo piel sensible?',
                answer:
                  'Sí, HydraGlow es suave y se adapta a todos los tipos de piel, incluidas las sensibles. Personalizamos los activos según tu sensibilidad.',
              },
            ],
            cta: {
              title: 'Experimenta la diferencia HydraGlow',
              subtitle:
                'Descubre por qué HydraGlow es nuestra limpieza facial más solicitada y transforma tu piel desde la primera sesión',
            },
          },
        },
        {
          id: ServiceIds.LIMPIEZA_SEBORREGULADORA,
          name: 'Limpieza Seborreguladora',
          description:
            'Ideal para pieles en etapas de acné severo activo, con pústulas y alta producción de grasa. Los resultados son progresivos y se perciben desde la primera sesión.',
          price: 375000,
          currency: 'COP',
          details: {
            frequency: '1 sesión cada 21-30 días',
            benefits: [
              'Equilibra el exceso de grasa en la piel',
              'Regula la producción de sebo',
              'Incluye recomendaciones de cuidado en casa',
            ],
            idealFor:
              'Pieles con acné severo activo y alta producción de grasa',
          },
          page: {
            hero: {
              title: 'Limpieza',
              titleHighlight: 'Seborreguladora',
              subtitle:
                'Protocolo especializado para pieles con acné severo activo, pústulas y alta producción de grasa',
              primaryColor: 'emerald',
              gradientFrom: 'from-emerald-50',
              gradientTo: 'to-teal-100',
            },
            problemSection: {
              title: '¿Sufres de acné severo y piel grasa?',
              subtitle:
                'El acné severo con alta producción de grasa requiere un enfoque especializado que vaya más allá de una limpieza facial convencional.',
              causes: [
                {
                  title: 'Hiperproducción sebácea',
                  description:
                    'Las glándulas sebáceas trabajan en exceso, creando un ambiente propicio para bacterias.',
                },
                {
                  title: 'Pústulas activas',
                  description:
                    'Lesiones inflamatorias que requieren tratamiento especializado y cuidadoso.',
                },
                {
                  title: 'Poros dilatados',
                  description:
                    'El exceso de grasa dilata los poros, acumulando más impurezas.',
                },
                {
                  title: 'Textura irregular',
                  description:
                    'La piel presenta rugosidad y falta de uniformidad por el acné activo.',
                },
              ],
              approach: [
                { icon: 'flask', title: 'Peeling Seborregulador' },
                { icon: 'water', title: 'Control de Grasa' },
                { icon: 'shield', title: 'Acción Antibacteriana' },
                { icon: 'refresh', title: 'Renovación Celular' },
              ],
            },
            process: {
              title: 'Protocolo Seborregulador Intensivo',
              subtitle:
                'Un enfoque científico para controlar la grasa y reducir el acné severo',
              duration: '80-90',
              durationUnit: 'minutos aproximadamente',
              steps: [
                {
                  number: 1,
                  title: 'Evaluación Especializada',
                  description:
                    'Analizamos el grado de severidad del acné y el nivel de producción sebácea.',
                },
                {
                  number: 2,
                  title: 'Preparación de la Piel',
                  description:
                    'Limpieza profunda preparatoria con productos específicos para piel grasa.',
                },
                {
                  number: 3,
                  title: 'Peeling Seborregulador',
                  description:
                    'Aplicamos peeling químico de alta estética para regular la producción de sebo.',
                },
                {
                  number: 4,
                  title: 'Extracción Especializada',
                  description:
                    'Extracción cuidadosa de comedones y pústulas con técnicas avanzadas.',
                },
                {
                  number: 5,
                  title: 'Tratamiento Post-Peeling',
                  description:
                    'Aplicamos activos calmantes y reguladores para optimizar los resultados.',
                },
              ],
              includes: [
                'Evaluación dermatológica',
                'Limpieza Facial Glow Skin completa',
                'Peeling Seborregulador profesional',
                'Protocolo post-tratamiento',
                'Plan de cuidados en casa',
              ],
            },
            expectations: {
              title: 'Resultados Progresivos',
              subtitle:
                'Los cambios se perciben desde la primera sesión y mejoran con cada tratamiento',
              timeline: [
                {
                  phase: 'Primera Sesión',
                  icon: 'sparkles',
                  description:
                    'Piel menos grasa y brillante. Reducción visible de pústulas activas.',
                },
                {
                  phase: '2-3 Sesiones',
                  icon: 'trending-down',
                  description:
                    'Control significativo de la producción sebácea. Menor aparición de brotes.',
                },
                {
                  phase: '4-6 Sesiones',
                  icon: 'star',
                  description:
                    'Textura mejorada, poros menos dilatados, piel equilibrada.',
                },
                {
                  phase: 'Mantenimiento',
                  icon: 'shield-checkmark',
                  description:
                    'Piel controlada con producción sebácea regulada y prevención de brotes.',
                },
              ],
            },
            homecare: {
              title: 'Cuidados Esenciales en Casa',
              subtitle:
                'El éxito del tratamiento depende también de tu rutina diaria',
              recommended: [
                {
                  title: 'Limpiador seborregulador',
                  description:
                    'Gel de limpieza específico para piel grasa, 2 veces al día',
                },
                {
                  title: 'Tónico astringente',
                  description:
                    'Para cerrar poros y controlar la grasa sin resecar',
                },
                {
                  title: 'Hidratante oil-free',
                  description: 'Hidratación ligera que no obstruya los poros',
                },
                {
                  title: 'Protector solar matificante',
                  description:
                    'SPF 30+ con efecto mate para controlar el brillo',
                },
              ],
              avoid: [
                {
                  title: 'Productos comedogénicos',
                  description:
                    'Evita maquillaje y cremas que obstruyan los poros',
                },
                {
                  title: 'Limpieza excesiva',
                  description:
                    'No limpies más de 2 veces al día para no estimular más grasa',
                },
                {
                  title: 'Tocar las lesiones',
                  description:
                    'Evita manipular granos o pústulas para prevenir cicatrices',
                },
              ],
            },
            faq: [
              {
                question: '¿Es doloroso el peeling seborregulador?',
                answer:
                  'Puedes sentir una ligera sensación de hormigueo durante la aplicación, pero es bien tolerado. Cualquier molestia desaparece rápidamente.',
              },
              {
                question: '¿Cuántas sesiones necesito para ver resultados?',
                answer:
                  'Los primeros cambios se notan desde la primera sesión. Para resultados óptimos en acné severo, recomendamos 6-8 sesiones.',
              },
              {
                question: '¿Puedo usar maquillaje después del tratamiento?',
                answer:
                  'Recomendamos esperar 24 horas antes de aplicar maquillaje. Usa solo productos no comedogénicos.',
              },
              {
                question: '¿Qué cuidados debo tener después del peeling?',
                answer:
                  'Evita el sol directo por 48 horas, usa protector solar diariamente y sigue las indicaciones de productos recomendados.',
              },
            ],
            cta: {
              title: 'Controla tu acné severo definitivamente',
              subtitle:
                'No permitas que el acné severo afecte tu autoestima. Nuestro protocolo seborregulador está diseñado específicamente para casos como el tuyo.',
              promise: 'Resultados progresivos desde la primera sesión',
            },
          },
        },
      ],
    },
    {
      id: ServiceIds.PROTOCOLOS_ACNE,
      title: 'Protocolos para Acné',
      description:
        'Tratamientos especializados para el control y eliminación del acné',
      services: [
        {
          id: ServiceIds.TRATAMIENTO_ANTI_ACNE_INTENSIVO,
          name: 'Tratamiento Anti-Acné Intensivo',
          description:
            'Programa integral de alta estética diseñado para tratar el acné activo de leve a severo, controlando brotes y previniendo secuelas. Un enfoque científico para una piel sana.',
          price: 830000,
          currency: 'COP',
          details: {
            includes: [
              '4 Sesiones de Peeling Químico: Frecuencia de 1 sesión cada 8 días para una renovación celular controlada',
              '2 Sesiones de Limpieza Anti-Acné: Frecuencia de 1 sesión cada 20 días para mantener la pureza de la piel',
              'Consulta y diagnóstico inicial para una personalización completa del tratamiento',
            ],
          },
        },
      ],
    },
    {
      id: ServiceIds.MANCHAS_CICATRICES,
      title: 'Manchas y Cicatrices',
      description:
        'Tratamientos especializados para la eliminación de manchas y mejora de cicatrices',
      services: [
        {
          id: ServiceIds.TRATAMIENTO_DESPIGMENTANTE,
          name: 'Tratamiento Despigmentante con Peelings Químicos',
          description:
            'Renovación celular controlada mediante la aplicación de ácidos de última generación para atenuar manchas (melasma, hiperpigmentación post-inflamatoria) y unificar el tono de la piel.',
          price: 600000,
          currency: 'COP',
          details: {
            includes: [
              '3 Sesiones de Peeling Químico o Micropunciones: Selección basada en diagnóstico profesional, utilizando activos despigmentantes de alta pureza',
              'Frecuencia: 1 sesión cada 15 días para resultados progresivos y seguros',
            ],
          },
        },
        {
          id: ServiceIds.TRATAMIENTO_REGENERATIVE_PLUS,
          name: 'Tratamiento Regenerative + (Cicatrices y Textura)',
          description:
            'Avanzado protocolo de bioestimulación celular con tecnología de micropunciones y alta nutrición para reconstruir el tejido dañado, mejorando visiblemente la apariencia de cicatrices y la textura general de la piel.',
          price: 1200000,
          currency: 'COP',
          details: {
            includes: [
              '3 Sesiones de Microneedling: Para estimular la síntesis de colágeno y elastina',
              '3 Sesiones de Antiox Peel Pro: Para potenciar la renovación y proteger la piel',
              'Obsequio: 1 Limpieza Facial Profunda Glow Skin',
            ],
          },
        },
      ],
    },
    {
      id: ServiceIds.REJUVENECIMIENTO,
      title: 'Rejuvenecimiento',
      description:
        'Tratamientos para combatir los signos del envejecimiento y mejorar la textura de la piel',
      services: [
        {
          id: ServiceIds.ANTIOX_PEEL_PRO,
          name: 'Antiox Peel Pro (Peeling Antioxidante)',
          description:
            'Tratamiento de renovación celular que combate los radicales libres, principales causantes del envejecimiento prematuro. Aporta luminosidad y mejora la textura de la piel.',
          price: 375000,
          currency: 'COP',
          details: {
            includes: [
              'Diagnóstico de piel para personalizar la fórmula del peeling.',
              'Aplicación de peeling con potentes antioxidantes de última generación.',
              'Combinado con una Limpieza Facial Glow Skin para máxima absorción y resultados.',
            ],
          },
        },
        {
          id: ServiceIds.PORCELANIZACION_FACIAL,
          name: 'Porcelanización Facial (Efecto Glow)',
          description:
            'Consigue una piel visiblemente más joven, tersa y luminosa. Este tratamiento combina técnicas para unificar el tono, minimizar poros y aportar un brillo saludable y duradero.',
          price: 250000,
          currency: 'COP',
          details: {
            includes: [
              'Limpieza Facial Glow Skin.',
              'Aplicación de activos tensores y unificadores.',
              'Mascarilla hidroplástica para un efecto final radiante y sellado de activos.',
            ],
          },
        },
        {
          id: ServiceIds.HYDRAGLOW_ANTIOX_PEEL,
          name: 'HydraGlow + Antiox Peel Pro',
          description:
            'La combinación perfecta para lograr un Glow inmediato y duradero 🌟. Iniciamos con la Limpieza HydraGlow, nuestra limpieza más completa que utiliza tecnología Hydrafacial junto con principios activos personalizados según tu piel 💧. Luego potenciamos los resultados con el Antiox Peel Pro, un avanzado cóctel de ácidos de medicina estética que mejora textura, uniformidad y vitalidad de la piel 🌿.',
          price: 450000,
          currency: 'COP',
          details: {
            includes: [
              'HydraGlow: Limpieza profunda con tecnología Hydrafacial',
              'Antiox Peel Pro: Peeling antioxidante de medicina estética',
              'Hidratación en capas y luminosidad inmediata',
              'Mejora de textura, uniformidad y vitalidad',
            ],
            duration: '2 horas',
            results:
              'Una piel renovada, fresca y radiante desde la primera sesión',
          },
          page: {
            hero: {
              title: 'HydraGlow +',
              titleHighlight: 'Antiox Peel Pro',
              subtitle:
                'La combinación perfecta para lograr un Glow inmediato y duradero. Tecnología Hydrafacial + Medicina Estética',
              primaryColor: 'violet',
              gradientFrom: 'from-violet-50',
              gradientTo: 'to-purple-100',
            },
            benefits: {
              title: 'Doble Potencia para Resultados Excepcionales',
              subtitle:
                'Combinamos lo mejor de dos mundos: limpieza avanzada y renovación celular',
              items: [
                {
                  icon: 'water',
                  title: 'HydraGlow Completo',
                  description:
                    'Limpieza profunda, exfoliación e hidratación con tecnología Hydrafacial',
                },
                {
                  icon: 'flask',
                  title: 'Antiox Peel Pro',
                  description:
                    'Peeling antioxidante de medicina estética para renovación celular avanzada',
                },
                {
                  icon: 'sparkles',
                  title: 'Sinergia Perfecta',
                  description:
                    'La combinación potencia los efectos de ambos tratamientos',
                },
              ],
            },
            process: {
              title: 'Protocolo de Doble Acción',
              subtitle:
                'Una experiencia completa de 2 horas para transformar tu piel',
              duration: '120',
              durationUnit: 'minutos',
              steps: [
                {
                  number: 1,
                  title: 'Análisis Integral',
                  description:
                    'Evaluación completa para personalizar ambos tratamientos según tu piel.',
                },
                {
                  number: 2,
                  title: 'Fase HydraGlow',
                  description:
                    'Limpieza profunda, exfoliación suave y primera hidratación con tecnología Hydrafacial.',
                },
                {
                  number: 3,
                  title: 'Preparación para Peeling',
                  description:
                    'Acondicionamiento de la piel para maximizar la absorción del peeling.',
                },
                {
                  number: 4,
                  title: 'Antiox Peel Pro',
                  description:
                    'Aplicación del cóctel antioxidante de medicina estética para renovación profunda.',
                },
                {
                  number: 5,
                  title: 'Sellado y Protección',
                  description:
                    'Hidratación intensiva y protección solar para optimizar resultados.',
                },
              ],
              includes: [
                'Consulta y análisis personalizado',
                'HydraGlow completo con principios activos',
                'Antiox Peel Pro de medicina estética',
                'Mascarillas especializadas',
                'Protección solar premium',
                'Guía de cuidados post-tratamiento',
              ],
            },
            comparison: {
              title: '¿Por qué elegir la combinación?',
              subtitle:
                'Comparación entre tratamientos individuales vs. combinados',
              individual: {
                title: 'Tratamientos Separados',
                items: [
                  'Resultados graduales',
                  'Múltiples citas',
                  'Mayor tiempo total',
                  'Costo individual mayor',
                ],
              },
              combined: {
                title: 'Tratamiento Combinado',
                items: [
                  'Resultados inmediatos y potenciados',
                  'Una sola sesión intensiva',
                  'Ahorro de tiempo',
                  'Mejor relación costo-beneficio',
                  'Sinergia entre tratamientos',
                ],
              },
            },
            expectations: {
              title: 'Qué Esperar Después del Tratamiento',
              subtitle:
                'Resultados inmediatos que continúan mejorando en los días siguientes',
              immediate: {
                title: 'Inmediato (0-24 horas)',
                description:
                  'Piel visiblemente más luminosa, hidratada y uniforme. Sensación de frescura y suavidad.',
              },
              shortTerm: {
                title: 'Corto Plazo (1-7 días)',
                description:
                  'Mejora progresiva de la textura, reducción de poros y mayor uniformidad en el tono.',
              },
              longTerm: {
                title: 'Largo Plazo (1-4 semanas)',
                description:
                  'Renovación celular completa, piel más firme, líneas finas atenuadas y glow duradero.',
              },
            },
            aftercare: {
              title: 'Cuidados Post-Tratamiento',
              subtitle:
                'Sigue estas recomendaciones para maximizar y prolongar los resultados',
              first24h: [
                {
                  title: 'Evita el maquillaje',
                  description:
                    'Permite que tu piel respire las primeras 6-8 horas',
                },
                {
                  title: 'Hidratación suave',
                  description:
                    'Usa solo los productos recomendados por nosotros',
                },
                {
                  title: 'No toques tu rostro',
                  description: 'Evita manipular la piel tratada',
                },
              ],
              firstWeek: [
                {
                  title: 'Protección solar estricta',
                  description: 'SPF 50+ y reaplica cada 2-3 horas',
                },
                {
                  title: 'Hidratación intensiva',
                  description: 'Usa cremas reparadoras mañana y noche',
                },
                {
                  title: 'Evita exfoliación',
                  description: 'No uses scrubs ni ácidos por 7 días',
                },
              ],
            },
            faq: [
              {
                question: '¿Es seguro combinar estos dos tratamientos?',
                answer:
                  'Absolutamente. Nuestro protocolo está diseñado específicamente para que ambos tratamientos se complementen de forma segura y efectiva.',
              },
              {
                question: '¿Sentiré molestias durante las 2 horas?',
                answer:
                  'No, la mayoría de clientes encuentra el tratamiento relajante. El HydraGlow es completamente confortable y el peeling puede causar ligero hormigueo.',
              },
              {
                question: '¿Con qué frecuencia puedo hacerme este tratamiento?',
                answer:
                  'Recomendamos cada 6-8 semanas para permitir la renovación celular completa y maximizar los beneficios.',
              },
              {
                question:
                  '¿Puedo hacerme este tratamiento si tengo piel sensible?',
                answer:
                  'Sí, pero adaptaremos las concentraciones y productos. Es importante informarnos sobre tu sensibilidad durante la consulta.',
              },
              {
                question: '¿Cuándo podré ver los resultados completos?',
                answer:
                  'Los resultados son inmediatos, pero la renovación celular completa se aprecia entre 2-4 semanas después del tratamiento.',
              },
            ],
            cta: {
              title: 'Experimenta la Transformación Definitiva',
              subtitle:
                'No te conformes con resultados ordinarios. Descubre por qué esta combinación es nuestro tratamiento facial más solicitado.',
              highlight:
                'Glow inmediato + Renovación profunda = Resultados extraordinarios',
            },
          },
        },
      ],
    },
    {
      id: ServiceIds.EXOSOMAS,
      title: 'Terapia Avanzada con Exosomas',
      description:
        'La última frontera en regeneración celular. Los exosomas son vesículas mensajeras que instruyen a las células de la piel para que se reparen y rejuvenezcan, amplificando drásticamente los resultados de la tecnología estética.',
      services: [
        {
          id: ServiceIds.MICRONEEDLING_EXOSOMAS,
          name: 'Microneedling Regenerativo + Exosomas',
          description:
            'Potenciamos la terapia de inducción de colágeno con el poder regenerativo de los exosomas. Ideal para una reparación intensiva de cicatrices, arrugas y flacidez.',
          price: 1200000,
          currency: 'COP',
          details: {
            includes: [
              '1 Sesión de Microneedling',
              'Aplicación de vial de Exosomas de alta concentración de laboratorio reconocido',
              'Terapia de luz LED para potenciar la absorción y la respuesta celular',
            ],
          },
        },
        {
          id: 'microneedling-exosomas-3-sesiones',
          name: 'Tratamiento 3 Sesiones Microneedling + Exosomas',
          description:
            'Tratamiento completo de 3 sesiones para maximizar los beneficios regenerativos de los exosomas. Ideal para resultados óptimos en reparación de cicatrices, arrugas y flacidez.',
          price: 2700000,
          currency: 'COP',
          details: {
            includes: [
              '3 Sesiones de Microneedling + Exosomas',
              'Aplicación de vial de Exosomas de alta concentración en cada sesión',
              'Terapia de luz LED en cada sesión',
              'Seguimiento personalizado durante el tratamiento',
            ],
            frequency: '1 sesión cada 4-6 semanas',
          },
        },
      ],
    },
    {
      id: ServiceIds.PDRN,
      title: 'Bio-regeneración con PDRN de Salmón',
      description:
        'El PDRN (Polinucleótidos) derivado del ADN de salmón, es un bio-estimulador de alta compatibilidad que repara el ADN celular dañado. Promueve la regeneración de tejido, mejora la elasticidad y la salud general de la piel desde su núcleo.',
      services: [
        {
          id: 'protocolo-pdrn',
          name: 'Protocolo PDRN Rejuvenecimiento Intensivo',
          description:
            'Tratamiento enfocado en la reparación profunda de la piel, restaurando la firmeza, elasticidad y atenuando arrugas finas y signos de fatiga.',
          price: 900000,
          currency: 'COP',
          details: {
            includes: [
              '1 Sesión de aplicación de PDRN mediante técnica de micropunciones para una entrega dérmica efectiva',
              'Ideal para rostro, cuello y escote',
              'Resultados visibles en la mejora de la calidad y densidad de la piel',
            ],
          },
        },
        {
          id: 'protocolo-pdrn-3-sesiones',
          name: 'Tratamiento 3 Sesiones PDRN Rejuvenecimiento Intensivo',
          description:
            'Tratamiento completo de 3 sesiones para potenciar los efectos regenerativos del PDRN. Ideal para una reparación profunda y resultados duraderos en firmeza, elasticidad y calidad de la piel.',
          price: 2100000,
          currency: 'COP',
          details: {
            includes: [
              '3 Sesiones de aplicación de PDRN mediante micropunciones',
              'Tratamiento completo para rostro, cuello y escote',
              'Seguimiento personalizado durante todo el proceso',
              'Resultados progresivos y duraderos',
            ],
            frequency: '1 sesión cada 4-6 semanas',
          },
        },
      ],
    },
    {
      id: 'cuidado-labios',
      title: 'Cuidado de Labios',
      description:
        'Tratamientos especializados para revitalizar y mejorar la apariencia de los labios',
      services: [
        {
          id: 'glow-lips',
          name: 'Glow Lips',
          description:
            'Revitaliza, neutraliza y devuelve la vida a tus labios, mejorando su color y textura natural.',
          price: 120000,
          currency: 'COP',
          details: {
            frequency:
              '1 sesión. Para resultados óptimos, se recomienda el tratamiento de 3 sesiones',
          },
        },
        {
          id: 'tratamiento-3-sesiones-glow-lips',
          name: 'Tratamiento 3 Sesiones Glow Lips',
          description:
            'Tratamiento completo para un resultado óptimo y duradero en la revitalización de tus labios.',
          price: 300000,
          currency: 'COP',
          details: {
            frequency: '1 sesión cada 15 días',
          },
        },
      ],
    },
  ],
  contactInfo: {
    whatsapp: environment.whatsappLink,
    phone: environment.phone,
    email: environment.email,
    booking: environment.bookingLink,
  },
};
