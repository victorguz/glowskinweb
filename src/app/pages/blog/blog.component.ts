import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsPipePipe } from '../../pipes/assets-pipe.pipe';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, AssetsPipePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogComponent {
  // Información de contacto
  contactInfo = {
    whatsapp: 'https://wa.link/h5481r',
  };

  // Artículos del blog
  blogPosts = [
    {
      id: 1,
      title: 'Guía Completa: Cómo Preparar tu Piel para un Tratamiento Facial',
      excerpt:
        'Descubre los pasos esenciales para maximizar los resultados de tu tratamiento facial y mantener una piel saludable.',
      image: '/images/gallery/glow-skin-gallery-limpieza-facial-1.webp',
      category: 'Cuidado Facial',
      date: '15 de Enero, 2025',
      readTime: '5 min',
      featured: true,
    },
    {
      id: 2,
      title: 'Los Beneficios del Microneedling para el Rejuvenecimiento',
      excerpt:
        'Explora cómo esta técnica avanzada puede transformar tu piel y restaurar su juventud natural.',
      image: '/images/gallery/glow-skin-gallery-tratamiento-facial.webp',
      category: 'Tratamientos',
      date: '12 de Enero, 2025',
      readTime: '7 min',
      featured: false,
    },
    {
      id: 3,
      title: 'Acné Adulto: Causas y Soluciones Efectivas',
      excerpt:
        'Entiende por qué aparece el acné en la edad adulta y cómo tratarlo de manera efectiva.',
      image: '/images/gallery/glow-skin-gallery-antes-despues-1.webp',
      category: 'Problemas de Piel',
      date: '10 de Enero, 2025',
      readTime: '6 min',
      featured: false,
    },
    {
      id: 4,
      title: 'Porcelanización Facial: El Nuevo Estándar de Belleza',
      excerpt:
        'Conoce este revolucionario tratamiento que está transformando la industria de la belleza.',
      image: '/images/gallery/glow-skin-gallery-resultados-facial.webp',
      category: 'Tratamientos',
      date: '8 de Enero, 2025',
      readTime: '4 min',
      featured: false,
    },
    {
      id: 5,
      title: 'Rutina de Cuidado Facial: Mañana vs Noche',
      excerpt:
        'Aprende las diferencias clave entre tu rutina matutina y nocturna para una piel perfecta.',
      image: '/images/gallery/glow-skin-gallery-cuidado-facial.webp',
      category: 'Cuidado Facial',
      date: '5 de Enero, 2025',
      readTime: '8 min',
      featured: false,
    },
    {
      id: 6,
      title: 'Exosomas: La Revolución en Regeneración Celular',
      excerpt:
        'Descubre cómo los exosomas están revolucionando el campo de la regeneración celular.',
      image: '/images/gallery/glow-skin-gallery-extraccion-facial.webp',
      category: 'Tecnología',
      date: '3 de Enero, 2025',
      readTime: '9 min',
      featured: false,
    },
  ];

  // Categorías del blog
  categories = [
    { name: 'Todos', count: 6, active: true },
    { name: 'Cuidado Facial', count: 2, active: false },
    { name: 'Tratamientos', count: 2, active: false },
    { name: 'Problemas de Piel', count: 1, active: false },
    { name: 'Tecnología', count: 1, active: false },
  ];

  // Artículo destacado
  featuredPost = this.blogPosts.find((post) => post.featured);

  // Posts no destacados
  get nonFeaturedPosts() {
    return this.blogPosts.filter((post) => !post.featured);
  }

  // Método para filtrar por categoría
  filterByCategory(category: string) {
    this.categories.forEach((cat) => (cat.active = cat.name === category));
    // Aquí se implementaría la lógica de filtrado
  }
}
