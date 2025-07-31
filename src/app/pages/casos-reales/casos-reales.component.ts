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

  // Casos reales organizados por número de caso y tratamiento específico
  beneficiosTratamientos: BeneficioTratamiento[] = [
    {
      problema: 'Comedones profundos y puntos negros obstinados',
      solucion: 'Piel completamente limpia y descargada',
      descripcion:
        'Paciente con comedones profundos, puntos negros obstinados y acné incrustado. A través de nuestra limpieza facial profunda Glow Skin, logramos extraer todas las impurezas, descargando completamente su piel y devolviéndole su suavidad natural.',
      keywords: [
        'limpieza facial profunda',
        'comedones',
        'puntos negros',
        'acné incrustado',
        'extracción facial',
        'descarga de piel',
      ],
      imagenes: [
        {
          src: 'images/instagram/1-puntos-negros-nariz.jpg',
          alt: 'Caso 1 - Puntos negros nariz - Antes',
          descripcion: 'Antes: Comedones profundos y puntos negros obstinados',
        },
        {
          src: 'images/instagram/2-puntos-negros-nariz.jpg',
          alt: 'Caso 1 - Puntos negros nariz - Durante',
          descripcion: 'Durante: Proceso de extracción cuidadosa',
        },
        {
          src: 'images/instagram/3-puntos-negros-nariz.jpg',
          alt: 'Caso 1 - Puntos negros nariz - Después',
          descripcion: 'Después: Piel completamente limpia y descargada',
        },
        {
          src: 'images/instagram/4-puntos-negros-nariz.jpg',
          alt: 'Caso 1 - Puntos negros nariz - Resultado final',
          descripcion: 'Resultado: Piel suave, lisa y sin impurezas',
        },
      ],
    },
    {
      problema: 'Congestión facial severa con poros obstruidos',
      solucion: 'Poros limpios y piel descongestionada',
      descripcion:
        'Paciente con congestión facial severa y poros completamente obstruidos. Nuestro tratamiento de limpieza de poros logró desincrustar completamente todas las impurezas, devolviendo la suavidad a su piel.',
      keywords: [
        'limpieza de poros',
        'congestión facial',
        'poros obstruidos',
        'desincrustación',
        'inflamación facial',
        'sensibilidad',
      ],
      imagenes: [
        {
          src: 'images/instagram/5-limpieza-poros.jpg',
          alt: 'Caso 2 - Limpieza de poros - Antes y después',
          descripcion:
            'Transformación completa: de poros obstruidos a piel limpia',
        },
      ],
    },
    {
      problema: 'Manchas faciales y tono irregular',
      solucion: 'Tono de piel uniforme y luminoso',
      descripcion:
        'Paciente con manchas faciales y tono irregular. A través de nuestro tratamiento especializado para eliminar manchas, logramos unificar completamente el tono de su piel, devolviéndole su luminosidad natural.',
      keywords: [
        'manchas faciales',
        'hiperpigmentación',
        'eliminar manchas',
        'tono uniforme',
        'luminosidad',
        'autoestima',
      ],
      imagenes: [
        {
          src: 'images/instagram/6-eliminar-manchas.jpg',
          alt: 'Caso 3 - Eliminar manchas - Antes y después',
          descripcion:
            'Resultado: Tono de piel completamente uniforme y luminoso',
        },
      ],
    },
    {
      problema: 'Manchas oscuras post-acné y cicatrices pigmentadas',
      solucion: 'Despigmentación efectiva y piel renovada',
      descripcion:
        'Paciente con manchas oscuras post-acné y cicatrices pigmentadas. Nuestro tratamiento especializado logró eliminar completamente las manchas post-acné, devolviéndole una piel limpia, uniforme y renovada.',
      keywords: [
        'manchas post-acné',
        'cicatrices pigmentadas',
        'despigmentación',
        'manchas oscuras',
        'piel renovada',
        'complejos',
      ],
      imagenes: [
        {
          src: 'images/instagram/7-manchas-acne.jpg',
          alt: 'Caso 4 - Manchas acné - Antes y después',
          descripcion: 'Antes: Manchas oscuras post-acné',
        },
        {
          src: 'images/instagram/8-manchas-acne.mp4',
          alt: 'Caso 4 - Manchas acné - Proceso',
          descripcion: 'Durante: Proceso de despigmentación',
        },
        {
          src: 'images/instagram/9-manchas-acne.mp4',
          alt: 'Caso 4 - Manchas acné - Resultado',
          descripcion: 'Después: Piel completamente renovada y uniforme',
        },
      ],
    },
    {
      problema: 'Signos evidentes de envejecimiento y pérdida de firmeza',
      solucion: 'Piel rejuvenecida y firme',
      descripcion:
        'Paciente con signos evidentes de envejecimiento y pérdida de firmeza. A través de nuestro tratamiento anti-edad especializado, logramos restaurar la firmeza de su piel, reduciendo líneas de expresión y devolviéndole su juventud natural.',
      keywords: [
        'envejecimiento',
        'pérdida de firmeza',
        'tratamiento anti-edad',
        'líneas de expresión',
        'rejuvenecimiento',
        'firmeza facial',
      ],
      imagenes: [
        {
          src: 'images/instagram/10-tratamiento-anti-edad.mp4',
          alt: 'Caso 5 - Tratamiento anti-edad - Proceso completo',
          descripcion: 'Proceso completo de rejuvenecimiento facial',
        },
      ],
    },
    {
      problema: 'Piel congestionada, opaca y sin luminosidad',
      solucion: 'Piel descargada y con glow natural',
      descripcion:
        'Paciente con piel completamente congestionada, opaca y sin luminosidad. Nuestra limpieza facial con efecto descarga logró eliminar todas las impurezas acumuladas, devolviéndole el brillo natural y un efecto glow duradero.',
      keywords: [
        'piel congestionada',
        'sin luminosidad',
        'efecto descarga',
        'glow natural',
        'brillo facial',
        'transformación',
      ],
      imagenes: [
        {
          src: 'images/instagram/11-limpieza-facial.mp4',
          alt: 'Caso 6 - Limpieza facial efecto descarga - Proceso',
          descripcion: 'Proceso de descarga completa y efecto glow',
        },
      ],
    },
    {
      problema: 'Pérdida de juventud y firmeza facial',
      solucion: 'Rejuvenecimiento extremo y restauración de firmeza',
      descripcion:
        'Paciente con pérdida significativa de firmeza y juventud facial. A través de nuestro tratamiento de rejuvenecimiento extremo, logramos restaurar completamente la firmeza de su piel, devolviéndole su juventud natural.',
      keywords: [
        'pérdida de juventud',
        'firmeza facial',
        'rejuvenecimiento extremo',
        'restauración',
        'autoestima',
        'juventud natural',
      ],
      imagenes: [
        {
          src: 'images/instagram/12-rejuvenecimiento-extremo.jpg',
          alt: 'Caso 7 - Rejuvenecimiento extremo - Antes y después',
          descripcion:
            'Transformación completa: restauración de juventud y firmeza',
        },
        {
          src: 'images/instagram/21-rejuvenecimiento-extremo-antes.mp4',
          alt: 'Caso 7 - Rejuvenecimiento extremo - Antes',
          descripcion: 'Antes: Piel con pérdida de firmeza',
        },
        {
          src: 'images/instagram/22-rejuvenecimiento-extremo-despues.mp4',
          alt: 'Caso 7 - Rejuvenecimiento extremo - Después',
          descripcion: 'Después: Piel completamente rejuvenecida y firme',
        },
      ],
    },
    {
      problema: 'Estrés oxidativo y envejecimiento prematuro',
      solucion: 'Protección antioxidante y rejuvenecimiento',
      descripcion:
        'Paciente con estrés oxidativo y envejecimiento prematuro. Nuestro tratamiento Antioxpeelpro logró combatir efectivamente los radicales libres, protegiendo su piel del envejecimiento prematuro y devolviéndole su vitalidad natural.',
      keywords: [
        'estrés oxidativo',
        'envejecimiento prematuro',
        'antioxidantes',
        'radicales libres',
        'protección facial',
        'vitalidad',
      ],
      imagenes: [
        {
          src: 'images/instagram/13-antioxpeelpro.mp4',
          alt: 'Caso 8 - Antioxpeelpro - Tratamiento antioxidante',
          descripcion: 'Proceso de protección antioxidante y rejuvenecimiento',
        },
      ],
    },
    {
      problema: 'Piel extremadamente sensible e irritada',
      solucion: 'Piel calmada y fortalecida',
      descripcion:
        'Paciente con piel extremadamente sensible e irritada. Nuestro tratamiento suave logró calmar completamente la irritación, fortalecer su barrera cutánea y devolverle la salud a su piel.',
      keywords: [
        'piel sensible',
        'irritación',
        'dolor facial',
        'calmante',
        'barrera cutánea',
        'comodidad',
      ],
      imagenes: [
        {
          src: 'images/instagram/14-limpieza-facial-profunda.jpg',
          alt: 'Caso 9 - Limpieza facial profunda - Antes y después',
          descripcion: 'Transformación: de piel irritada a calmada y saludable',
        },
        {
          src: 'images/instagram/19-limpieza-facial-glow-skin-antes.jpg',
          alt: 'Caso 9 - Limpieza facial Glow Skin - Antes',
          descripcion: 'Antes: Piel sensible e irritada',
        },
        {
          src: 'images/instagram/20-limpieza-facial-glow-skin-despues.mp4',
          alt: 'Caso 9 - Limpieza facial Glow Skin - Después',
          descripcion: 'Después: Piel completamente calmada y fortalecida',
        },
      ],
    },
    {
      problema: 'Acné severo con comedones profundos',
      solucion: 'Acné controlado y piel limpia',
      descripcion:
        'Paciente con acné severo y comedones profundos. Nuestro tratamiento especializado logró controlar completamente el acné, eliminar los comedones y devolverle una piel limpia y saludable.',
      keywords: [
        'acné severo',
        'comedones profundos',
        'dolor facial',
        'inflamación',
        'control acné',
        'autoestima',
      ],
      imagenes: [
        {
          src: 'images/instagram/17-acne-puntos-negros-comedones.jpg',
          alt: 'Caso 10 - Acné y comedones - Antes y después',
          descripcion: 'Transformación completa: control del acné severo',
        },
      ],
    },
    {
      problema: 'Piel deshidratada, opaca y sin vida',
      solucion: 'Piel hidratada y revitalizada',
      descripcion:
        'Paciente con piel completamente deshidratada, opaca y sin vida. Nuestro tratamiento revitalizador logró restaurar completamente la hidratación de su piel, devolviéndole su brillo natural y vitalidad.',
      keywords: [
        'piel deshidratada',
        'sin vida',
        'hidratación',
        'revitalización',
        'brillo natural',
        'vitalidad',
      ],
      imagenes: [
        {
          src: 'images/instagram/16-revitalizacion-facial.jpg',
          alt: 'Caso 11 - Revitalización facial - Antes y después',
          descripcion:
            'Transformación: de piel deshidratada a hidratada y vital',
        },
        {
          src: 'images/instagram/23-tratamiento-revitalizador.jpg',
          alt: 'Caso 11 - Tratamiento revitalizador - Resultados',
          descripcion: 'Resultado: Piel completamente hidratada y revitalizada',
        },
      ],
    },
    {
      problema: 'Poros extremadamente dilatados y textura irregular',
      solucion: 'Poros refinados y textura suave',
      descripcion:
        'Paciente con poros extremadamente dilatados y textura irregular. Nuestro tratamiento de refinamiento logró reducir visiblemente el tamaño de los poros y suavizar completamente la textura de su piel.',
      keywords: [
        'poros dilatados',
        'textura irregular',
        'refinamiento',
        'poros pequeños',
        'textura suave',
        'apariencia',
      ],
      imagenes: [
        {
          src: 'images/instagram/15-limpieza-de-poros.jpg',
          alt: 'Caso 12 - Limpieza de poros - Antes y después',
          descripcion:
            'Resultado: Poros refinados y textura completamente suave',
        },
      ],
    },
    {
      problema: 'Piel completamente opaca y sin glow',
      solucion: 'Piel luminosa con glow natural',
      descripcion:
        'Paciente con piel completamente opaca y sin glow. Nuestra limpieza facial profunda Glow Skin logró devolverle el brillo natural a su piel, creando un efecto glow duradero y radiante.',
      keywords: [
        'piel opaca',
        'sin glow',
        'luminosidad',
        'glow natural',
        'brillo facial',
        'confianza',
      ],
      imagenes: [
        {
          src: 'images/instagram/18-limpieza-facial-glow-skin.jpg',
          alt: 'Caso 13 - Limpieza facial Glow Skin - Antes y después',
          descripcion: 'Transformación: de piel opaca a luminosa con glow',
        },
        {
          src: 'images/instagram/24-limpieza-facial-profunda-glow-skin.jpg',
          alt: 'Caso 13 - Limpieza facial profunda Glow Skin - Resultados',
          descripcion:
            'Resultado: Piel completamente luminosa con glow natural',
        },
      ],
    },
    {
      problema: 'Acné severo sin respuesta a tratamientos convencionales',
      solucion: 'Acné controlado y piel renovada',
      descripcion:
        'Paciente con acné severo que no respondía a tratamientos convencionales. A través de nuestro tratamiento combinado con microneedling, logramos controlar completamente el acné, renovar su piel.',
      keywords: [
        'acné severo',
        'microneedling',
        'tratamiento combinado',
        'renovación facial',
        'control acné',
        'confianza',
      ],
      imagenes: [
        {
          src: 'images/instagram/26-acne-severo-microneedling.jpg',
          alt: 'Caso 14 - Acné severo microneedling - Antes y después',
          descripcion:
            'Transformación completa: control del acné severo con microneedling',
        },
      ],
    },
    {
      problema: 'Manchas persistentes y tono irregular',
      solucion: 'Tono uniforme y piel luminosa',
      descripcion:
        'Paciente con manchas persistentes y tono irregular. Nuestro tratamiento especializado logró eliminar completamente las manchas, unificar el tono de su piel y devolverle su luminosidad natural.',
      keywords: [
        'manchas persistentes',
        'tono irregular',
        'tratamiento especializado',
        'tono uniforme',
        'luminosidad',
        'frustración',
      ],
      imagenes: [
        {
          src: 'images/instagram/28-tratamiento-anti-manchas.jpg',
          alt: 'Caso 15 - Tratamiento anti-manchas - Antes y después',
          descripcion: 'Resultado: Tono completamente uniforme y piel luminosa',
        },
        {
          src: 'images/instagram/27-reduccion-de-manchas.mp4',
          alt: 'Caso 15 - Reducción de manchas - Proceso',
          descripcion:
            'Proceso de eliminación completa de manchas persistentes',
        },
      ],
    },
  ];

  // Métodos para los carruseles individuales de las cards
  getCurrentImageIndex(beneficio: BeneficioTratamiento): number {
    return beneficio.currentImageIndex || 0;
  }

  nextCardImage(beneficio: BeneficioTratamiento) {
    // Solo permitir navegación si la card está expandida
    if (!beneficio.isExpanded) return;

    if (!beneficio.currentImageIndex) beneficio.currentImageIndex = 0;
    const totalImages = beneficio.imagenes.length + 1; // +1 para la imagen CTA
    beneficio.currentImageIndex =
      (beneficio.currentImageIndex + 1) % totalImages;

    // Auto-play video if the new slide contains a video
    this.autoPlayVideoOnSlideChange(beneficio);
  }

  previousCardImage(beneficio: BeneficioTratamiento) {
    // Solo permitir navegación si la card está expandida
    if (!beneficio.isExpanded) return;

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
    // Solo permitir cambio de imagen si la card está expandida
    if (!beneficio.isExpanded) return;

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

    // Si se está expandiendo, reproducir video automáticamente si existe
    if (beneficio.isExpanded) {
      this.startAutoRotate(beneficio);

      // Reproducir video automáticamente si la imagen actual es un video
      setTimeout(() => {
        const currentImage =
          beneficio.imagenes[this.getCurrentImageIndex(beneficio)];
        if (currentImage && this.isVideoFile(currentImage.src)) {
          this.autoPlayVideoOnSlideChange(beneficio);
        }
      }, 150);
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
