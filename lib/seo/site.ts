/**
 * URL canónica del sitio. Configura NEXT_PUBLIC_SITE_URL en Amplify (p. ej. https://glowskinbq.com).
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (url) return url;
  return 'https://glowskinbq.com';
}

export const SITE_NAME = 'Glow Skin';
export const SITE_TAGLINE =
  'Limpieza facial profunda y estética facial en Barranquilla — Sofía Nieto';

export const LOCAL_SEO = {
  city: 'Barranquilla',
  region: 'Atlántico',
  country: 'Colombia',
  countryCode: 'CO',
  neighborhood: 'Norte Centro Histórico',
  addressStreet: 'Carrera 50 # 74-120',
  postalCode: '080001',
  /** Aprox. Carrera 50 con calle 74 — ajustar si tienes coordenadas exactas de Google Business */
  latitude: 10.9688,
  longitude: -74.7814,
  placeIds: [] as string[],
} as const;

export const DEFAULT_KEYWORDS = [
  'limpieza facial Barranquilla',
  'Glow Skin',
  'Sofía Nieto',
  'estética facial Barranquilla',
  'tratamiento acné Barranquilla',
  'Alto Prado',
  'Norte Barranquilla',
] as const;
