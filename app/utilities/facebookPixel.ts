// Facebook Pixel Service - Cliente y Servidor
import { v4 as uuidv4 } from "uuid";

// Tipos de eventos
export type FacebookEventName = "ViewContent" | "CompleteRegistration" | "Lead";

export interface FacebookEventData {
  eventName: FacebookEventName;
  eventSourceUrl: string;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    externalId?: string;
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

class FacebookPixelService {
  private pixelId: string | null = null;
  private isInitialized = false;

  /**
   * Inicializa el Facebook Pixel en el lado del cliente
   */
  init(pixelId: string) {
    if (typeof window === "undefined") return;

    this.pixelId = pixelId;

    if (this.isInitialized) return;

    // Cargar el script del pixel
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Añadir noscript fallback
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);

    this.isInitialized = true;
  }

  /**
   * Genera un event_id único y consistente para deduplicación
   * Formato: {timestamp}-{eventName}-{hash}
   */
  private generateEventId(eventName: string, eventSourceUrl: string): string {
    const timestamp = Date.now();
    const urlHash = this.simpleHash(eventSourceUrl);
    // Usar formato que incluya información del evento para mejor deduplicación
    return `${timestamp}-${eventName}-${urlHash.substring(0, 8)}-${uuidv4().substring(0, 8)}`;
  }

  /**
   * Hash simple para URLs (no criptográfico, solo para deduplicación)
   */
  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Emite un evento tanto al Pixel (cliente) como a la API de Conversiones (servidor)
   */
  async emitEvent(data: FacebookEventData) {
    // Skip Facebook events if TYPE is localhost
    const envType = process.env.NEXT_PUBLIC_TYPE || process.env.TYPE;
    if (envType === "localhost") {
      console.log(
        "[Facebook Pixel] Skipping event (localhost mode):",
        data.eventName,
      );
      return;
    }

    // Generar event_id único y consistente para deduplicación
    const eventId = this.generateEventId(data.eventName, data.eventSourceUrl);
    // Usar el mismo event_time para ambos (en segundos Unix)
    const eventTime = Math.floor(Date.now() / 1000);

    // 1. Emitir evento al Pixel (lado cliente) con eventID para deduplicación
    // El eventID es CRÍTICO: debe ser el mismo que se envía a CAPI
    this.emitClientEvent(data.eventName, data.customData, eventId);

    // 2. Enviar evento a la API de Conversiones (lado servidor) con el mismo event_id
    await this.emitServerEvent(data, eventId, eventTime);
  }

  /**
   * Emite evento al Facebook Pixel (lado cliente)
   * IMPORTANTE: El eventID debe ser el mismo que se envía a la API de Conversiones para deduplicación
   */
  private emitClientEvent(
    eventName: FacebookEventName,
    customData?: FacebookEventData["customData"],
    eventId?: string,
  ) {
    if (typeof window === "undefined" || !window.fbq) return;

    try {
      const params: any = {
        ...customData,
      };

      // CRÍTICO: Incluir eventID para deduplicación (debe ser EXACTAMENTE el mismo que en CAPI)
      // Este es el parámetro clave que Facebook usa para deduplicar eventos entre Pixel y CAPI
      if (eventId) {
        params.eventID = eventId;
      }

      window.fbq("track", eventName, params);
      console.log("[Facebook Pixel] Event tracked:", eventName, {
        eventID: eventId,
        ...params,
      });
    } catch (error) {
      console.error("[Facebook Pixel] Error tracking event:", error);
    }
  }

  /**
   * Envía evento a la API de Conversiones (lado servidor)
   */
  private async emitServerEvent(
    data: FacebookEventData,
    eventId: string,
    eventTime: number,
  ) {
    try {
      // Obtener información del navegador
      const userAgent = navigator.userAgent;
      const clientIpAddress = await this.getClientIp();
      const fbp = this.getCookie("_fbp");
      const fbc = this.getCookie("_fbc");

      const response = await fetch("/api/facebook-conversion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName: data.eventName,
          eventTime, // Usar el mismo eventTime que se envió al Pixel
          eventId, // Usar el mismo eventId que se envió al Pixel
          eventSourceUrl: data.eventSourceUrl,
          actionSource: "website",
          userData: {
            ...data.userData,
            client_user_agent: userAgent,
            client_ip_address: clientIpAddress,
            fbp,
            fbc,
          },
          customData: data.customData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server event failed: ${response.statusText}`);
      }

      console.log("[Facebook CAPI] Event sent:", data.eventName);
    } catch (error) {
      console.error("[Facebook CAPI] Error sending server event:", error);
    }
  }

  /**
   * Obtiene la IP del cliente preferiendo IPv6 cuando esté disponible.
   * api64.ipify.org devuelve IPv6 si el cliente lo soporta, si no retorna IPv4.
   */
  private async getClientIp(): Promise<string | undefined> {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.warn("[Facebook Pixel] Could not get client IP");
      return undefined;
    }
  }

  /**
   * Cookie _fbp del Pixel (para correlacionar leads con el navegador).
   */
  getFbp(): string | undefined {
    return this.getCookie("_fbp");
  }

  /** Cookie _fbc (click id) cuando el usuario llega desde anuncios de Meta. */
  getFbc(): string | undefined {
    return this.getCookie("_fbc");
  }

  /**
   * Obtiene el valor de una cookie
   */
  private getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift();
    }
    return undefined;
  }

  /**
   * Hash de datos sensibles (email, phone) usando SHA-256
   */
  private async hashData(data: string): Promise<string> {
    const normalized = data.toLowerCase().trim();
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(normalized);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
}

// Exportar instancia singleton
export const facebookPixel = new FacebookPixelService();
