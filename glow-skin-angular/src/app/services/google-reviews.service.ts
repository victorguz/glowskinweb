import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

export interface GooglePlaceDetails {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  formatted_address: string;
  formatted_phone_number?: string;
  website?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleReviewsService {
  private readonly apiKey = environment.googlePlacesApiKey;
  private readonly placeId = environment.glowSkinPlaceId;
  private readonly baseUrl = environment.googlePlacesApiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los detalles del lugar incluyendo las reviews
   */
  getPlaceDetails(): Observable<GooglePlaceDetails | null> {
    const url = `${this.baseUrl}/details/json`;
    const params = {
      place_id: this.placeId,
      fields:
        'place_id,name,rating,user_ratings_total,reviews,formatted_address,formatted_phone_number,website',
      key: this.apiKey,
    };

    return this.http.get<any>(url, { params }).pipe(
      map((response) => {
        if (response.status === 'OK' && response.result) {
          return response.result as GooglePlaceDetails;
        }
        return null;
      }),
      catchError((error) => {
        console.error('Error fetching place details:', error);
        return of(null);
      })
    );
  }

  /**
   * Obtiene solo las reviews del lugar
   */
  getReviews(): Observable<GoogleReview[]> {
    return this.getPlaceDetails().pipe(
      map((placeDetails) => placeDetails?.reviews || [])
    );
  }

  /**
   * Obtiene información básica del negocio (rating, total de reviews)
   */
  getBusinessInfo(): Observable<{
    rating: number;
    totalReviews: number;
  } | null> {
    return this.getPlaceDetails().pipe(
      map((placeDetails) => {
        if (placeDetails) {
          return {
            rating: placeDetails.rating,
            totalReviews: placeDetails.user_ratings_total,
          };
        }
        return null;
      })
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
}
