import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject,
  ViewChild,
  ElementRef,
  QueryList,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AssetsPipePipe } from '../../pipes/assets-pipe.pipe';
import { SeoService } from '../../services/seo.service';
import { environment } from '../../../environments/environment';

// Interfaces
interface ImagenBeneficio {
  src: string;
  alt: string;
  descripcion: string;
}

interface BeneficioTratamiento {
  problema: string;
  solucion: string;
  descripcion: string;
  keywords: string[];
  imagenes: ImagenBeneficio[];
  currentImageIndex?: number;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-casos-reales',
  standalone: true,
  imports: [CommonModule, AssetsPipePipe],
  templateUrl: './casos-reales.component.html',
  styleUrl: './casos-reales.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasosRealesComponent implements OnInit, OnDestroy {
  private autoRotateInterval?: number;
  @ViewChild('carouselContainer', { static: false })
  carouselContainer?: ElementRef;

  constructor(
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.seoService.setCasosRealesMeta();
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }

  // Información de contacto
  contactInfo = {
    whatsapp: environment.whatsappLink,
    instagram: environment.instagramLink,
    booking: environment.bookingLink,
  };

  // Beneficios de los tratamientos - Cómo impactan la vida de las pacientes
  beneficiosTratamientos: BeneficioTratamiento[] = [
    {
      problema: 'Piel deshidratada y sin vida',
      solucion: 'Piel más hidratada y radiante',
      descripcion:
        'Nuestras pacientes experimentan una transformación inmediata desde la primera sesión. La piel recupera su humedad natural, devolviéndole su brillo y vitalidad.',
      keywords: [
        'piel deshidratada',
        'hidratación facial',
        'piel seca',
        'tratamiento hidratante',
        'piel sin vida',
      ],
      imagenes: [
        {
          src: 'images/instagram/16-revitalizacion-facial.jpg',
          alt: 'Revitalización facial - Antes y después',
          descripcion: 'Transformación de piel deshidratada a radiante',
        },
        {
          src: 'images/instagram/23-tratamiento-revitalizador.jpg',
          alt: 'Tratamiento revitalizador - Resultados',
          descripcion: 'Hidratación profunda y restauración del brillo natural',
        },
      ],
    },
    {
      problema: 'Acné persistente y poros obstruidos',
      solucion: 'Acné desincrustado y poros limpios',
      descripcion:
        'La limpieza profunda elimina impurezas acumuladas, reduce la inflamación y previene futuros brotes. Nuestras pacientes ven resultados desde la primera sesión.',
      keywords: [
        'acné',
        'poros obstruidos',
        'limpieza facial',
        'tratamiento antiacné',
        'acné persistente',
      ],
      imagenes: [
        {
          src: 'images/instagram/17-acne-puntos-negros-comedones.jpg',
          alt: 'Acné y puntos negros - Antes y después',
          descripcion: 'Eliminación efectiva de acné y comedones',
        },
        {
          src: 'images/instagram/15-limpieza-de-poros.jpg',
          alt: 'Limpieza de poros - Resultados',
          descripcion: 'Poros limpios y libres de impurezas',
        },
        {
          src: 'images/instagram/5-limpieza-poros.jpg',
          alt: 'Limpieza profunda de poros',
          descripcion: 'Desincrustación completa de poros obstruidos',
        },
      ],
    },
    {
      problema: 'Acné severo y cicatrices',
      solucion: 'Disminución del acné severo y mejora de cicatrices',
      descripcion:
        'Protocolos especializados que combaten el acné severo y mejoran significativamente la apariencia de cicatrices existentes.',
      keywords: [
        'acné severo',
        'cicatrices de acné',
        'tratamiento acné',
        'reparación de piel',
        'acné grave',
      ],
      imagenes: [
        {
          src: 'images/instagram/26-acne-severo-microneedling.jpg',
          alt: 'Acné severo - Microneedling - Antes y después',
          descripcion: 'Tratamiento especializado para acné severo',
        },
        {
          src: 'images/instagram/25-limpieza-facial-glow-skin.jpg',
          alt: 'Limpieza facial Glow Skin - Resultados',
          descripcion: 'Mejora significativa del acné severo',
        },
      ],
    },
    {
      problema: 'Líneas de expresión y arrugas',
      solucion: 'Reducción de líneas de expresión',
      descripcion:
        'Tratamientos anti-edad que suavizan líneas finas y restauran la firmeza natural de la piel, devolviendo la juventud.',
      keywords: [
        'líneas de expresión',
        'arrugas',
        'anti-edad',
        'rejuvenecimiento facial',
        'firmeza facial',
      ],
      imagenes: [
        {
          src: 'images/instagram/12-rejuvenecimiento-extremo.jpg',
          alt: 'Rejuvenecimiento extremo - Antes y después',
          descripcion: 'Reducción notable de líneas de expresión',
        },
        {
          src: 'images/instagram/10-tratamiento-anti-edad.mp4',
          alt: 'Tratamiento anti-edad - Video',
          descripcion: 'Proceso de rejuvenecimiento facial',
        },
      ],
    },
    {
      problema: 'Manchas y hiperpigmentación',
      solucion: 'Tono de piel uniforme y luminoso',
      descripcion:
        'Despigmentación efectiva que unifica el tono de la piel y restaura su luminosidad natural, eliminando manchas.',
      keywords: [
        'manchas',
        'hiperpigmentación',
        'tono de piel',
        'despigmentación',
        'manchas faciales',
      ],
      imagenes: [
        {
          src: 'images/instagram/28-tratamiento-anti-manchas.jpg',
          alt: 'Tratamiento anti-manchas - Antes y después',
          descripcion: 'Eliminación efectiva de manchas faciales',
        },
        {
          src: 'images/instagram/6-eliminar-manchas.jpg',
          alt: 'Eliminar manchas - Resultados',
          descripcion: 'Tono de piel uniforme y luminoso',
        },
        {
          src: 'images/instagram/7-manchas-acne.jpg',
          alt: 'Manchas de acné - Antes y después',
          descripcion: 'Despigmentación de manchas post-acné',
        },
      ],
    },
    {
      problema: 'Piel opaca y sin brillo',
      solucion: 'Piel luminosa y con glow natural',
      descripcion:
        'Tratamientos que devuelven el brillo natural a tu piel, creando un efecto glow duradero y radiante.',
      keywords: [
        'piel opaca',
        'glow facial',
        'luminosidad',
        'brillo natural',
        'piel sin brillo',
      ],
      imagenes: [
        {
          src: 'images/instagram/24-limpieza-facial-profunda-glow-skin.jpg',
          alt: 'Limpieza facial profunda Glow Skin - Antes y después',
          descripcion: 'Transformación de piel opaca a radiante',
        },
        {
          src: 'images/instagram/18-limpieza-facial-glow-skin.jpg',
          alt: 'Limpieza facial Glow Skin - Resultados',
          descripcion: 'Efecto glow natural y duradero',
        },
      ],
    },
    {
      problema: 'Poros dilatados y textura irregular',
      solucion: 'Poros más pequeños y textura suave',
      descripcion:
        'Refinamiento de la textura de la piel y reducción visible del tamaño de los poros para una piel más suave.',
      keywords: [
        'poros dilatados',
        'textura irregular',
        'refinamiento facial',
        'poros pequeños',
        'textura suave',
      ],
      imagenes: [
        {
          src: 'images/instagram/4-puntos-negros-nariz.jpg',
          alt: 'Puntos negros nariz - Antes y después',
          descripcion: 'Reducción visible del tamaño de poros',
        },
        {
          src: 'images/instagram/3-puntos-negros-nariz.jpg',
          alt: 'Puntos negros nariz - Resultados',
          descripcion: 'Textura suave y poros refinados',
        },
        {
          src: 'images/instagram/2-puntos-negros-nariz.jpg',
          alt: 'Limpieza de puntos negros',
          descripcion: 'Eliminación completa de puntos negros',
        },
      ],
    },
    {
      problema: 'Piel sensible e irritada',
      solucion: 'Piel calmada y fortalecida',
      descripcion:
        'Tratamientos suaves que calman la irritación y fortalecen la barrera cutánea, protegiendo la piel.',
      keywords: [
        'piel sensible',
        'irritación',
        'calmante facial',
        'barrera cutánea',
        'piel irritada',
      ],
      imagenes: [
        {
          src: 'images/instagram/14-limpieza-facial-profunda.jpg',
          alt: 'Limpieza facial profunda - Antes y después',
          descripcion: 'Tratamiento suave para piel sensible',
        },
        {
          src: 'images/instagram/19-limpieza-facial-glow-skin-antes.jpg',
          alt: 'Limpieza facial Glow Skin - Antes',
          descripcion: 'Calma la irritación y fortalece la barrera',
        },
      ],
    },
    {
      problema: 'Pérdida de firmeza y elasticidad',
      solucion: 'Piel más firme y elástica',
      descripcion:
        'Tratamientos que restauran la firmeza natural y mejoran la elasticidad de la piel, devolviendo la juventud.',
      keywords: [
        'pérdida de firmeza',
        'elasticidad',
        'firmeza facial',
        'reafirmante',
        'piel flácida',
      ],
      imagenes: [
        {
          src: 'images/instagram/22-rejuvenecimiento-extremo-despues.mp4',
          alt: 'Rejuvenecimiento extremo - Después',
          descripcion: 'Restauración de firmeza y elasticidad',
        },
        {
          src: 'images/instagram/21-rejuvenecimiento-extremo-antes.mp4',
          alt: 'Rejuvenecimiento extremo - Antes',
          descripcion: 'Proceso de reafirmación facial',
        },
      ],
    },
    {
      problema: 'Estrés oxidativo y envejecimiento prematuro',
      solucion: 'Piel rejuvenecida y protegida',
      descripcion:
        'Antioxidantes y tratamientos que combaten el envejecimiento prematuro y protegen la piel de daños futuros.',
      keywords: [
        'estrés oxidativo',
        'envejecimiento prematuro',
        'antioxidantes',
        'protección facial',
        'rejuvenecimiento',
      ],
      imagenes: [
        {
          src: 'images/instagram/13-antioxpeelpro.mp4',
          alt: 'Antioxpeelpro - Tratamiento antioxidante',
          descripcion: 'Protección contra el estrés oxidativo',
        },
        {
          src: 'images/instagram/27-reduccion-de-manchas.mp4',
          alt: 'Reducción de manchas - Video',
          descripcion: 'Antioxidantes para rejuvenecimiento',
        },
      ],
    },
  ];

