import { ChangeDetectionStrategy, Component, computed, signal, LOCALE_ID, OnInit, inject } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth-service';

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
export class App implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  
  ngOnInit(): void {
    // O Angular chama esta função na inicialização do app.
    // Se o usuário estiver voltando do Google, o resultado estará aqui.
    this.authService.getGoogleRedirectResult().subscribe({
      next: (result) => {
        if (result) {
          // O login foi bem-sucedido!
          console.log('Login do Google bem-sucedido:', result.user);
          // Redireciona para o dashboard
          this.router.navigate(['/dashboard']); 
        } else {
          // Não é um retorno de redirecionamento ou o usuário já está logado
        }
      },
      error: (err) => {
        console.error('Erro no login por redirecionamento:', err);
        // Lidar com erros de autenticação aqui
      }
    });
  }
  
}

