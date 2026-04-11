/** CDN de imágenes (mismo host que el resto del sitio) */
export const SERVICE_CDN_IMAGES = 'https://main.dlloltrpvu8dp.amplifyapp.com/assets/images';

const DEFAULT_HERO = `${SERVICE_CDN_IMAGES}/hero/1-glow-skin-hero-limpieza-facial.webp`;
const DEFAULT_PROCESS = `${SERVICE_CDN_IMAGES}/methods/1-limpieza-facial-glow-skin.jpg`;

/** Hero / proceso por id de servicio; si no hay entrada, defaults genéricos */
const HERO_BY_SERVICE: Record<string, string> = {
  'limpieza-facial': DEFAULT_HERO,
  'limpieza-facial-anti-acne': `${SERVICE_CDN_IMAGES}/hero/2-glow-skin-hero-tratamiento-facial.webp`,
  'limpieza-facial-pieles-sensibles': DEFAULT_HERO,
  hydraglow: `${SERVICE_CDN_IMAGES}/hero/3-glow-skin-hero-servicios-esteticos.webp`,
  'limpieza-seborreguladora': `${SERVICE_CDN_IMAGES}/hero/2-glow-skin-hero-tratamiento-facial.webp`,
  'hydraglow-antiox-peel': `${SERVICE_CDN_IMAGES}/hero/3-glow-skin-hero-servicios-esteticos.webp`,
  'tratamiento-anti-acne-intensivo': `${SERVICE_CDN_IMAGES}/hero/2-glow-skin-hero-tratamiento-facial.webp`,
  'tratamiento-regenerative-plus': `${SERVICE_CDN_IMAGES}/hero/3-glow-skin-hero-servicios-esteticos.webp`,
  'tratamiento-despigmentante': `${SERVICE_CDN_IMAGES}/hero/3-glow-skin-hero-servicios-esteticos.webp`,
};

const PROCESS_BY_SERVICE: Record<string, string> = {
  'limpieza-facial': DEFAULT_PROCESS,
  'limpieza-facial-anti-acne': `${SERVICE_CDN_IMAGES}/methods/1-metodo-anti-acne.webp`,
  'limpieza-facial-pieles-sensibles': DEFAULT_PROCESS,
  hydraglow: DEFAULT_PROCESS,
  'limpieza-seborreguladora': `${SERVICE_CDN_IMAGES}/methods/1-metodo-anti-acne.webp`,
  'hydraglow-antiox-peel': DEFAULT_PROCESS,
  'tratamiento-anti-acne-intensivo': `${SERVICE_CDN_IMAGES}/methods/1-metodo-anti-acne.webp`,
  'tratamiento-regenerative-plus': `${SERVICE_CDN_IMAGES}/methods/1-metodo-regenerativo.webp`,
  'tratamiento-despigmentante': `${SERVICE_CDN_IMAGES}/methods/1-metodo-anti-manchas.webp`,
};

export function getServiceHeroImage(serviceId: string): string {
  return HERO_BY_SERVICE[serviceId] ?? DEFAULT_HERO;
}

export function getServiceProcessImage(serviceId: string): string {
  return PROCESS_BY_SERVICE[serviceId] ?? DEFAULT_PROCESS;
}
