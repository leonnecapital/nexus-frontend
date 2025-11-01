import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diagnostico-financeiro',
  imports: [FormsModule, CommonModule],
  templateUrl: './diagnostico-financeiro.html',
  styleUrl: './diagnostico-financeiro.css',
})
export class DiagnosticoFinanceiro {
  // Dados Simples
  receitas = [
    { nome: 'Salário Líquido', valor: 8000.00 },
    { nome: 'Renda Extra', valor: 500.00 },
  ];

  despesas = [
    { nome: 'Aluguel/Parcela', valor: 2500.00 },
    { nome: 'Contas Fixas (Luz, Água, Internet)', valor: 500.00 },
    { nome: 'Alimentação/Mercado', valor: 1200.00 },
    { nome: 'Transporte/Combustível', valor: 450.00 },
    { nome: 'Lazer/Outros', valor: 600.00 },
  ];

  totalReceitas: number = 0;
  totalDespesas: number = 0;
  saldoMensal: number = 0;
  saudeFinanceira: number = 0; // Valor de 0 a 100
  observacoes: string = '';

  ngOnInit(): void {
    this.calcularMetricas();
  }

  calcularMetricas(): void {
    this.totalReceitas = this.receitas.reduce((sum, item) => sum + item.valor, 0);
    this.totalDespesas = this.despesas.reduce((sum, item) => sum + item.valor, 0);
    this.saldoMensal = this.totalReceitas - this.totalDespesas;

    // Lógica para o Indicador de Saúde (Exemplo: baseada na porcentagem de despesas)
    if (this.totalReceitas > 0) {
      // Quanto mais saldo, maior a saúde financeira
      this.saudeFinanceira = Math.min(100, (this.saldoMensal / this.totalReceitas) * 100 * 2);
    } else {
      this.saudeFinanceira = 0;
    }
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Helper para cor da barra de saúde
  getHealthColor(): string {
    if (this.saudeFinanceira < 20) return 'bg-red-500';
    if (this.saudeFinanceira < 50) return 'bg-yellow-500';
    if (this.saudeFinanceira < 80) return 'bg-blue-500';
    return 'bg-green-500';
  }
}
