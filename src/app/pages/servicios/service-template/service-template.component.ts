import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { SeoService } from '../../../services/seo.service';
import { Service, ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-service-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-template.component.html',
  styleUrl: './service-template.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServiceTemplateComponent implements OnInit {
  service: Service | null = null;
  serviceId: string | null = null;
  loading = true;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {

    combineLatest([
      this.route.data,
      this.route.params
    ]).subscribe(([data, params]) => {
      this.serviceId = data['serviceId'] || params['id'];
      this.loadService();
    });
  }

  loadService(): void {
    this.service = this.servicesService.getServiceById(this.serviceId!);
    console.log(this.service);

    if (this.service) {
      this.setSeoForService();
    } else {
      // this.router.navigate(['/precios']);
    }
    this.loading = false;
  }

  setSeoForService(): void {
    if (!this.service) return;

    // Set SEO based on service ID
    switch (this.service.id) {
      case 'limpieza-facial-glow-skin':
        this.seoService.setLimpiezaFacialMeta();
        break;
      case 'limpieza-facial-anti-acne':
        this.seoService.setLimpiezaFacialAntiAcneMeta();
        break;
      case 'limpieza-facial-pieles-sensibles':
        this.seoService.setLimpiezaFacialPielesSensiblesMeta();
        break;
      default:
        // Generic SEO for other services
        this.seoService.updateMetaTags({
          title: `${this.service.name} - Glow Skin | Sofia Nieto`,
          description: this.service.description,
          keywords: `${this.service.name}, sofia nieto, glow skin, barranquilla`,
          url: `https://glowskinbq.com/servicio/${this.service.id}`,
        });
        break;
    }
  }

  formatPrice(price: number, currency: string = 'COP'): string {
    return this.servicesService.formatPrice(price, currency);
  }

  getContactInfo() {
    const servicesData = this.servicesService.getServicesData();
    return (
      servicesData?.contactInfo || {
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

  getColorClass(color: string, type: 'bg' | 'text' | 'border' = 'bg'): string {
    const colorMap = {
      pink: {
        bg: 'bg-pink-600',
        text: 'text-pink-600',
        border: 'border-pink-600',
      },
      green: {
        bg: 'bg-green-600',
        text: 'text-green-600',
        border: 'border-green-600',
      },
      rose: {
        bg: 'bg-rose-500',
        text: 'text-rose-600',
        border: 'border-rose-500',
      },
    };

    return (
      colorMap[color as keyof typeof colorMap]?.[type] || colorMap.pink[type]
    );
  }

  getHoverColorClass(color: string): string {
    const colorMap = {
      pink: 'hover:bg-pink-700',
      green: 'hover:bg-green-700',
      rose: 'hover:bg-rose-600',
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.pink;
  }
}
