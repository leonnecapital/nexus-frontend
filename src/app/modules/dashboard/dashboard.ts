import { CommonModule, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  public Math = Math; // Expor Math para uso em cálculos simples no template (como em telas anteriores)

  // Métricas Principais
  clientesAtivos: number = 42;
  lucroTotal: number = 85400.00; // Lucro da consultoria (acumulado/anual)
  patrimonioGerido: number = 3850000.00; // Soma do patrimônio de todos os clientes
  alertasPendentes: number = 5; // Ex: Metas atrasadas ou desvios de orçamento

  // Dados para o Gráfico de Evolução (Patrimônio Médio do Cliente)
  meses: string[] = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'];
  evolucaoPatrimonial: number[] = [100, 105, 115, 120, 135, 130, 145, 160, 170, 185]; // Exemplo em milhares de BRL

  constructor() { }

  ngOnInit(): void {
    // Inicialização de dados
  }

  novoCliente(): void {
    alert('Função de adicionar novo cliente ativada!');
    // Lógica de navegação ou abertura de modal para cadastro
  }

  // Helper para formatar moeda
  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Helper para simular o crescimento (usado no card de Patrimônio)
  getCrescimento(valorInicial: number, valorFinal: number): string {
    const crescimento = (valorFinal - valorInicial) / valorInicial * 100;
    return crescimento.toFixed(1) + '%';
  }
}
