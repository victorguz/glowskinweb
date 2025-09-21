import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BLOG_CATEGORIES, BLOG_POSTS, BlogPost, CONTACT_INFO } from '../../constants/blogs';
import { AssetsPipePipe } from '../../pipes/assets-pipe.pipe';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, AssetsPipePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setBlogMeta();
  }

  // Información de contacto
  contactInfo = CONTACT_INFO;

  // Artículos del blog desde constants
  blogPosts: BlogPost[] = BLOG_POSTS;

  // Categorías del blog desde constants
  categories = BLOG_CATEGORIES.map((cat) => ({
    ...cat,
    active: cat.id === 'todos',
  }));

  // Posts filtrados (inicialmente todos)
  filteredPosts: BlogPost[] = this.blogPosts;

  // Artículo destacado
  get featuredPost(): BlogPost | undefined {
    return this.filteredPosts.find((post) => post.featured);
  }

  // Posts no destacados
  get nonFeaturedPosts(): BlogPost[] {
    return this.filteredPosts.filter((post) => !post.featured);
  }

  // Método para filtrar por categoría
  filterByCategory(categoryId: string) {
    // Actualizar estado activo de categorías
    this.categories.forEach((cat) => (cat.active = cat.id === categoryId));

    // Filtrar posts
    if (categoryId === 'todos') {
      this.filteredPosts = this.blogPosts;
    } else {
      this.filteredPosts = this.blogPosts.filter(
        (post) =>
          post.category.toLowerCase().replace(/\s+/g, '-') === categoryId
      );
    }
  }

  // Método para obtener URL del post
  getPostUrl(post: BlogPost): string {
    return `/blog/${post.id}`;
  }
}
