import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsPipePipe } from '../../pipes/assets-pipe.pipe';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-casos-reales',
  standalone: true,
  imports: [CommonModule, AssetsPipePipe],
  templateUrl: './casos-reales.component.html',
  styleUrl: './casos-reales.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CasosRealesComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setCasosRealesMeta();
  }

  // Información de contacto
  contactInfo = {
    whatsapp: 'https://wa.link/h5481r',
  };

  // Casos reales con información detallada
  casosReales = [
    {
      id: 1,
      title: 'Tratamiento Anti-Acné',
      description: 'Resultado después de 3 meses de tratamiento intensivo',
      beforeImage: '/images/cases/caso-2-tratamiento-anti-acne.webp',
      afterImage: '/images/cases/caso-3-tratamiento-revitalizacion.webp',
      treatment: 'Protocolo Anti-Acné Intensivo',
      duration: '3 meses',
      results: [
        'Reducción del 90% de las lesiones',
        'Mejora significativa de la textura',
        'Eliminación de manchas post-inflamatorias',
      ],
    },
    {
      id: 2,
      title: 'Limpieza Facial Profunda',
      description: 'Transformación visible desde la primera sesión',
      beforeImage: '/images/cases/caso-1-tratamiento-anti-manchas.webp',
      afterImage: '/images/cases/caso-4-tratamiento-anti-acne.webp',
      treatment: 'Limpieza Facial Glow Skin',
      duration: '1 sesión',
      results: [
        'Piel más luminosa y radiante',
        'Poros más pequeños',
        'Mejor absorción de productos',
      ],
    },
    {
      id: 3,
      title: 'Tratamiento Anti-Manchas',
      description: 'Eliminación progresiva de hiperpigmentación',
      beforeImage: '/images/cases/caso-5-tratamiento-anti-acne-2.webp',
      afterImage: '/images/cases/caso-6-revitalizacion.webp',
      treatment: 'Protocolo Despigmentante',
      duration: '2 meses',
      results: [
        'Reducción del 80% de las manchas',
        'Tono de piel más uniforme',
        'Mejora de la luminosidad',
      ],
    },
    {
      id: 4,
      title: 'Rejuvenecimiento Facial',
      description: 'Restauración de la firmeza y elasticidad',
      beforeImage: '/images/cases/caso-1-tratamiento-anti-manchas.webp',
      afterImage: '/images/cases/caso-2-tratamiento-anti-acne.webp',
      treatment: 'Microneedling + Exosomas',
      duration: '3 sesiones',
      results: [
        'Mejora de la firmeza',
        'Reducción de líneas finas',
        'Piel más joven y saludable',
      ],
    },
    {
      id: 5,
      title: 'Porcelanización Facial',
      description: 'Efecto glow inmediato y duradero',
      beforeImage: '/images/cases/caso-3-tratamiento-revitalizacion.webp',
      afterImage: '/images/cases/caso-4-tratamiento-anti-acne.webp',
      treatment: 'Porcelanización Facial',
      duration: '1 sesión',
      results: [
        'Piel porcelana inmediata',
        'Efecto glow natural',
        'Duración de hasta 2 semanas',
      ],
    },
    {
      id: 6,
      title: 'Tratamiento Regenerativo',
      description: 'Reparación de cicatrices y textura',
      beforeImage: '/images/cases/caso-5-tratamiento-anti-acne-2.webp',
      afterImage: '/images/cases/caso-6-revitalizacion.webp',
      treatment: 'Tratamiento Regenerative +',
      duration: '4 meses',
      results: [
        'Mejora de cicatrices',
        'Textura más suave',
        'Regeneración celular',
      ],
    },
  ];

  // Estadísticas de resultados
  estadisticas = [
    {
      number: '95%',
      description: 'de pacientes ven resultados desde la primera sesión',
    },
    {
      number: '500+',
      description: 'tratamientos exitosos realizados',
    },
    {
      number: '4.9',
      description: 'calificación promedio en Google Reviews',
    },
    {
      number: '100%',
      description: 'satisfacción garantizada',
    },
  ];

  // Testimonios de pacientes
  testimonios = [
    {
      name: 'María G.',
      treatment: 'Limpieza Facial Glow Skin',
      text: 'Increíble el cambio desde la primera sesión. Mi piel se ve más radiante y saludable.',
      rating: 5,
    },
    {
      name: 'Ana L.',
      treatment: 'Tratamiento Anti-Acné',
      text: 'Después de 3 meses, mi acné mejoró significativamente. Sofia es una profesional excelente.',
      rating: 5,
    },
    {
      name: 'Carolina R.',
      treatment: 'Porcelanización Facial',
      text: 'El efecto glow es real y duradero. Me encanta cómo se ve mi piel después del tratamiento.',
      rating: 5,
    },
  ];
}
