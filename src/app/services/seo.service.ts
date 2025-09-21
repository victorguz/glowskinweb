import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  // Predefined configurations for each page
  setHomeMeta() {
    this.updateMetaTags({
      title: 'Glow Skin - Limpieza Facial Profunda Barranquilla | Sofia Nieto',
      description:
        'Clínica de estética facial en Barranquilla. Limpieza facial profunda, rejuvenecimiento facial, tratamientos anti-acné y peeling químico. Consulta con Sofia Nieto.',
      keywords:
        'limpieza facial barranquilla, estética facial barranquilla, limpieza facial profunda, rejuvenecimiento facial, sofia nieto barranquilla, tratamientos faciales barranquilla',
      url: 'https://glowskinbq.com',
    });
  }

  setNosotrosMeta() {
    this.updateMetaTags({
      title: 'Sobre Nosotros - Glow Skin Barranquilla | Sofia Nieto',
      description:
        'Conoce a Sofia Nieto, especialista en estética facial en Barranquilla. Más de 5 años de experiencia en tratamientos faciales.',
      keywords:
        'sofia nieto barranquilla, especialista estética facial, tratamientos faciales',
      url: 'https://glowskinbq.com/nosotros',
    });
  }

  setPreciosMeta() {
    this.updateMetaTags({
      title: 'Precios Limpieza Facial Barranquilla - Glow Skin | Sofia Nieto',
      description:
        'Consulta precios de limpieza facial profunda, rejuvenecimiento facial y tratamientos estéticos en Barranquilla. Servicios de estética facial con Sofia Nieto.',
      keywords:
        'precio limpieza facial barranquilla, precios estética facial barranquilla, limpieza facial profunda precio, rejuvenecimiento facial precio, tratamientos faciales barranquilla',
      url: 'https://glowskinbq.com/precios',
    });
  }

  setBlogMeta() {
    this.updateMetaTags({
      title: 'Blog - Glow Skin Barranquilla | Consejos de Estética Facial',
      description:
        'Blog con consejos y artículos sobre estética facial, tratamientos y cuidado de la piel. Información actualizada por Sofia Nieto.',
      keywords:
        'blog estética facial, consejos cuidado piel, tratamientos faciales',
      url: 'https://glowskinbq.com/blog',
    });
  }

  setCasosRealesMeta() {
    this.updateMetaTags({
      title: 'Antes y Después - Limpieza Facial Barranquilla | Glow Skin',
      description:
        'Casos reales de limpieza facial profunda y rejuvenecimiento facial en Barranquilla. Ver resultados antes y después de tratamientos estéticos con Sofia Nieto.',
      keywords:
        'antes después limpieza facial barranquilla, casos reales estética facial, resultados tratamientos faciales, limpieza facial profunda resultados',
      url: 'https://glowskinbq.com/casos-reales',
    });
  }

  setAgendarMeta() {
    this.updateMetaTags({
      title: 'Agendar Cita - Glow Skin Barranquilla | Reserva tu Tratamiento',
      description:
        'Agendar ahora para tratamientos faciales en Glow Skin Barranquilla. Reserva online con Sofia Nieto.',
      keywords:
        'agendar cita estética facial, reserva tratamientos, cita sofia nieto',
      url: 'https://glowskinbq.com/agendar',
    });
  }

  setLimpiezaFacialMeta() {
    this.updateMetaTags({
      title: 'Limpieza Facial Profunda Barranquilla - Glow Skin | Sofia Nieto',
      description:
        'Limpieza facial profunda en Barranquilla con tecnología avanzada. Vapor ozono, espátula ultrasónica y alta frecuencia. Purifica, equilibra y revitaliza tu piel con Sofia Nieto.',
      keywords:
        'limpieza facial profunda barranquilla, limpieza facial barranquilla, higiene facial barranquilla, vapor ozono, espátula ultrasónica, alta frecuencia, sofia nieto, glow skin, tratamientos faciales barranquilla, limpieza facial anti acne, purificación facial',
      url: 'https://glowskinbq.com/limpieza-facial',
    });
  }

  setLimpiezaFacialAntiAcneMeta() {
    this.updateMetaTags({
      title: 'Limpieza Facial Anti-Acné Barranquilla - Glow Skin | Sofia Nieto',
      description:
        'Tratamiento especializado anti-acné en Barranquilla. Control sebáceo, reducción bacteriana y alta frecuencia. Protocolo profesional para pieles con tendencia acneica con Sofia Nieto.',
      keywords:
        'limpieza facial anti acne barranquilla, tratamiento acne barranquilla, control sebaceo, alta frecuencia acne, sofia nieto, glow skin, protocolo anti acne, tratamiento acne profesional, limpieza facial acne barranquilla, dermatologia estetica barranquilla',
      url: 'https://glowskinbq.com/limpieza-facial-anti-acne',
    });
  }

  setLimpiezaFacialPielesSensiblesMeta() {
    this.updateMetaTags({
      title:
        'Limpieza Facial Pieles Sensibles Barranquilla - Glow Skin | Sofia Nieto',
      description:
        'Tratamiento ultra-suave para pieles sensibles en Barranquilla. Protocolo hipoalergénico especializado para rosácea y piel reactiva. Técnicas delicadas con Sofia Nieto.',
      keywords:
        'limpieza facial pieles sensibles barranquilla, tratamiento piel sensible, rosacea barranquilla, piel reactiva, hipoalergenico, sofia nieto, glow skin, tratamiento suave, dermatitis barranquilla, cuidado piel delicada',
      url: 'https://glowskinbq.com/limpieza-facial-pieles-sensibles',
    });
  }

  // Enhanced meta tags update method for blog posts
  updateMetaTags(pageConfig: {
    title: string;
    description: string;
    keywords: string;
    url?: string;
    image?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogUrl?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  }) {
    // Update title
    this.title.setTitle(pageConfig.title);

    // Update basic meta tags
    this.meta.updateTag({
      name: 'description',
      content: pageConfig.description,
    });
    this.meta.updateTag({ name: 'keywords', content: pageConfig.keywords });
    this.meta.updateTag({ name: 'author', content: 'Sofia Nieto - Glow Skin' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Update Open Graph tags
    this.meta.updateTag({
      property: 'og:title',
      content: pageConfig.ogTitle || pageConfig.title,
    });
    this.meta.updateTag({
      property: 'og:description',
      content: pageConfig.ogDescription || pageConfig.description,
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({
      property: 'og:url',
      content: pageConfig.ogUrl || pageConfig.url || '',
    });
    this.meta.updateTag({
      property: 'og:image',
      content:
        pageConfig.ogImage ||
        pageConfig.image ||
        'https://glowskinbq.com/assets/images/glow-skin-logo.png',
    });
    this.meta.updateTag({ property: 'og:site_name', content: 'Glow Skin' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_CO' });

    // Update Twitter Card tags
    this.meta.updateTag({
      name: 'twitter:card',
      content: pageConfig.twitterCard || 'summary_large_image',
    });
    this.meta.updateTag({
      name: 'twitter:title',
      content: pageConfig.twitterTitle || pageConfig.title,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: pageConfig.twitterDescription || pageConfig.description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content:
        pageConfig.twitterImage ||
        pageConfig.image ||
        'https://glowskinbq.com/assets/images/glow-skin-logo.png',
    });

    // Update canonical URL
    if (pageConfig.url) {
      this.meta.updateTag({ rel: 'canonical', href: pageConfig.url });
    }
  }

  // Add structured data to the page
  addStructuredData(data: any) {
    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
}
