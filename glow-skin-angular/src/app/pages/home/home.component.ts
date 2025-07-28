import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CarouselComponent,
  CarouselItem,
} from '../../components/carousel/carousel.component';
import { WhatsappWidgetComponent } from '../../components/whatsapp-widget/whatsapp-widget.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AboutSectionComponent } from '../../components/about-section/about-section.component';
import { InstagramFeedComponent } from '../../components/instagram-feed/instagram-feed.component';
import { CtaSectionComponent } from '../../components/cta-section/cta-section.component';
import {
  MetodosPropiosComponent,
  MetodoPropio,
} from '../../components/metodos-propios/metodos-propios.component';
import {
  CasosRealesComponent,
  CasoReal,
} from '../../components/casos-reales/casos-reales.component';
import { GoogleReviewsComponent } from '../../components/google-reviews/google-reviews.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    WhatsappWidgetComponent,
    FooterComponent,
    AboutSectionComponent,
    InstagramFeedComponent,
    CtaSectionComponent,
    MetodosPropiosComponent,
    CasosRealesComponent,
    GoogleReviewsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Hero Carousel Items
  heroItems: CarouselItem[] = [
    {
      id: '1',
      image: 'assets/images/hero/1-glow-skin-hero-limpieza-facial.webp',
      title: 'Glow Skin',
      description:
        'Recupera el Glow Natural de tu piel con nuestros tratamientos faciales en Barranquilla.',
      ctaText: 'Agenda una cita',
      ctaUrl: 'https://wa.link/h5481r',
      subtitle: 'Luce una piel',
    },
    {
      id: '2',
      image: 'assets/images/hero/2-glow-skin-hero-tratamiento-facial.webp',
      title: 'Limpieza Facial',
      description:
        'Tratamientos profesionales de limpieza facial para una piel radiante.',
      ctaText: 'Agenda una cita',
      ctaUrl: 'https://wa.link/h5481r',
    },
    {
      id: '3',
      image: 'assets/images/hero/3-glow-skin-hero-servicios-esteticos.webp',
      title: 'Tratamientos Especializados',
      description:
        'Microneedling, peeling químico y más para rejuvenecer tu piel.',
      ctaText: 'Agenda una cita',
      ctaUrl: 'https://wa.link/h5481r',
    },
  ];

  // Testimonials Items
  testimonialItems: CarouselItem[] = [
    {
      id: '1',
      author: 'Kristal Rendon',
      date: '2025-06-02',
      avatar: 'K',
      rating: 5,
      content:
        'Glow Skin is amazinggg & Sofia is the best! I got a facial with extractions while on vacation & my skin stayed...',
    },
    {
      id: '2',
      author: 'Wendy Ardila',
      date: '2025-06-02',
      avatar: 'assets/images/misc/glow-skin-misc-icono-1.png',
      rating: 5,
      content:
        'Recomiendo a Sofia a ojos cerrados. Llevo varios meses haciéndome la limpieza profunda y porcelanización...',
    },
    {
      id: '3',
      author: 'Libeth Nieto',
      date: '2025-05-02',
      avatar: 'L',
      rating: 5,
      content:
        'Mi mejor experiencia para el cuidado de la piel ha sido en Glow Skin. Super recomendado',
    },
  ];

  // Métodos Propios Data
  metodosPropios: MetodoPropio[] = [
    {
      id: '1',
      title: 'Limpieza Facial GlowSkin',
      description:
        'Una limpieza facial completa y profunda, con los mayores estándares de asepsia y cuidado a tu piel. Observa los cambios desde la primera sesión.',
      images: [
        {
          id: '1-1',
          src: 'assets/images/methods/1-limpieza-facial-glow-skin.jpg',
          alt: 'Limpieza facial 1',
        },
        {
          id: '1-2',
          src: 'assets/images/methods/2-limpieza-facial-glow-skin.webp',
          alt: 'Limpieza facial 2',
        },
      ],
      buttonText: 'Consultar',
      buttonUrl: '/precios',
    },
    {
      id: '2',
      title: 'Método Anti-Acné',
      description:
        'Técnica avanzada de ácidos clínicos de última generación. Un tratamiento progresivo científicamente probado para tratar el acné leve a severo.',
      images: [
        {
          id: '2-1',
          src: 'assets/images/methods/1-metodo-anti-acne.webp',
          alt: 'Anti-acné 1',
        },
        {
          id: '2-2',
          src: 'assets/images/methods/2-metodo-anti-acne.webp',
          alt: 'Anti-acné 2',
        },
      ],
      buttonText: 'Consultar',
      buttonUrl: '/precios',
    },
    {
      id: '3',
      title: 'Método Regenerativo',
      description:
        'Técnica de micropunciones de bioestimulación celular con Alta Nutrición que reconstruye los tejidos de la piel. Ideal para pieles con cicatrices leves.',
      images: [
        {
          id: '3-1',
          src: 'assets/images/methods/1-metodo-regenerativo.webp',
          alt: 'Regenerativo 1',
        },
        {
          id: '3-2',
          src: 'assets/images/methods/2-metodo-regenerativo.webp',
          alt: 'Regenerativo 2',
        },
      ],
      buttonText: 'Consultar',
      buttonUrl: '/precios',
    },
    {
      id: '4',
      title: 'Tratamiento Anti-manchas',
      description:
        'Técnica avanzada que combina Peelings de última generación con activos despigmentantes para eliminar progresivamente las manchas.',
      images: [
        {
          id: '4-1',
          src: 'assets/images/methods/1-metodo-anti-manchas.webp',
          alt: 'Anti-manchas 1',
        },
        {
          id: '4-2',
          src: 'assets/images/methods/2-metodo-anti-manchas.JPEG',
          alt: 'Anti-manchas 2',
        },
      ],
      buttonText: 'Consultar',
      buttonUrl: '/precios',
    },
  ];

  // Casos Reales Data
  casosReales: CasoReal[] = [
    {
      id: '1',
      image: 'assets/images/cases/caso-1-tratamiento-anti-manchas.webp',
      alt: 'Caso real 1 - Tratamiento anti-manchas',
    },
    {
      id: '2',
      image: 'assets/images/cases/caso-2-tratamiento-anti-acne.webp',
      alt: 'Caso real 2 - Tratamiento anti-acné',
    },
    {
      id: '3',
      image: 'assets/images/cases/caso-3-tratamiento-revitalizacion.webp',
      alt: 'Caso real 3 - Tratamiento revitalización',
    },
    {
      id: '4',
      image: 'assets/images/cases/caso-4-tratamiento-anti-acné.webp',
      alt: 'Caso real 4 - Tratamiento anti-acné',
    },
    {
      id: '5',
      image: 'assets/images/cases/caso-5-tratamiento-anti-acné2.webp',
      alt: 'Caso real 5 - Tratamiento anti-acné',
    },
    {
      id: '6',
      image: 'assets/images/cases/caso-6-revitalización.webp',
      alt: 'Caso real 6 - Revitalización',
    },
  ];

  // Instagram Feed Images
  instagramImages = [
    'assets/images/instagram/glow-skin-instagram-resultado-1.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-2.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-3.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-4.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-5.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-6.webp',
  ];

  // About Section Data
  aboutData = {
    title: 'Sobre Glow Skin',
    description:
      'Glow Skin es un espacio creado para cuidar, sanar y transformar. Aquí no solo buscamos la piel, también restauramos la confianza y el bienestar de cada uno de nuestros pacientes.',
    specialistName: 'Sofia Nieto',
    specialistTitle: 'Especialista en Cosmetología y Cosmiatría',
    specialistDescription:
      'Mi nombre es Sofia Nieto, especialista en Cosmetología y Cosmiatría, y estoy comprometida con un servicio basado en el cuidado, el conocimiento y el profesionalismo.',
    finalMessage:
      'En Glow Skin, cada tratamiento es personalizado y pensado para ayudarte a alcanzar la mejor versión de ti.',
    imageSrc: 'assets/images/sofia/sofia nieto glow skin bq.png',
    imageAlt: 'Retrato de Sofia Nieto, especialista de Glow Skin',
    reverseLayout: false,
  };

  // CTA Section Data
  ctaData = {
    title: '¿Qué esperas para devolverle el Glow a tu Piel?',
    buttonText: 'Agenda tu cita hoy',
    buttonUrl: 'https://wa.link/h5481r',
    buttonStyle: 'primary' as 'primary' | 'secondary',
    showUnderline: true,
    underlineText: 'devolverle el Glow a tu Piel',
  };
}
