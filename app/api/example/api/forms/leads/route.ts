import { NextRequest, NextResponse } from "next/server";
import { postPublicFormResponse } from "../shared";

function leadsFormSlug(): string {
  return process.env.NEXT_FORMS_FORM_SLUG || "leads";
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
      leadsFormSlug(),
      parsed,
      "Forms Leads API"
    );
  } catch (error) {
    console.error("[Forms Leads API] Error:", error);
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
