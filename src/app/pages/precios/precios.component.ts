import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ServicesService,
  ServicesData,
  ServiceCategory,
} from '../../services/services.service';

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PreciosComponent implements OnInit {
  servicesData: ServicesData | null = null;
  loading = true;
  error = false;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.servicesData = data;
        this.servicesService.setServicesData(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.error = true;
        this.loading = false;
      },
    });
  }

  formatPrice(price: number, currency: string = 'COP'): string {
    return this.servicesService.formatPrice(price, currency);
  }

  toggleDetails(event: Event): void {
    const button = event.target as HTMLElement;
    const details = button.parentElement?.parentElement
      ?.nextElementSibling as HTMLElement;

    if (details) {
      if (details.style.maxHeight) {
        details.style.maxHeight = '';
        button.textContent = 'Ver detalles';
      } else {
        details.style.maxHeight = details.scrollHeight + 'px';
        button.textContent = 'Ocultar detalles';
      }
    }
  }

  getContactInfo() {
    return (
      this.servicesData?.contactInfo || {
        whatsapp: 'https://wa.link/h5481r',
        phone: '+57 300 123 4567',
        email: 'info@glowskin.com',
      }
    );
  }
}
