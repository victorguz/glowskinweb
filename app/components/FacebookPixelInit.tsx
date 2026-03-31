'use client'

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { facebookPixel } from '@/lib/facebookPixel';

export function FacebookPixelInit() {
    const pathname = usePathname();

    // Obtener el Pixel ID directamente de las variables de entorno (disponible en cliente con NEXT_PUBLIC_)
    const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

    // Inicializar el Pixel una sola vez
    useEffect(() => {
        if (!pixelId) {
            console.warn('[Facebook Pixel] Pixel ID not configured. Set NEXT_PUBLIC_FACEBOOK_PIXEL_ID in Amplify environment variables.');
            return;
        }

        facebookPixel.init(pixelId);
    }, [pixelId]);

    useEffect(() => {
        if (!pixelId) return;

        // Emitir evento ViewContent cuando cambia la ruta
        const eventSourceUrl = `${window.location.origin}${pathname}`;

        // Determinar el tipo de página y nombre del contenido
        let contentName = 'Home';
        let pageType = 'home';
        let contentCategory = 'general';

        if (pathname === '/') {
            contentName = 'Página Principal';
            pageType = 'home';
            contentCategory = 'home';
        } else if (pathname === '/plan-basico') {
            contentName = 'Plan Básico';
            pageType = 'plan_page';
            contentCategory = 'plan_basico';
        } else if (pathname === '/plan-personalizado') {
            contentName = 'Plan Personalizado';
            pageType = 'plan_page';
            contentCategory = 'plan_personalizado';
        } else if (pathname === '/clase-cortesia') {
            contentName = 'Pase de Cortesía';
            pageType = 'landing_page';
            contentCategory = 'pase_cortesia';
        } else if (pathname === '/terminos') {
            contentName = 'Términos y Condiciones';
            pageType = 'legal';
            contentCategory = 'legal';
        } else if (pathname === '/privacidad') {
            contentName = 'Política de Privacidad';
            pageType = 'legal';
            contentCategory = 'legal';
        } else if (pathname === '/sedes/ciudad-jardin') {
            contentName = 'Sede Ciudad Jardín';
            pageType = 'location_page';
            contentCategory = 'sede_ciudad_jardin';
        } else if (pathname === '/sedes/san-jose') {
            contentName = 'Sede San José';
            pageType = 'location_page';
            contentCategory = 'sede_san_jose';
        }

        // Emitir evento ViewContent
        facebookPixel.emitEvent({
            eventName: 'ViewContent',
            eventSourceUrl,
            customData: {
                content_name: contentName,
                content_category: contentCategory,
                page_type: pageType,
                currency: 'COP',
                sede: pathname.includes('ciudad-jardin') ? 'ciudad-jardin' : pathname.includes('san-jose') ? 'san-jose' : undefined,
            },
        });
    }, [pathname, pixelId]);

    return null; // Este componente no renderiza nada
}
