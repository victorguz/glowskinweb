import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceDetails {
  frequency?: string;
  technology?: string;
  idealFor?: string;
  activos?: string;
  includes?: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  details: ServiceDetails;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  services: Service[];
}

export interface ServicesData {
  categories: ServiceCategory[];
  contactInfo: {
    whatsapp: string;
    phone: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private servicesData: ServicesData | null = null;

  constructor(private http: HttpClient) {}

  getServices(): Observable<ServicesData> {
    return this.http.get<ServicesData>('assets/data/services.json');
  }

  getServicesData(): ServicesData | null {
    return this.servicesData;
  }

  setServicesData(data: ServicesData): void {
    this.servicesData = data;
  }

  getServiceById(serviceId: string): Service | null {
    if (!this.servicesData) return null;

    for (const category of this.servicesData.categories) {
      const service = category.services.find((s) => s.id === serviceId);
      if (service) return service;
    }
    return null;
  }

  getCategoryById(categoryId: string): ServiceCategory | null {
    if (!this.servicesData) return null;
    return (
      this.servicesData.categories.find((c) => c.id === categoryId) || null
    );
  }

  formatPrice(price: number, currency: string = 'COP'): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }
}
