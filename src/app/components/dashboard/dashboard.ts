import { DecimalPipe, PercentPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

// Interfaces para tipagem dos dados
interface Receita {
  categoria: string;
  previsto: number;
  realizado: number;
}

interface Despesa {
  categoria: string;
  subcategoria: string;
  previsto: number;
  realizado: number;
}

interface Ativo {
  tipo: string;
  item: string;
  valor: number;
}

interface Passivo {
  tipo: string;
  item: string;
  valor: number;
}

interface Investimento {
  tipo: string;
  classe: string;
  ativo: string;
  corretora: string;
  valorAplicado: number;
  valorAtual: number;
}

interface Meta {
  objetivo: string;
  tipo: string;
  valorTotal: number;
  valorAcumulado: number;
}

interface Divida {
  tipo: string;
  credor: string;
  saldoAtual: number;
  taxaJurosMensal: number;
  parcela: number;
}

type Tab = 'dashboard' | 'orcamento' | 'patrimonio' | 'investimentos' | 'metas' | 'dividas';

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe, PercentPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  // --- Estado da UI ---
  selectedTab = signal<Tab>('dashboard');

  tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orcamento', label: 'Orçamento Mensal' },
    { id: 'patrimonio', label: 'Patrimônio Líquido' },
    { id: 'investimentos', label: 'Investimentos' },
    { id: 'metas', label: 'Metas e Objetivos' },
    { id: 'dividas', label: 'Dívidas' },
  ];

  // --- Dados (sinais com mock data) ---
  receitas = signal<Receita[]>([
    { categoria: 'Salário', previsto: 7000, realizado: 7000 },
    { categoria: 'Renda Extra', previsto: 500, realizado: 650 },
  ]);

  despesas = signal<Despesa[]>([
    { categoria: 'Moradia', subcategoria: 'Aluguel', previsto: 2000, realizado: 2000 },
    { categoria: 'Moradia', subcategoria: 'Condomínio', previsto: 400, realizado: 400 },
    { categoria: 'Alimentação', subcategoria: 'Supermercado', previsto: 1000, realizado: 1150 },
    { categoria: 'Transporte', subcategoria: 'Combustível', previsto: 300, realizado: 350 },
    { categoria: 'Lazer', subcategoria: 'Restaurantes', previsto: 400, realizado: 550 },
  ]);

  ativos = signal<Ativo[]>([
    { tipo: 'Liquidez', item: 'Reserva de Emergência (CDB)', valor: 30000 },
    { tipo: 'Investimentos', item: 'Renda Variável', valor: 50000 },
    { tipo: 'Investimentos', item: 'Renda Fixa', valor: 75000 },
    { tipo: 'Bens', item: 'Veículo', valor: 80000 },
  ]);

  passivos = signal<Passivo[]>([
    { tipo: 'Curto Prazo', item: 'Cartão de Crédito', valor: 2500 },
    { tipo: 'Longo Prazo', item: 'Financiamento Veículo', valor: 45000 },
  ]);

  investimentos = signal<Investimento[]>([
    { tipo: 'Renda Fixa', classe: 'Tesouro Direto', ativo: 'Tesouro Selic 2029', corretora: 'Corretora X', valorAplicado: 50000, valorAtual: 52000 },
    { tipo: 'Renda Variável', classe: 'Ação', ativo: 'PETR4', corretora: 'Corretora Y', valorAplicado: 20000, valorAtual: 23000 },
    { tipo: 'Renda Variável', classe: 'FII', ativo: 'MXRF11', corretora: 'Corretora X', valorAplicado: 15000, valorAtual: 15500 },
  ]);

  metas = signal<Meta[]>([
    { objetivo: 'Reserva de Emergência', tipo: 'Curto Prazo', valorTotal: 42000, valorAcumulado: 30000 },
    { objetivo: 'Viagem ao Japão', tipo: 'Médio Prazo', valorTotal: 30000, valorAcumulado: 5000 },
    { objetivo: 'Aposentadoria', tipo: 'Longo Prazo', valorTotal: 1000000, valorAcumulado: 125000 },
  ]);

  dividas = signal<Divida[]>([
    { tipo: 'Financiamento Veículo', credor: 'Banco A', saldoAtual: 45000, taxaJurosMensal: 1.5, parcela: 1200 },
    { tipo: 'Cartão de Crédito', credor: 'Banco B', saldoAtual: 2500, taxaJurosMensal: 14.0, parcela: 2500 },
  ]);

  // --- Funções de Navegação ---
  selectTab(tab: any) {
    var selected: Tab = tab;
    this.selectedTab.set(selected);
  }

  // --- Sinais Computados (Cálculos Automáticos) ---

  // Orçamento
  totalReceitas = computed(() => this.receitas().reduce((acc, item) => acc + item.realizado, 0));
  totalReceitasPrevisto = computed(() => this.receitas().reduce((acc, item) => acc + item.previsto, 0));
  totalDespesas = computed(() => this.despesas().reduce((acc, item) => acc + item.realizado, 0));
  totalDespesasPrevisto = computed(() => this.despesas().reduce((acc, item) => acc + item.previsto, 0));
  resultadoMensal = computed(() => this.totalReceitas() - this.totalDespesas());

  // Patrimônio
  totalAtivos = computed(() => this.ativos().reduce((acc, item) => acc + item.valor, 0));
  totalPassivos = computed(() => this.passivos().reduce((acc, item) => acc + item.valor, 0));
  patrimonioLiquido = computed(() => this.totalAtivos() - this.totalPassivos());

  // Investimentos
  totalInvestido = computed(() => this.investimentos().reduce((acc, item) => acc + item.valorAtual, 0));
  totalInvestidoAplicado = computed(() => this.investimentos().reduce((acc, item) => acc + item.valorAplicado, 0));

  // Dívidas
  totalDividas = computed(() => this.dividas().reduce((acc, item) => acc + item.saldoAtual, 0));
}
