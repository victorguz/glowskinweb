import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface MetodoImagen {
  id: string;
  src: string;
  alt: string;
}

export interface MetodoPropio {
  id: string;
  title: string;
  description: string;
  images: MetodoImagen[];
  buttonText: string;
  buttonUrl: string;
}

@Component({
  selector: 'app-metodos-propios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './metodos-propios.component.html',
  styleUrl: './metodos-propios.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MetodosPropiosComponent {
  @Input() title: string = 'Métodos Propios';
  @Input() subtitle: string =
    'Métodos científicamente comprobados para restaurar la piel de nuestros pacientes.';
  @Input() metodos: MetodoPropio[] = [
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

  // Carrusel para cada método
  carouselStates: { [key: string]: number } = {};

  getCurrentImage(metodo: MetodoPropio): MetodoImagen {
    const currentIndex = this.carouselStates[metodo.id] || 0;
    return metodo.images[currentIndex];
  }

  nextImage(metodo: MetodoPropio) {
    const currentIndex = this.carouselStates[metodo.id] || 0;
    this.carouselStates[metodo.id] = (currentIndex + 1) % metodo.images.length;
  }

  prevImage(metodo: MetodoPropio) {
    const currentIndex = this.carouselStates[metodo.id] || 0;
    this.carouselStates[metodo.id] =
      currentIndex === 0 ? metodo.images.length - 1 : currentIndex - 1;
  }

  hasMultipleImages(metodo: MetodoPropio): boolean {
    return metodo.images.length > 1;
  }
}
