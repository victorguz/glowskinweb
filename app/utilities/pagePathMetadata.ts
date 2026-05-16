/** Metadatos de página para Pixel ViewContent y registro de visitas en Forms API. */
export interface PagePathMetadata {
  contentName: string;
  pageType: string;
  contentCategory: string;
  sede?: string;
}

export function getPageMetadataForPath(pathname: string): PagePathMetadata {
  if (pathname === "/") {
    return {
      contentName: "Página Principal",
      pageType: "home",
      contentCategory: "home",
    };
  }
  if (pathname === "/plan-basico") {
    return {
      contentName: "Plan Básico",
      pageType: "plan_page",
      contentCategory: "plan_basico",
    };
  }
  if (pathname === "/plan-personalizado") {
    return {
      contentName: "Plan Personalizado",
      pageType: "plan_page",
      contentCategory: "plan_personalizado",
    };
  }
  if (pathname === "/clase-cortesia") {
    return {
      contentName: "Pase de Cortesía",
      pageType: "landing_page",
      contentCategory: "pase_cortesia",
    };
  }
  if (pathname === "/terminos") {
    return {
      contentName: "Términos y Condiciones",
      pageType: "legal",
      contentCategory: "legal",
    };
  }
  if (pathname === "/privacidad") {
    return {
      contentName: "Política de Privacidad",
      pageType: "legal",
      contentCategory: "legal",
    };
  }
  if (pathname === "/sedes/ciudad-jardin") {
    return {
      contentName: "Sede Ciudad Jardín",
      pageType: "location_page",
      contentCategory: "sede_ciudad_jardin",
      sede: "ciudad-jardin",
    };
  }
  if (pathname === "/sedes/san-jose") {
    return {
      contentName: "Sede San José",
      pageType: "location_page",
      contentCategory: "sede_san_jose",
      sede: "san-jose",
    };
  }

  return {
    contentName: pathname || "/",
    pageType: "other",
    contentCategory: "other",
    sede: pathname.includes("ciudad-jardin")
      ? "ciudad-jardin"
      : pathname.includes("san-jose")
        ? "san-jose"
        : undefined,
  };
}
