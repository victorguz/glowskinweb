import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Tipos para la API de Conversiones
interface ConversionAPIRequest {
  eventName: string;
  eventTime: number;
  eventId: string;
  eventSourceUrl: string;
  actionSource: string;
  userData: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    externalId?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
  };
  customData?: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
    sede?: string;
    plan?: string;
    periodo?: string;
    precio?: number;
    page_type?: string;
  };
}

// Tipo para user_data que se envía a Facebook (con campos hasheados)
interface FacebookUserData {
  em?: string; // email hasheado
  ph?: string; // phone hasheado
  fn?: string; // firstName hasheado
  ln?: string; // lastName hasheado
  ct?: string; // city hasheado
  st?: string; // state hasheado
  country?: string; // country hasheado
  zp?: string; // postalCode hasheado
  external_id?: string; // externalId hasheado
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
}

/**
 * Hash de datos usando SHA-256 (requerido por Facebook)
 */
function hashData(data: string | undefined): string | undefined {
  if (!data) return undefined;
  const normalized = data.toLowerCase().trim();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Normaliza el número de teléfono según los estándares de Facebook
 */
function normalizePhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  // Remover todo excepto dígitos
  const digits = phone.replace(/\D/g, '');
  // Si no tiene código de país, asumir Colombia (+57)
  if (digits.length === 10) {
    return `57${digits}`;
  }
  return digits;
}

export async function POST(request: NextRequest) {
  try {
    // Skip Facebook events if TYPE is localhost
    const envType = process.env.NEXT_PUBLIC_TYPE || process.env.TYPE;
    if (envType === 'localhost') {
      console.log('[Facebook CAPI] Skipping event (localhost mode)');
      return NextResponse.json({ success: true, skipped: true }, { status: 200 });
    }

    // Usar NEXT_PUBLIC_ prefixed variables (disponibles en cliente y servidor en Amplify)
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || process.env.FACEBOOK_PIXEL_ID;
    const accessToken = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_TOKEN || process.env.FACEBOOK_PIXEL_TOKEN;

    if (!pixelId || !accessToken) {
      console.error('[Facebook CAPI] Missing credentials', {
        hasPixelId: !!pixelId,
        hasToken: !!accessToken,
        pixelIdSource: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ? 'NEXT_PUBLIC' : process.env.FACEBOOK_PIXEL_ID ? 'STANDARD' : 'NONE',
        tokenSource: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_TOKEN ? 'NEXT_PUBLIC' : process.env.FACEBOOK_PIXEL_TOKEN ? 'STANDARD' : 'NONE'
      });
      return NextResponse.json(
        {
          error: 'Facebook Pixel not configured',
          details: 'Please set NEXT_PUBLIC_FACEBOOK_PIXEL_ID and NEXT_PUBLIC_FACEBOOK_PIXEL_TOKEN in Amplify environment variables'
        },
        { status: 500 }
      );
    }

    const body: ConversionAPIRequest = await request.json();

    if (!body.userData) {
      (body as { userData: ConversionAPIRequest['userData'] }).userData = {};
    }

    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp =
      forwarded?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '';
    if (clientIp && !body.userData.client_ip_address) {
      body.userData.client_ip_address = clientIp;
    }

    // Preparar user_data con hashing según requerimientos de Facebook
    const userData: FacebookUserData = {};

    if (body.userData.email) {
      userData.em = hashData(body.userData.email);
    }
    if (body.userData.phone) {
      const normalizedPhone = normalizePhone(body.userData.phone);
      userData.ph = hashData(normalizedPhone);
    }
    if (body.userData.firstName) {
      userData.fn = hashData(body.userData.firstName);
    }
    if (body.userData.lastName) {
      userData.ln = hashData(body.userData.lastName);
    }
    if (body.userData.city) {
      userData.ct = hashData(body.userData.city);
    }
    if (body.userData.state) {
      userData.st = hashData(body.userData.state);
    }
    if (body.userData.country) {
      userData.country = hashData(body.userData.country);
    }
    if (body.userData.postalCode) {
      userData.zp = hashData(body.userData.postalCode);
    }
    if (body.userData.externalId) {
      userData.external_id = hashData(body.userData.externalId);
    }

    // Datos no hasheados
    if (body.userData.client_ip_address) {
      userData.client_ip_address = body.userData.client_ip_address;
    }
    if (body.userData.client_user_agent) {
      userData.client_user_agent = body.userData.client_user_agent;
    }
    if (body.userData.fbp) {
      userData.fbp = body.userData.fbp;
    }
    if (body.userData.fbc) {
      userData.fbc = body.userData.fbc;
    }

    // Construir el payload para la API de Conversiones
    const conversionPayload = {
      data: [
        {
          event_name: body.eventName,
          event_time: body.eventTime,
          event_id: body.eventId,
          event_source_url: body.eventSourceUrl,
          action_source: body.actionSource,
          user_data: userData,
          custom_data: body.customData || {},
        },
      ],
      test_event_code: process.env.FACEBOOK_TEST_EVENT_CODE, // Opcional: para testing
    };

    // Enviar a la API de Conversiones de Facebook
    const apiUrl = `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(conversionPayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('[Facebook CAPI] API Error:', responseData);
      return NextResponse.json(
        { error: 'Failed to send event to Facebook', details: responseData },
        { status: response.status }
      );
    }

    console.log('[Facebook CAPI] Event sent successfully:', {
      eventName: body.eventName,
      eventId: body.eventId,
      response: responseData,
    });

    return NextResponse.json({
      success: true,
      events_received: responseData.events_received,
      fbtrace_id: responseData.fbtrace_id,
    });
  } catch (error) {
    console.error('[Facebook CAPI] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
