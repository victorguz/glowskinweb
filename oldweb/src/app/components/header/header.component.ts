import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AssetsPipePipe } from '../../pipes/assets-pipe.pipe';
import { environment } from '../../../environments/environment';
import { Service, ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, AssetsPipePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  isServicesMenuOpen = false;
  showServicesSubmenu = false;
  environment = environment;
  services: Service[] = [];
  servicesService: ServicesService;

  constructor(servicesService: ServicesService) {
    this.servicesService = servicesService;
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        // Get only facial cleansing services for the menu
        const facialCategory = data.categories.find(cat => cat.id === 'limpiezas-faciales');
        this.services = facialCategory?.services || [];
      },
      error: (error) => {
        console.error('Error loading services for header:', error);
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.showServicesSubmenu = false;
    this.updateBodyScroll();
  }

  toggleServicesSubmenu() {
    this.showServicesSubmenu = !this.showServicesSubmenu;
  }

  goBackToMainMenu() {
    this.showServicesSubmenu = false;
  }

  toggleServicesDropdown() {
    this.isServicesMenuOpen = !this.isServicesMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.showServicesSubmenu = false;
    this.isServicesMenuOpen = false;
    this.updateBodyScroll();
  }

  private updateBodyScroll() {
    if (typeof document !== 'undefined') {
      if (this.isMobileMenuOpen) {
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.classList.remove('mobile-menu-open');
      }
    }
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('mobile-menu-open');
    }
  }
}
