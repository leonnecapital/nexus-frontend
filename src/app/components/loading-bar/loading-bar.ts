import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  imports: [NgClass],
  templateUrl: './loading-bar.html',
  styleUrl: './loading-bar.css',
})
export class LoadingBar {
  // Exemplo de variáveis de estado
  isLoading: boolean = false;
  progressWidth: string = '0%';

  // Exemplo de injeção do seu serviço de loading
  // constructor(private loadingService: LoadingService) {} 

  ngOnInit(): void {
    this.startIndeterminate();
    // Exemplo de como você atualizaria o estado a partir de um serviço
    // O ideal é que um serviço de interceptação HTTP ou de rota atualize essas variáveis.

    /* this.loadingService.isLoading$.subscribe(state => {
      this.isLoading = state;
      // Define a largura quando o loading começa/termina
      this.progressWidth = state ? '70%' : '100%'; 
      
      if (!state) {
        // Depois de mostrar 100%, zera a largura após um breve atraso
        setTimeout(() => { this.progressWidth = '0%'; }, 300);
      }
    });
    */
  }

  // Se você quiser uma animação de "loop" enquanto aguarda
  startIndeterminate() {
    this.isLoading = true;
    this.progressWidth = '100%'; // A largura fica em 100%
    // Para animação real, você usaria @keyframes CSS ou um setInterval para mover a barra
  }
}
