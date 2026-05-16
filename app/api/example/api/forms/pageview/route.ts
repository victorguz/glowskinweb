import { NextRequest, NextResponse } from "next/server";
import { postPublicFormResponse } from "../shared";

/**
 * Slug del formulario Vyva donde se guardan las visitas (misma estructura que `leads` recomendado).
 * Por defecto coincide con `NEXT_FORMS_FORM_SLUG` / `leads` para no requerir otro formulario;
 * define `NEXT_FORMS_PAGEVIEW_FORM_SLUG=pageviews` si creas un formulario dedicado.
 */
function pageviewFormSlug(): string {
  return (
    process.env.NEXT_FORMS_PAGEVIEW_FORM_SLUG ||
    process.env.NEXT_FORMS_FORM_SLUG ||
    "leads"
  );
}

export async function POST(request: NextRequest) {
  try {
    let parsed: unknown;
    try {
      parsed = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "invalid_json" },
        { status: 400 }
      );
    }

    return postPublicFormResponse(
      pageviewFormSlug(),
      parsed,
      "Forms Pageview API"
    );
  } catch (error) {
    console.error("[Forms Pageview API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        upstream: {
          ok: false,
          error: error instanceof Error ? error.message : String(error),
        },
      },
      { status: 200 }
    );
  }
}