  // Métodos para los carruseles individuales de las cards
  getCurrentImageIndex(beneficio: BeneficioTratamiento): number {
    return beneficio.currentImageIndex || 0;
  }

  nextCardImage(beneficio: BeneficioTratamiento) {
    if (!beneficio.currentImageIndex) beneficio.currentImageIndex = 0;
    const totalImages = beneficio.imagenes.length + 1; // +1 para la imagen CTA
    beneficio.currentImageIndex =
      (beneficio.currentImageIndex + 1) % totalImages;

    // Auto-play video if the new slide contains a video
    this.autoPlayVideoOnSlideChange(beneficio);
  }

  previousCardImage(beneficio: BeneficioTratamiento) {
    if (!beneficio.currentImageIndex) beneficio.currentImageIndex = 0;
    const totalImages = beneficio.imagenes.length + 1; // +1 para la imagen CTA
    beneficio.currentImageIndex =
      beneficio.currentImageIndex === 0
        ? totalImages - 1
        : beneficio.currentImageIndex - 1;

    // Auto-play video if the new slide contains a video
    this.autoPlayVideoOnSlideChange(beneficio);
  }

  setCardImageIndex(beneficio: BeneficioTratamiento, index: number) {
    beneficio.currentImageIndex = index;

    // Auto-play video if the new slide contains a video
    this.autoPlayVideoOnSlideChange(beneficio);
  }

