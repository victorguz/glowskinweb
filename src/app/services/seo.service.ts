import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateMetaTags(pageConfig: {
    title: string;
    description: string;
    keywords: string;
    url: string;
    image?: string;
  }) {
    // Update title
    this.title.setTitle(pageConfig.title);

    // Update meta tags
    this.meta.updateTag({
      name: 'description',
      content: pageConfig.description,
    });
    this.meta.updateTag({ name: 'keywords', content: pageConfig.keywords });
    this.meta.updateTag({ name: 'author', content: 'Sofia Nieto - Glow Skin' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Update Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: pageConfig.title });
    this.meta.updateTag({
      property: 'og:description',
      content: pageConfig.description,
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: pageConfig.url });
    this.meta.updateTag({
      property: 'og:image',
      content:
        pageConfig.image ||
        'https://glowskin.com.co/assets/images/glow-skin-logo.png',
    });
    this.meta.updateTag({ property: 'og:site_name', content: 'Glow Skin' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_CO' });

    // Update Twitter Card tags
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: pageConfig.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: pageConfig.description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content:
        pageConfig.image ||
        'https://glowskin.com.co/assets/images/glow-skin-logo.png',
    });

    // Update canonical URL
    this.meta.updateTag({ rel: 'canonical', href: pageConfig.url });
  }

  // Predefined configurations for each page
  setHomeMeta() {
    this.updateMetaTags({
      title: 'Glow Skin - Limpieza Facial Profunda Barranquilla | Sofia Nieto',
      description:
        'Clínica de estética facial en Barranquilla. Limpieza facial profunda, rejuvenecimiento facial, tratamientos anti-acné y peeling químico. Consulta con Sofia Nieto.',
      keywords:
        'limpieza facial barranquilla, estética facial barranquilla, limpieza facial profunda, rejuvenecimiento facial, sofia nieto barranquilla, tratamientos faciales barranquilla',
      url: 'https://glowskin.com.co',
    });
  }

  setNosotrosMeta() {
    this.updateMetaTags({
      title: 'Sobre Nosotros - Glow Skin Barranquilla | Sofia Nieto',
      description:
        'Conoce a Sofia Nieto, especialista en estética facial en Barranquilla. Más de 5 años de experiencia en tratamientos faciales.',
      keywords:
        'sofia nieto barranquilla, especialista estética facial, tratamientos faciales',
      url: 'https://glowskin.com.co/nosotros',
    });
  }

  setPreciosMeta() {
    this.updateMetaTags({
      title: 'Precios Limpieza Facial Barranquilla - Glow Skin | Sofia Nieto',
      description:
        'Consulta precios de limpieza facial profunda, rejuvenecimiento facial y tratamientos estéticos en Barranquilla. Servicios de estética facial con Sofia Nieto.',
      keywords:
        'precio limpieza facial barranquilla, precios estética facial barranquilla, limpieza facial profunda precio, rejuvenecimiento facial precio, tratamientos faciales barranquilla',
      url: 'https://glowskin.com.co/precios',
    });
  }

  setBlogMeta() {
    this.updateMetaTags({
      title: 'Blog - Glow Skin Barranquilla | Consejos de Estética Facial',
      description:
        'Blog con consejos y artículos sobre estética facial, tratamientos y cuidado de la piel. Información actualizada por Sofia Nieto.',
      keywords:
        'blog estética facial, consejos cuidado piel, tratamientos faciales',
      url: 'https://glowskin.com.co/blog',
    });
  }

  setCasosRealesMeta() {
    this.updateMetaTags({
      title: 'Antes y Después - Limpieza Facial Barranquilla | Glow Skin',
      description:
        'Casos reales de limpieza facial profunda y rejuvenecimiento facial en Barranquilla. Ver resultados antes y después de tratamientos estéticos con Sofia Nieto.',
      keywords:
        'antes después limpieza facial barranquilla, casos reales estética facial, resultados tratamientos faciales, limpieza facial profunda resultados',
      url: 'https://glowskin.com.co/casos-reales',
    });
  }

  setAgendarMeta() {
    this.updateMetaTags({
      title: 'Agendar Cita - Glow Skin Barranquilla | Reserva tu Tratamiento',
      description:
        'Agendar ahora para tratamientos faciales en Glow Skin Barranquilla. Reserva online con Sofia Nieto.',
      keywords:
        'agendar cita estética facial, reserva tratamientos, cita sofia nieto',
      url: 'https://glowskin.com.co/agendar',
    });
  }
}
