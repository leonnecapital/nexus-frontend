import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface MetaFinanceira {
  id: number;
  meta: string;
  valor: number;
  prazoMeses: number;
  valorMensal: number;
  estrategia: string;
  progresso: number; // Porcentagem concluída (0-100)
  status: 'Em Andamento' | 'Concluída' | 'Pendente';
}

@Component({
  selector: 'app-planejamento-financeiro',
  imports: [CommonModule],
  templateUrl: './planejamento-financeiro.html',
  styleUrl: './planejamento-financeiro.css',
})
export class PlanejamentoFinanceiro {
  metas: MetaFinanceira[] = [
    {
      id: 1,
      meta: 'Reserva de Emergência',
      valor: 30000,
      prazoMeses: 12,
      valorMensal: 2500,
      estrategia: 'Tesouro Selic',
      progresso: 85,
      status: 'Em Andamento',
    },
    {
      id: 2,
      meta: 'Viagem Europa',
      valor: 15000,
      prazoMeses: 24,
      valorMensal: 625,
      estrategia: 'CDB com Liquidez',
      progresso: 10,
      status: 'Em Andamento',
    },
    {
      id: 3,
      meta: 'Quitar Dívida do Cartão',
      valor: 8000,
      prazoMeses: 6,
      valorMensal: 1333.33,
      estrategia: 'Foco no pagamento (Taxa alta)',
      progresso: 100,
      status: 'Concluída',
    },
  ];

  constructor() { }

  ngOnInit(): void {
    // Aqui você buscaria as metas do cliente
  }

  adicionarMeta(): void {
    alert('Função de adicionar meta ativada! (Abrir Modal de Edição)');
    // Implementar a lógica para abrir um modal de formulário
  }

  // Helper para formatar moeda
  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Helper para cor do Status
  getStatusClass(status: string): string {
    switch (status) {
      case 'Concluída':
        return 'bg-green-100 text-green-800';
      case 'Em Andamento':
        return 'bg-blue-100 text-blue-800';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
