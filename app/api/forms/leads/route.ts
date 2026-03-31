import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies submissions to Vyva Forms API (public endpoint, no API key).
 * @see vyva-forms-api FormsController: POST forms/public/:businessSlug/:formSlug/responses
 * Body upstream: { data: string } where `data` is JSON.stringify(answers).
 *
 * This route accepts flexible JSON and normalizes to `data`:
 * - { data: string } — sent as-is
 * - { data: object } — data is JSON.stringify'd
 * - any other object — entire body is JSON.stringify'd as answers
 */
function resolveUpstreamDataString(body: unknown): string {
  if (body === null || body === undefined) {
    return "{}";
  }
  if (typeof body !== "object") {
    return JSON.stringify(body);
  }
  const o = body as Record<string, unknown>;
  if ("data" in o && o.data !== undefined) {
    if (typeof o.data === "string") {
      return o.data;
    }
    return JSON.stringify(o.data);
  }
  return JSON.stringify(o);
}

function formsBaseUrl(): string {
  return (
    process.env.NEXT_FORMS_API_BASE ||
    process.env.NEXT_PUBLIC_FORMS_API_BASE ||
    "https://x7u36u3ex2.execute-api.us-east-1.amazonaws.com/prd/api/forms"
  ).replace(/\/$/, "");
}

function businessSlug(): string {
  return process.env.NEXT_FORMS_BUSINESS_SLUG || "mundofitcol";
}

function formSlug(): string {
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

    const dataString = resolveUpstreamDataString(parsed);
    const url = `${formsBaseUrl()}/public/${businessSlug()}/${formSlug()}/responses`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: dataString }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const upstreamText = await response.text().catch(() => "");

      console.log("[Forms Leads API] Raw upstream response:", upstreamText);

      if (!response.ok) {
        console.error("[Forms Leads API] Upstream error:", {
          status: response.status,
          url,
          body: upstreamText,
        });
        return NextResponse.json(
          {
            success: false,
            upstream: {
              ok: false,
              status: response.status,
              body: upstreamText,
            },
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          upstream: {
            ok: true,
            status: response.status,
            body: upstreamText,
          },
        },
        { status: 200 }
      );
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        console.error("[Forms Leads API] Request timeout");
      } else {
        console.error("[Forms Leads API] Fetch error:", fetchError);
      }
      return NextResponse.json(
        {
          success: false,
          upstream: {
            ok: false,
            error:
              fetchError instanceof Error
                ? fetchError.message
                : String(fetchError),
          },
        },
        { status: 200 }
      );
    }
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