  // Método para manejar click en video (play/pause)
  onVideoClick(
    event: Event,
    beneficio: BeneficioTratamiento,
    imageIndex: number
  ) {
    // Determinar si el click fue en el video o en el botón
    const target = event.target as HTMLElement;
    let video: HTMLVideoElement;

    if (target.tagName === 'VIDEO') {
      video = target as HTMLVideoElement;
    } else {
      // Si fue click en el botón, buscar el video en el mismo contenedor
      const videoContainer = target.closest('.video-container');
      video = videoContainer?.querySelector('video') as HTMLVideoElement;
    }

    if (video) {
      if (video.paused) {
        video.play().catch((error) => {
          console.log('Play prevented by browser:', error);
        });
      } else {
        video.pause();
      }
    }
  }

  // Método para auto-reproducir video cuando cambia el slide
  autoPlayVideoOnSlideChange(beneficio: BeneficioTratamiento) {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const currentImage =
        beneficio.imagenes[this.getCurrentImageIndex(beneficio)];
      if (currentImage && this.isVideoFile(currentImage.src)) {
        // Buscar el video en el carrusel actual
        const carouselElement = this.carouselContainer?.nativeElement;
        if (carouselElement) {
          const activeSlide = carouselElement.querySelector(
            '.carousel-item-small.active'
          );
          const videoElement = activeSlide?.querySelector(
            'video'
          ) as HTMLVideoElement;

          if (videoElement) {
            // Pausar todos los otros videos primero
            this.pauseAllVideos();

            // Intentar reproducir el video actual
            videoElement.play().catch((error) => {
              console.log('Auto-play prevented by browser:', error);
            });
          }
        }
      }
    }, 150); // Pequeño delay para asegurar que el DOM se ha actualizado
  }

  // Método para pausar todos los videos
  pauseAllVideos() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Pausar todos los videos en la página
    const allVideos = document.querySelectorAll(
      'video'
    ) as NodeListOf<HTMLVideoElement>;
    allVideos?.forEach((video) => {
      video.pause();
    });
  }

  // Métodos para expandir/contraer cards
  expandCard(beneficio: BeneficioTratamiento) {
    // Pausar todos los videos antes de expandir
    this.pauseAllVideos();

    // Cerrar todas las otras cards
    this.beneficiosTratamientos.forEach((b) => {
      if (b !== beneficio) {
        b.isExpanded = false;
      }
    });

    // Expandir la card seleccionada
    beneficio.isExpanded = !beneficio.isExpanded;

    // Iniciar auto-rotate si está expandida
    if (beneficio.isExpanded) {
      this.startAutoRotate(beneficio);
    } else {
      this.stopAutoRotate();
    }
  }

  startAutoRotate(beneficio: BeneficioTratamiento) {
    this.stopAutoRotate();

    if (isPlatformBrowser(this.platformId) && beneficio.imagenes.length > 1) {
      this.autoRotateInterval = window.setInterval(() => {
        this.nextCardImage(beneficio);
      }, 4000);
    }
  }

  // Método para manejar cuando termina un video
  onVideoEnded(event: Event, beneficio: BeneficioTratamiento) {
    // Si el auto-rotate está activo, continuar al siguiente slide
    if (this.autoRotateInterval) {
      this.nextCardImage(beneficio);
    }
  }

  stopAutoRotate() {
    if (isPlatformBrowser(this.platformId) && this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = undefined;
    }
  }

  // TrackBy functions para optimizar rendimiento
  trackByBeneficio(index: number, beneficio: BeneficioTratamiento): string {
    return beneficio.problema;
  }

  trackByImagen(index: number, imagen: ImagenBeneficio): string {
    return imagen.src;
  }

  trackByKeyword(index: number, keyword: string): string {
    return keyword;
  }

  // Método para detectar si un archivo es un video MP4
  isVideoFile(src: string): boolean {
    return src.toLowerCase().endsWith('.mp4');
  }
}
