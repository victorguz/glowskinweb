import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { SeoService } from '../../../services/seo.service';
import { ServiceCategory, ServicesData, ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-limpieza-facial-pieles-sensibles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './limpieza-facial-pieles-sensibles.component.html',
  styleUrl: './limpieza-facial-pieles-sensibles.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LimpiezaFacialPielesSensiblesComponent implements OnInit {
  servicesData: ServicesData | null = null;
  limpiezaFacialCategory: ServiceCategory | null = null;
  loading = true;
  error = false;

  constructor(
    private servicesService: ServicesService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setLimpiezaFacialPielesSensiblesMeta();
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.servicesData = data;
        this.limpiezaFacialCategory =
          data.categories.find(
            (category) => category.id === 'limpiezas-faciales'
          ) || null;
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
        whatsapp: environment.whatsappLink,
        phone: '+57 300 888 3486',
        email: environment.email,
        booking: environment.bookingLink,
      }
    );
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getSensitiveSkinsService() {
    return this.limpiezaFacialCategory?.services.find(
      (service) => service.id === 'limpieza-facial-pieles-sensibles'
    );
  }
}
