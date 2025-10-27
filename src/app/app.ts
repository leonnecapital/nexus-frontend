import { ChangeDetectionStrategy, Component, computed, signal, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 1. Registrar os dados de localidade para 'pt-BR'
registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  // 2. Adicionar o provider de LOCALE_ID para que os pipes usem 'pt-BR' por padrão
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './../styles.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  
}

