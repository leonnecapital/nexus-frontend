import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationType } from '../../models/notification.model';
import { NotificationService } from '../../services/notification-service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
})
export class Tooltip implements OnInit, OnDestroy {
  currentNotification: Notification | any | null = null;
  private subscription!: Subscription;
  private timer: any;
  sanitizer = inject(DomSanitizer);

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    // Assina o Observable para receber novas notificações
    this.subscription = this.notificationService.notification$.subscribe(
      notification => {
        this.showNotification(notification);
      }
    );
  }

  showNotification(notification: Notification | any): void {
    // Limpa o timer anterior para permitir novas notificações
    clearTimeout(this.timer);

    this.currentNotification = notification;

    // Configura o timer para fechar a notificação
    const duration = notification.duration || 3000;
    this.timer = setTimeout(() => {
      this.closeNotification();
    }, duration);
  }

  closeNotification(): void {
    this.currentNotification = null;
  }

  /**
   * Determina as classes CSS (cores) baseadas no tipo de notificação.
   */
  getNotificationClasses(type: NotificationType | any): { [key: string]: boolean } {
    switch (type) {
      case 'success':
        return {
          'bg-green-500': true,
          'border-green-700': true,
        };
      case 'error':
        return {
          'bg-red-500': true,
          'border-red-700': true,
        };
      case 'warning':
        return {
          'bg-yellow-500': true,
          'border-yellow-700': true,
        };
      case 'info':
        return {
          'bg-blue-500': true,
          'border-blue-700': true,
        };
      default:
        return {};
    }
  }

  // Ícone SVG para renderização condicional
  getIcon(type: NotificationType | any): SafeHtml {
    let svgString: string;

    switch (type) {
      case 'success':
        svgString = `<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
        break;
      case 'error':
        svgString = `<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
        break;
      case 'warning':
        svgString = `<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
        break;
      case 'info':
        svgString = `<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
        break;
      default:
        svgString = '';
    }

    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearTimeout(this.timer);
  }
}
