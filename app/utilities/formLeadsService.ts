import { facebookPixel } from "./facebookPixel";

/**
 * Envía respuestas al formulario dinámico "leads" (Vyva Forms API) vía ruta interna.
 * Nombres de campo alineados con `form.data` en Vyva (mundofitcol / leads).
 */
export type LeadSubmissionPayload = Record<string, unknown>;

/** Campos del formulario Vyva "leads" (slug en API). */
export interface MundofitLeadsVyvaFields {
  nombre: string;
  correo: string;
  telfono: string;
  /** Cookie _fbp del Pixel (campo oculto `user_id_pixel`). */
  user_id_pixel: string;
  /** Array serializado como JSON (campo `labels`, tipo text en Vyva). */
  labels: string;
  /** Metadatos extra serializados (campo `other_relevant_info`). */
  other_relevant_info: string;
}

export interface BuildMundofitLeadsInput {
  /** Nombre completo tal como lo captura el modal. */
  nombreCompleto: string;
  correo?: string;
  telfono?: string;
  labels: string[];
  /** Contexto adicional (origen, plan, sede, etc.). */
  other?: Record<string, unknown>;
}

/**
 * Construye el payload con los `name` exactos del formulario Vyva.
 */
export function buildMundofitLeadsPayload(
  input: BuildMundofitLeadsInput
): LeadSubmissionPayload {
  const user_id_pixel = facebookPixel.getFbp() ?? "";

  const fields: MundofitLeadsVyvaFields = {
    nombre: input.nombreCompleto.trim(),
    correo: (input.correo ?? "").trim(),
    telfono: (input.telfono ?? "").trim(),
    user_id_pixel,
    labels: JSON.stringify(input.labels),
    other_relevant_info: JSON.stringify(input.other ?? {}),
  };

  return { ...fields };
}

export interface PageViewSubmissionInput {
  pathname: string;
  /** Query serializado, p. ej. `?a=1` o cadena vacía. */
  search: string;
  href: string;
  referrer: string;
  contentName: string;
  pageType: string;
  contentCategory: string;
  sede?: string;
}

/**
 * Payload de visita: mismos campos que el formulario `leads` en Vyva.
 * `user_id_pixel` = cookie _fbp; `other_relevant_info` incluye _fbc si existe.
 */
export function buildMundofitPageViewPayload(
  input: PageViewSubmissionInput
): LeadSubmissionPayload {
  const pathWithQuery =
    input.search && input.search.length > 0
      ? `${input.pathname}${input.search.startsWith("?") ? input.search : `?${input.search}`}`
      : input.pathname;

  return buildMundofitLeadsPayload({
    nombreCompleto: `(visita) ${input.contentName}`,
    correo: "",
    telfono: "",
    labels: [
      "visita página web",
      pathWithQuery,
      input.contentName,
      input.pageType,
    ],
    other: {
      type: "page_view",
      /** Ruta sin query (filtros en Vyva por ruta estable). */
      pathname: input.pathname,
      /** Ruta completa con query string si aplica. */
      pathCompleto: pathWithQuery,
      search: input.search || undefined,
      href: input.href,
      referrer: input.referrer || undefined,
      /** Nombre legible de la página (p. ej. "Plan Personalizado"). */
      pagina: input.contentName,
      contentName: input.contentName,
      pageType: input.pageType,
      contentCategory: input.contentCategory,
      sede: input.sede,
      fbc: facebookPixel.getFbc() || undefined,
    },
  });
}

function waitForFbp(maxWaitMs: number): Promise<void> {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      if (facebookPixel.getFbp()) {
        resolve();
        return;
      }
      if (Date.now() - start >= maxWaitMs) {
        resolve();
        return;
      }
      window.setTimeout(tick, 200);
    };
    tick();
  });
}

class FormLeadsService {
  /**
   * Si falla el upstream, solo registra en consola (no interrumpe el flujo del usuario).
   */
  async submitLead(payload: LeadSubmissionPayload): Promise<void> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const response = await fetch("/api/forms/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorBody = await response.json().catch(() => null);
          console.error("[Form Leads] Request failed:", {
            status: response.status,
            response: errorBody,
          });
          return;
        }

        const responseBody = await response.json().catch(() => null);
        console.log("[Form Leads] Response:", responseBody);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          console.error("[Form Leads] Request timeout");
        } else {
          console.error("[Form Leads] Network error:", fetchError);
        }
      }
    } catch (error) {
      console.error("[Form Leads] Error:", error);
    }
  }

  /**
   * Registra una vista de página en el mismo formulario Vyva que los leads (`/api/forms/leads`).
   * Incluye ruta, título de página y metadatos en `labels` y `other_relevant_info`.
   * Espera unos milisegundos a que exista _fbp tras cargar el Pixel; si no hay, envía igual.
   */
  async submitPageView(input: PageViewSubmissionInput): Promise<void> {
    const envType = process.env.NEXT_PUBLIC_TYPE || process.env.TYPE;
    if (envType === "localhost") {
      return;
    }

    try {
      await waitForFbp(3500);
      const payload = buildMundofitPageViewPayload(input);
      await this.submitLead(payload);
    } catch (error) {
      console.error("[Form Pageview] Error:", error);
    }
  }
}

export const formLeadsService = new FormLeadsService();
