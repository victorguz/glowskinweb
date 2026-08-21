'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import {
  describePath,
  fbqTrackDeduped,
  getClientIp,
  getIdentityUserData,
  newEventId,
  readFbCookies,
  sendCapiEvent,
} from './tracking';

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

type SharedUserData = Record<string, unknown>;

/** Datos de emparejamiento comunes a todos los eventos de esta visita. */
async function resolveUserData(): Promise<SharedUserData> {
  const { fbp, fbc } = readFbCookies();
  const [clientIp, identity] = await Promise.all([
    getClientIp(),
    getIdentityUserData(),
  ]);
  return {
    client_user_agent:
      typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    client_ip_address: clientIp,
    externalId: identity.externalId,
    email: identity.email,
    phone: identity.phone,
    fbp,
    fbc,
  };
}

/**
 * Emite PageView y ViewContent de la ruta actual.
 *
 * Cada evento sale por duplicado a propósito —navegador y API de Conversiones—
 * pero compartiendo `eventId`, que es lo que permite a Meta reconocer que son
 * el mismo hecho y contarlo una sola vez.
 *
 * ViewContent estaba escrito en el proyecto pero nunca llegó a dispararse: el
 * componente que lo emitía no estaba montado en el layout.
 */
async function trackRoute(pathname: string) {
  const meta = describePath(pathname);
  const eventSourceUrl =
    typeof window !== 'undefined' ? window.location.href : '';
  const eventTime = Math.floor(Date.now() / 1000);
  const userData = await resolveUserData();

  const send = (eventName: string, customData: Record<string, unknown>) => {
    const eventId = newEventId();
    fbqTrackDeduped(eventName, customData, eventId);
    return sendCapiEvent({
      eventName,
      eventTime,
      eventId,
      eventSourceUrl,
      actionSource: 'website',
      userData,
      customData,
    });
  };

  await Promise.all([
    send('PageView', { page_type: meta.pageType }),
    send('ViewContent', {
      content_name: meta.contentName,
      content_category: meta.contentCategory,
      page_type: meta.pageType,
      currency: 'COP',
    }),
  ]);
}

export function FacebookPixelRoot() {
  const pathname = usePathname();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!PIXEL_ID) return;

    const run = () => {
      void trackRoute(pathname || '/');
    };

    if (typeof window !== 'undefined' && window.fbq) {
      run();
      return;
    }

    let attempts = 0;
    const maxAttempts = 120;
    intervalRef.current = setInterval(() => {
      attempts += 1;
      if (typeof window !== 'undefined' && window.fbq) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        run();
        return;
      }
      if (attempts >= maxAttempts && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [pathname]);

  if (!PIXEL_ID) return null;

  return (
    <Script
      id="fb-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');`,
      }}
    />
  );
}
