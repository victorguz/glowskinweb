import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Datos de contacto
  contactInfo = {
    phone: '+57 300 888 3486',
    whatsapp: environment.whatsappLink,
    email: environment.email,
    address: environment.address,
    hours: 'Lun - Sáb: 9:00 AM - 6:00 PM',
  };

  // Enlaces de navegación
  navigationLinks = [
    { text: 'Inicio', route: '/' },
    { text: 'Precios', route: '/precios' },
    { text: 'Nosotros', route: '/nosotros' },
    { text: 'Casos Reales', route: '/casos-reales' },
    { text: 'Blog', route: '/blog' },
    { text: 'Agendar', route: '/agendar' },
  ];

  // Redes sociales
  socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/glowskinbq',
      icon: 'logo-instagram',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/glowskinbq',
      icon: 'logo-facebook',
    },
    {
      name: 'WhatsApp',
      url: environment.whatsappLink,
      icon: 'logo-whatsapp',
    },
  ];
}
