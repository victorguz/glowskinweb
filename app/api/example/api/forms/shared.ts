import { NextResponse } from "next/server";

/**
 * Normaliza el cuerpo hacia `data` string que espera Vyva Forms API.
 */
export function resolveUpstreamDataString(body: unknown): string {
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

export function getFormsBaseUrl(): string {
  return (
    process.env.NEXT_FORMS_API_BASE ||
    process.env.NEXT_PUBLIC_FORMS_API_BASE ||
    "https://x7u36u3ex2.execute-api.us-east-1.amazonaws.com/prd/api/forms"
  ).replace(/\/$/, "");
}

export function getBusinessSlug(): string {
  return process.env.NEXT_FORMS_BUSINESS_SLUG || "mundofitcol";
}

export async function postPublicFormResponse(
  formSlug: string,
  parsedBody: unknown,
  logLabel: string
): Promise<NextResponse> {
  const dataString = resolveUpstreamDataString(parsedBody);
  const url = `${getFormsBaseUrl()}/public/${getBusinessSlug()}/${formSlug}/responses`;

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

    console.log(`[${logLabel}] Raw upstream response:`, upstreamText);

    if (!response.ok) {
      console.error(`[${logLabel}] Upstream error:`, {
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
      console.error(`[${logLabel}] Request timeout`);
    } else {
      console.error(`[${logLabel}] Fetch error:`, fetchError);
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
}
