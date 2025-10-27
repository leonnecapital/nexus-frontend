import { ChangeDetectionStrategy, Component, computed, signal, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterOutlet } from '@angular/router';

// 1. Registrar os dados de localidade para 'pt-BR'
registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  // 2. Adicionar o provider de LOCALE_ID para que os pipes usem 'pt-BR' por padrão
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  template: `<router-outlet></router-outlet>`,
  styles: [`
    /* Estilos Globais para o componente */
    :host {
      font-family: 'Inter', sans-serif;
    }
    
    /* Estilização base da tabela para garantir consistência */
    table {
      border-collapse: collapse;
    }
    th {
      background-color: #f9fafb; /* bg-gray-50 */
    }
    th, td {
      border: 1px solid #e5e7eb; /* border-gray-200 */
    }
    /* Adicionando um leve 'zebrado' se não estiver usando hover */
    tbody tr:nth-child(even) {
      background-color: #f9fafb; /* bg-gray-50 */
    }
    tbody tr:hover {
       background-color: #f3f4f6; /* bg-gray-100 */
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  
}

