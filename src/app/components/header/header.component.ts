import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements OnDestroy {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.updateBodyScroll();
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
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
