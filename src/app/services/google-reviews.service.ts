import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GoogleBusinessInfo {
  name: string;
  rating: number;
  totalReviews: number;
  address: string;
  phone?: string;
  website?: string;
}

export interface GoogleReviewsData {
  business: GoogleBusinessInfo;
  reviews: GoogleReview[];
  scrapedAt: string;
  totalReviews: number;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleReviewsService {
  private readonly reviewsDataUrl = 'assets/data/google-reviews.json';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las reviews desde el archivo JSON local
   */
  getReviews(): Observable<GoogleReview[]> {
    return this.http.get<GoogleReviewsData>(this.reviewsDataUrl).pipe(
      map((data) => data.reviews || []),
      catchError((error) => {
        console.error('Error cargando reviews desde JSON:', error);
        return throwError(
          () =>
            new Error(
              'No se pudieron cargar las reviews desde el archivo local'
            )
        );
      })
    );
  }

  /**
   * Obtiene información básica del negocio desde el archivo JSON local
   */
  getBusinessInfo(): Observable<GoogleBusinessInfo> {
    return this.http.get<GoogleReviewsData>(this.reviewsDataUrl).pipe(
      map((data) => data.business),
      catchError((error) => {
        console.error('Error cargando información del negocio:', error);
        return throwError(
          () => new Error('No se pudo cargar la información del negocio')
        );
      })
    );
  }

  /**
   * Obtiene información básica del lugar sin reviews
   */
  getBasicPlaceInfo(): Observable<{
    name: string;
    rating: number;
    totalReviews: number;
  } | null> {
    return this.getBusinessInfo().pipe(
      map((info) => ({
        name: info.name,
        rating: info.rating,
        totalReviews: info.totalReviews,
      }))
    );
  }

  /**
   * Obtiene la fecha de la última actualización de los datos
   */
  getLastScrapedDate(): Observable<string> {
    return this.http.get<GoogleReviewsData>(this.reviewsDataUrl).pipe(
      map((data) => data.scrapedAt),
      catchError(() => of('No disponible'))
    );
  }

  /**
   * Formatea la fecha relativa de la review
   */
  formatRelativeTime(relativeTime: string): string {
    return relativeTime;
  }

  /**
   * Genera estrellas HTML basado en el rating
   */
  generateStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) {
      stars += '☆';
    }
    for (let i = 0; i < emptyStars; i++) {
      stars += '☆';
    }

    return stars;
  }

  /**
   * Prueba la conexión con el archivo JSON local
   */
  testApiConnection(): Observable<boolean> {
    return this.getReviews().pipe(
      map((reviews) => reviews.length > 0),
      catchError(() => of(false))
    );
  }
}
