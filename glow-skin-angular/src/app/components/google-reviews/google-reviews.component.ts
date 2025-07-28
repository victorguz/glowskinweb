import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GoogleReviewsService,
  GoogleReview,
} from '../../services/google-reviews.service';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-google-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-reviews.component.html',
  styleUrl: './google-reviews.component.scss',
})
export class GoogleReviewsComponent implements OnInit, OnDestroy {
  reviews: GoogleReview[] = [];
  businessInfo: { rating: number; totalReviews: number } | null = null;
  lastScrapedDate: string = '';
  loading = true;
  error = false;
  currentReviewIndex = 0;
  autoPlay = true;
  autoPlayInterval = 5000; // 5 segundos
  isDevelopment = !environment.production;
  private subscription = new Subscription();
  private autoPlayTimer?: number;

  constructor(private googleReviewsService: GoogleReviewsService) {}

  ngOnInit() {
    this.loadReviews();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.stopAutoPlay();
  }

  private loadReviews() {
    this.loading = true;
    this.error = false;

    // Cargar reviews primero, luego la información del negocio
    this.subscription.add(
      this.googleReviewsService.getReviews().subscribe({
        next: (reviews) => {
          this.reviews = reviews;

          // Cargar información del negocio basada en las reviews
          this.subscription.add(
            this.googleReviewsService.getBusinessInfo().subscribe({
              next: (info) => {
                this.businessInfo = {
                  rating: info.rating,
                  totalReviews: info.totalReviews,
                };

                // Cargar fecha de última actualización
                this.subscription.add(
                  this.googleReviewsService.getLastScrapedDate().subscribe({
                    next: (date) => {
                      this.lastScrapedDate = date;
                      this.loading = false;
                      if (this.autoPlay && this.reviews.length > 1) {
                        this.startAutoPlay();
                      }
                    },
                    error: () => {
                      this.lastScrapedDate = 'No disponible';
                      this.loading = false;
                      if (this.autoPlay && this.reviews.length > 1) {
                        this.startAutoPlay();
                      }
                    },
                  })
                );
              },
              error: (error) => {
                console.error('Error loading business info:', error);
                // Si falla la info del negocio, usar valores por defecto
                this.businessInfo = {
                  rating: 5.0,
                  totalReviews: this.reviews.length,
                };
                this.lastScrapedDate = 'No disponible';
                this.loading = false;
                if (this.autoPlay && this.reviews.length > 1) {
                  this.startAutoPlay();
                }
              },
            })
          );
        },
        error: (error) => {
          console.error('Error loading reviews:', error);
          this.error = true;
          this.loading = false;
        },
      })
    );
  }

  // Navegación del carousel
  nextReview() {
    if (this.reviews.length > 1) {
      this.currentReviewIndex =
        (this.currentReviewIndex + 1) % this.reviews.length;
    }
  }

  prevReview() {
    if (this.reviews.length > 1) {
      this.currentReviewIndex =
        this.currentReviewIndex === 0
          ? this.reviews.length - 1
          : this.currentReviewIndex - 1;
    }
  }

  goToReview(index: number) {
    this.currentReviewIndex = index;
  }

  // AutoPlay
  private startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      this.nextReview();
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  pauseAutoPlay() {
    this.stopAutoPlay();
  }

  resumeAutoPlay() {
    if (this.autoPlay && this.reviews.length > 1) {
      this.startAutoPlay();
    }
  }

  // Eventos del mouse
  onMouseEnter() {
    this.pauseAutoPlay();
  }

  onMouseLeave() {
    this.resumeAutoPlay();
  }

  // Utilidades
  generateStars(rating: number): string {
    return this.googleReviewsService.generateStars(rating);
  }

  formatRelativeTime(relativeTime: string): string {
    return this.googleReviewsService.formatRelativeTime(relativeTime);
  }

  getAuthorInitials(authorName: string): string {
    return authorName
      .split(' ')
      .map((name) => name.charAt(0))
      .join('')
      .toUpperCase();
  }

  retry() {
    this.loadReviews();
  }

  // Getters para el template
  get currentReview(): GoogleReview | null {
    return this.reviews[this.currentReviewIndex] || null;
  }

  get hasMultipleReviews(): boolean {
    return this.reviews.length > 1;
  }
}
