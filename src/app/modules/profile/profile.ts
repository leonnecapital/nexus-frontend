import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

// Definição da interface para os dados do cliente
interface ClientePerfil {
  nome: string;
  fotoUrl: string;
  idade: number;
  profissao: string;
  email: string;

  // Dados Financeiros
  receitaMensal: number;
  despesasFixas: number;
  scoreFinanceiro: number;

  // Dados de Patrimônio
  patrimonioTotal: number;
  dividas: number;
  reservaEmergencia: number;

  // Análise
  nivelRisco: 'Baixo' | 'Médio' | 'Alto';
}

@Component({
  selector: 'app-profile',
  imports: [NgClass],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

  // Dados Mock do Cliente
  cliente: ClientePerfil = {
    nome: 'Carolina Mendes',
    fotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734b584?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    idade: 32,
    profissao: 'Engenheira de Software',
    email: 'carolina.mendes@email.com',

    receitaMensal: 12500.00,
    despesasFixas: 4800.00,
    scoreFinanceiro: 780,

    patrimonioTotal: 450000.00,
    dividas: 75000.00,
    reservaEmergencia: 30000.00,

    nivelRisco: 'Médio',
  };

  historicoAtendimentos = [
    { data: '15/05/2025', resumo: 'Revisão de portfólio de investimentos e alocação de risco.' },
    { data: '02/03/2025', resumo: 'Análise de empréstimo imobiliário e projeção de dívidas.' },
    { data: '10/01/2025', resumo: 'Revisão inicial de metas e orçamento anual.' }
  ];

  /**
   * Função simulada para gerar diagnóstico
   */
  gerarDiagnostico() {
    console.log('Gerando diagnóstico automático para', this.cliente.nome);
    alert('Diagnóstico gerado! Verifique o console para os detalhes.');
    // Aqui você integraria a lógica real de análise de dados
  }

  /**
   * Helper para formatar moeda
   */
  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Retorna a classe Tailwind com base no nível de risco
   */
  getRiscoClass(nivel: string): string {
    switch (nivel) {
      case 'Baixo':
        return 'bg-green-100 text-green-800 border-green-400';
      case 'Médio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-400';
      case 'Alto':
        return 'bg-red-100 text-red-800 border-red-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
