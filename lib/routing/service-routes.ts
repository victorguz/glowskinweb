/** Servicios cuya ficha vive en otra ruta (p. ej. landing larga). */
const SERVICE_PATH_OVERRIDES: Record<string, string> = {
  "tratamiento-anti-acne-intensivo": "/metodo-glow-skin",
};

export function getServiceHref(serviceId: string): string {
  return SERVICE_PATH_OVERRIDES[serviceId] ?? `/servicios/${serviceId}`;
}

export function isServicePathOverride(serviceId: string): boolean {
  return serviceId in SERVICE_PATH_OVERRIDES;
}
