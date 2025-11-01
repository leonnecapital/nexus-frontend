import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Ativo {
  id: number;
  tipo: string;
  instituicao: string;
  valor: number;
  rentabilidadeAnual: number; // Em porcentagem (%)
  liquidez: 'Diária' | '30 Dias' | 'No Vencimento';
  vencimento: string; // Ex: "2028-05-15" ou "N/A"
  risco: 'Baixo' | 'Médio' | 'Alto';
}

@Component({
  selector: 'app-investimentos',
  imports: [CommonModule],
  templateUrl: './investimentos.html',
  styleUrl: './investimentos.css',
})
export class Investimentos {
  ativos: Ativo[] = [
    {
      id: 1,
      tipo: 'CDB',
      instituicao: 'Banco Nexus',
      valor: 50000.00,
      rentabilidadeAnual: 11.5,
      liquidez: 'Diária',
      vencimento: 'N/A',
      risco: 'Baixo',
    },
    {
      id: 2,
      tipo: 'FII',
      instituicao: 'Corretora X',
      valor: 15000.00,
      rentabilidadeAnual: 12.8,
      liquidez: '30 Dias',
      vencimento: 'N/A',
      risco: 'Médio',
    },
    {
      id: 3,
      tipo: 'Ações (BDRs)',
      instituicao: 'Corretora X',
      valor: 20000.00,
      rentabilidadeAnual: 8.5,
      liquidez: 'Diária',
      vencimento: 'N/A',
      risco: 'Alto',
    },
    {
      id: 4,
      tipo: 'Tesouro IPCA',
      instituicao: 'Tesouro Direto',
      valor: 10000.00,
      rentabilidadeAnual: 6.2, // IPCA + 6.2%
      liquidez: 'No Vencimento',
      vencimento: '2035-08-15',
      risco: 'Baixo',
    },
  ];

  rentabilidadeMediaCarteira: number = 0;
  valorTotalCarteira: number = 0;

  ngOnInit(): void {
    this.calcularRentabilidadeMedia();
  }

  calcularRentabilidadeMedia(): void {
    let somaProdutos = 0;
    let somaValores = 0;

    this.ativos.forEach(ativo => {
      // Cálculo: (Valor do Ativo * Rentabilidade)
      somaProdutos += ativo.valor * ativo.rentabilidadeAnual;
      somaValores += ativo.valor;
    });

    this.valorTotalCarteira = somaValores;

    if (somaValores > 0) {
      // Rentabilidade Média Ponderada = Soma(Valor * Rentabilidade) / Soma(Valor)
      this.rentabilidadeMediaCarteira = somaProdutos / somaValores;
    } else {
      this.rentabilidadeMediaCarteira = 0;
    }
  }

  adicionarInvestimento(): void {
    alert('Função de adicionar investimento ativada! (Abrir Modal)');
    // Implementar a lógica para abrir um modal de formulário
  }

  // Helper para formatar moeda
  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Helper para formatar porcentagem
  formatarPorcentagem(valor: number): string {
    return valor.toFixed(2) + '%';
  }

  // Helper para cor do Indicador de Risco
  getRiscoClass(risco: string): string {
    switch (risco) {
      case 'Baixo':
        return 'bg-green-500'; // Verde
      case 'Médio':
        return 'bg-yellow-500'; // Amarelo
      case 'Alto':
        return 'bg-red-500'; // Vermelho
      default:
        return 'bg-gray-400';
    }
  }
}
