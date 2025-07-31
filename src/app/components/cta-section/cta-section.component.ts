import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.scss',
})
export class CtaSectionComponent {
  @Input() title: string = '¿Qué esperas para devolverle el Glow a tu Piel?';
  @Input() buttonText: string = 'Agendar ahora';
  @Input() buttonUrl: string = environment.bookingLink;
  @Input() buttonStyle: 'primary' | 'secondary' = 'primary';
  @Input() showUnderline: boolean = true;
  @Input() underlineText: string = 'devolverle el Glow a tu Piel';
}
