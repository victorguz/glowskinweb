import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsPipePipe } from '../../pipes/assets-pipe.pipe';
import { SeoService } from '../../services/seo.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule, AssetsPipePipe],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NosotrosComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setNosotrosMeta();
  }

  // Información de contacto
  contactInfo = {
    whatsapp: environment.whatsappLink,
    booking: environment.bookingLink,
  };
}
