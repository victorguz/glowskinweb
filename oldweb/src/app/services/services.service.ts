import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SERVICES_DATA } from '../constants/services';

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
  page?: any; // Dynamic page content structure
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
    booking?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private servicesData: ServicesData = SERVICES_DATA;

  constructor() {}

  getServices(): Observable<ServicesData> {
    return of(this.servicesData);
  }

  getServicesData(): ServicesData {
    return this.servicesData;
  }

  setServicesData(data: ServicesData): void {
    this.servicesData = data;
  }

  getServiceById(serviceId: string): Service | null {
    for (const category of this.servicesData.categories) {
      const service = category.services.find((s) => s.id === serviceId);
      if (service) return service;
    }
    return null;
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
