import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instagram-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram-feed.component.html',
  styleUrl: './instagram-feed.component.scss',
})
export class InstagramFeedComponent {
  @Input() title: string = 'Síguenos en @glowskinbq';
  @Input() handle: string = '@glowskinbq';
  @Input() profileUrl: string = 'https://www.instagram.com/glowskinbq';
  @Input() buttonText: string = 'Ver perfil de Instagram';
  @Input() images: string[] = [
    'assets/images/instagram/glow-skin-instagram-resultado-1.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-2.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-3.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-4.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-5.webp',
    'assets/images/instagram/glow-skin-instagram-resultado-6.webp',
  ];
  @Input() columns: number = 6; // Para responsive: 3 en mobile, 6 en desktop
}
