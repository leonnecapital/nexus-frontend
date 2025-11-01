import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Subject é usado para enviar os dados de notificação
  private notificationSubject: Subject<Notification> = new Subject<Notification>();

  // Observable que os componentes (incluindo o tooltip) podem assinar
  get notification$(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }

  // Métodos de disparo
  show(notification: Notification | any) {
    this.notificationSubject.next({ ...notification, id: Date.now() });
  }

  success(message: string, duration: number = 3000) {
    this.show({ message, type: 'success', duration });
  }

  error(message: string, duration: number = 5000) {
    this.show({ message, type: 'error', duration });
  }

  warning(message: string, duration: number = 4000) {
    this.show({ message, type: 'warning', duration });
  }

  info(message: string, duration: number = 3000) {
    this.show({ message, type: 'info', duration });
  }
}
