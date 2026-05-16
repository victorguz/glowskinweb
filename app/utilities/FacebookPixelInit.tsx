"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { facebookPixel } from "./facebookPixel";
import { getPageMetadataForPath } from "./pagePathMetadata";

export function FacebookPixelInit() {
  const pathname = usePathname();

  // Obtener el Pixel ID directamente de las variables de entorno (disponible en cliente con NEXT_PUBLIC_)
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  // Inicializar el Pixel una sola vez
  useEffect(() => {
    if (!pixelId) {
      console.warn(
        "[Facebook Pixel] Pixel ID not configured. Set NEXT_PUBLIC_FACEBOOK_PIXEL_ID in Amplify environment variables.",
      );
      return;
    }

    facebookPixel.init(pixelId);
  }, [pixelId]);

  useEffect(() => {
    if (!pixelId) return;

    // Emitir evento ViewContent cuando cambia la ruta
    const eventSourceUrl = `${window.location.origin}${pathname}`;
    const meta = getPageMetadataForPath(pathname);

    // Emitir evento ViewContent
    facebookPixel.emitEvent({
      eventName: "ViewContent",
      eventSourceUrl,
      customData: {
        content_name: meta.contentName,
        content_category: meta.contentCategory,
        page_type: meta.pageType,
        currency: "COP",
        sede: meta.sede,
      },
    });
  }, [pathname, pixelId]);

  return null; // Este componente no renderiza nada
}
