export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id?: number;
  message: string;
  type: NotificationType;
  duration?: number; // Tempo em milissegundos (padrão: 3000ms)
}