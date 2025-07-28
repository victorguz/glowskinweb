import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface CarouselItem {
  id: string;
  image?: string;
  title?: string;
  description?: string;
  content?: string;
  author?: string;
  date?: string;
  avatar?: string;
  rating?: number;
  ctaText?: string;
  ctaUrl?: string;
  subtitle?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() items: CarouselItem[] = [];
  @Input() autoPlay: boolean = true;
  @Input() interval: number = 5000;
  @Input() showDots: boolean = true;
  @Input() showArrows: boolean = true;
  @Input() type: 'testimonials' | 'gallery' | 'hero' = 'gallery';

  @Output() itemClick = new EventEmitter<CarouselItem>();

  currentIndex = 0;
  private intervalId?: number;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser && this.autoPlay && this.items.length > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prev() {
    this.currentIndex =
      this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  onItemClick(item: CarouselItem) {
    this.itemClick.emit(item);
  }

  private startAutoPlay() {
    if (this.isBrowser) {
      this.intervalId = window.setInterval(() => {
        this.next();
      }, this.interval);
    }
  }

  private stopAutoPlay() {
    if (this.isBrowser && this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  pauseAutoPlay() {
    this.stopAutoPlay();
  }

  resumeAutoPlay() {
    this.startAutoPlay();
  }
}
