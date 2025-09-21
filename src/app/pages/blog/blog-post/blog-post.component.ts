import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { BLOG_POSTS, BlogPost, CONTACT_INFO } from '../../../constants/blogs';
import { AssetsPipePipe } from '../../../pipes/assets-pipe.pipe';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, AssetsPipePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | null = null;
  relatedPosts: BlogPost[] = [];
  contactInfo = CONTACT_INFO;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    // Check if blogId is provided in route data (static routes)
    const blogIdFromData = this.route.snapshot.data['blogId'];

    if (blogIdFromData) {
      // Static route with blogId in data
      this.loadPost(blogIdFromData);
    } else {
      // Dynamic route with id parameter
      this.route.params.subscribe((params) => {
        const postId = params['id'];
        this.loadPost(postId);
      });
    }
  }

  private loadPost(postId: string) {
    // Buscar el post por ID
    this.post = BLOG_POSTS.find((post) => post.id === postId) || null;

    if (!this.post) {
      // Redirigir al blog si no se encuentra el post
      this.router.navigate(['/blog']);
      return;
    }

    // Configurar SEO
    this.setSEO();

    // Cargar posts relacionados
    this.loadRelatedPosts();
  }

  private setSEO() {
    if (!this.post) return;

    // Configurar meta tags específicos del post
    this.seoService.updateMetaTags({
      title: this.post.seo.metaTitle,
      description: this.post.seo.metaDescription,
      keywords: this.post.seo.keywords.join(', '),
      ogTitle: this.post.title,
      ogDescription: this.post.excerpt,
      ogImage: this.post.image,
      ogUrl: `https://glowskinbq.com/blog/${this.post.id}`,
      twitterCard: 'summary_large_image',
      twitterTitle: this.post.title,
      twitterDescription: this.post.excerpt,
      twitterImage: this.post.image,
    });

    // Configurar datos estructurados del artículo
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: this.post.title,
      description: this.post.excerpt,
      image: `https://glowskinbq.com${this.post.image}`,
      author: {
        '@type': 'Person',
        name: this.post.author.name,
        description: this.post.author.bio,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Glow Skin BQ',
        logo: {
          '@type': 'ImageObject',
          url: 'https://glowskinbq.com/images/logo/glow-skin-logo.png',
        },
      },
      datePublished: this.formatDateForSchema(this.post.date),
      dateModified: this.formatDateForSchema(this.post.date),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://glowskinbq.com/blog/${this.post.id}`,
      },
    };

    this.seoService.addStructuredData(structuredData);
  }

  private formatDateForSchema(dateString: string): string {
    // Convertir "18 de Septiembre, 2025" a formato ISO
    const months: { [key: string]: string } = {
      enero: '01',
      febrero: '02',
      marzo: '03',
      abril: '04',
      mayo: '05',
      junio: '06',
      julio: '07',
      agosto: '08',
      septiembre: '09',
      octubre: '10',
      noviembre: '11',
      diciembre: '12',
    };

    const parts = dateString.toLowerCase().split(' ');
    if (parts.length >= 4) {
      const day = parts[0].padStart(2, '0');
      const month = months[parts[2]] || '01';
      const year = parts[3].replace(',', '');
      return `${year}-${month}-${day}`;
    }

    return new Date().toISOString().split('T')[0];
  }

  private loadRelatedPosts() {
    if (!this.post) return;

    // Buscar posts relacionados por categoría (excluyendo el actual)
    this.relatedPosts = BLOG_POSTS.filter(
      (post) =>
        post.id !== this.post!.id && post.category === this.post!.category
    ).slice(0, 3);

    // Si no hay suficientes posts de la misma categoría, agregar otros posts recientes
    if (this.relatedPosts.length < 3) {
      const additionalPosts = BLOG_POSTS.filter(
        (post) =>
          post.id !== this.post!.id &&
          !this.relatedPosts.some((related) => related.id === post.id)
      ).slice(0, 3 - this.relatedPosts.length);

      this.relatedPosts = [...this.relatedPosts, ...additionalPosts];
    }
  }

  // Método para obtener URL de post relacionado
  getPostUrl(post: BlogPost): string {
    return `/blog/${post.id}`;
  }

  // Método para compartir en redes sociales
  shareOnFacebook() {
    if (!this.post) return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  shareOnTwitter() {
    if (!this.post) return;
    const text = encodeURIComponent(this.post.title);
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  shareOnWhatsApp() {
    if (!this.post) return;
    const text = encodeURIComponent(
      `${this.post.title} - ${window.location.href}`
    );
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      // Aquí podrías mostrar un toast o notificación
      console.log('Enlace copiado al portapapeles');
    });
  }
}
