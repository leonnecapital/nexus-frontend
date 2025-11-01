import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface GastoCategoria {
  id: number;
  categoria: string;
  planejado: number;
  realizado: number;
  corGrafico: string; // Cor para o gráfico de pizza (Tailwind color)
}

@Component({
  selector: 'app-controle-de-gastos',
  imports: [CommonModule, FormsModule],
  templateUrl: './controle-de-gastos.html',
  styleUrl: './controle-de-gastos.css',
})
export class ControleDeGastos {
  public Math = Math;
  
  gastos: GastoCategoria[] = [
    { id: 1, categoria: 'Moradia', planejado: 3000, realizado: 3200, corGrafico: 'bg-indigo-500' },
    { id: 2, categoria: 'Alimentação', planejado: 1200, realizado: 1350, corGrafico: 'bg-green-500' },
    { id: 3, categoria: 'Transporte', planejado: 500, realizado: 450, corGrafico: 'bg-blue-500' },
    { id: 4, categoria: 'Saúde', planejado: 300, realizado: 300, corGrafico: 'bg-red-500' },
    { id: 5, categoria: 'Lazer', planejado: 600, realizado: 950, corGrafico: 'bg-yellow-500' },
    { id: 6, categoria: 'Outros', planejado: 400, realizado: 250, corGrafico: 'bg-gray-500' },
  ];

  totalPlanejado: number = 0;
  totalRealizado: number = 0;
  totalDiferenca: number = 0;

  ngOnInit(): void {
    this.calcularTotais();
  }

  calcularTotais(): void {
    this.totalPlanejado = this.gastos.reduce((sum, item) => sum + item.planejado, 0);
    this.totalRealizado = this.gastos.reduce((sum, item) => sum + item.realizado, 0);
    this.totalDiferenca = this.totalRealizado - this.totalPlanejado;
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  calcularDiferencaPercentual(planejado: number, realizado: number): number {
    if (planejado === 0) return realizado > 0 ? 100 : 0;
    const diferenca = realizado - planejado;
    return (diferenca / planejado) * 100;
  }

  getDiferencaClass(percentual: number): string {
    if (percentual > 15) return 'text-red-600 font-bold'; // Alerta: 15% acima do planejado
    if (percentual > 0) return 'text-yellow-600 font-medium'; // Um pouco acima
    return 'text-green-600'; // Abaixo ou dentro do planejado
  }

  getDiferencaTexto(percentual: number): string {
    const valor = Math.abs(percentual).toFixed(1) + '%';
    return percentual > 0 ? `+${valor}` : `-${valor}`;
  }

  /**
   * Simula a lógica de um gráfico de pizza usando Tailwind (Conic Gradient).
   * No Angular real, você usaria uma biblioteca (Chart.js, D3, etc.).
   */
  getPieChartStyle(): string {
    let style = 'conic-gradient(';
    let startAngle = 0;

    // Apenas considera categorias que possuem gastos realizados
    const gastosValidos = this.gastos.filter(g => g.realizado > 0);

    // Calcula a soma dos realizados válidos (deve ser o total realizado)
    const totalRealizadoValido = gastosValidos.reduce((sum, item) => sum + item.realizado, 0);

    if (totalRealizadoValido === 0) {
      return 'background-color: #e5e7eb;'; // Cinza, se não houver gastos
    }

    gastosValidos.forEach((gasto, index) => {
      const percentage = (gasto.realizado / totalRealizadoValido) * 100;
      const endAngle = startAngle + percentage;

      style += `${gasto.corGrafico.replace('bg-', '')} ${startAngle}% ${endAngle}%`;

      // Adiciona vírgula, exceto no último item
      if (index < gastosValidos.length - 1) {
        style += ', ';
      }

      startAngle = endAngle;
    });

    style += ')';
    return style;
  }
}
