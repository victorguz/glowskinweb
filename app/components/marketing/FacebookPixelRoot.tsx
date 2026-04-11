'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { fbqTrack, readFbCookies, sendCapiEvent } from './tracking';

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

function sendPageViewCapi() {
  const { fbp, fbc } = readFbCookies();
  return sendCapiEvent({
    eventName: 'PageView',
    eventTime: Math.floor(Date.now() / 1000),
    eventId: `pv_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
    eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
    actionSource: 'website',
    userData: {
      client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      fbp,
      fbc,
    },
  });
}

export function FacebookPixelRoot() {
  const pathname = usePathname();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!PIXEL_ID) return;

    const run = () => {
      fbqTrack('track', 'PageView');
      void sendPageViewCapi();
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
