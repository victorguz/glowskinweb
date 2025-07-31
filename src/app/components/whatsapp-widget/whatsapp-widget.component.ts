import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-whatsapp-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-widget.component.html',
  styleUrl: './whatsapp-widget.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WhatsappWidgetComponent implements OnInit, OnDestroy {
  @Input() phoneNumber: string = '573008883486';
  @Input() message: string = 'Hola! Me gustaría agendar una cita en Glow Skin';
  @Input() showDelay: number = 15000; // 15 segundos
  @Input() autoCloseDelay: number = 5000; // 5 segundos
  @Input() maxWidth: string = '80dvw'; // 80% del viewport width en mobile

  isVisible = false;
  isOpen = false;
  isUserClosed = false;
  private showTimeout?: number;
  private closeTimeout?: number;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkUserPreference();
      this.startShowTimer();
    }
  }

  ngOnDestroy() {
    this.clearTimers();
  }

  private checkUserPreference() {
    if (this.isBrowser) {
      const userClosed = localStorage.getItem('whatsapp-widget-closed');
      if (userClosed === 'true') {
        this.isUserClosed = true;
      }
    }
  }

  private startShowTimer() {
    if (this.isBrowser && !this.isUserClosed) {
      this.showTimeout = window.setTimeout(() => {
        this.show();
      }, this.showDelay);
    }
  }

  private clearTimers() {
    if (this.isBrowser) {
      if (this.showTimeout) {
        clearTimeout(this.showTimeout);
      }
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }
    }
  }

  show() {
    if (this.isBrowser && !this.isUserClosed) {
      this.isVisible = true;

      // Auto-close después del tiempo especificado
      this.closeTimeout = window.setTimeout(() => {
        this.close();
      }, this.autoCloseDelay);
    }
  }

  close() {
    this.isVisible = false;
    this.isOpen = false;
    this.clearTimers();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      // Reset auto-close timer cuando el usuario abre el chat
      if (this.isBrowser && this.closeTimeout) {
        clearTimeout(this.closeTimeout);
      }
      this.closeTimeout = window.setTimeout(() => {
        this.close();
      }, this.autoCloseDelay);
    }
  }

  closeChat() {
    this.isOpen = false;
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }

  onUserClose() {
    this.isUserClosed = true;
    if (this.isBrowser) {
      localStorage.setItem('whatsapp-widget-closed', 'true');
    }
    this.close();
  }
}
