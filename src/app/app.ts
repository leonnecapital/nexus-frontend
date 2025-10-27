import { ChangeDetectionStrategy, Component, computed, signal, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

// 1. Registrar os dados de localidade para 'pt-BR'
registerLocaleData(localePt);

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
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  // 2. Adicionar o provider de LOCALE_ID para que os pipes usem 'pt-BR' por padrão
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  template: `
    <div class="min-h-screen bg-gray-100 p-4 md:p-8 font-inter">
      <!-- Cabeçalho -->
      <header class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800">Sistema de Consultoria Financeira</h1>
        <p class="text-gray-600">Visão geral das finanças do cliente.</p>
      </header>

      <!-- Navegação por Abas -->
      <nav class="flex flex-wrap border-b border-gray-300 mb-6">
        @for (tab of tabs; track tab.id) {
          <button
            (click)="selectTab(tab.id)"
            [class]="selectedTab() === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
            class="py-3 px-4 md:px-6 font-semibold border-b-2 focus:outline-none transition-colors duration-200"
          >
            {{ tab.label }}
          </button>
        }
      </nav>

      <!-- Conteúdo Principal -->
      <main class="bg-white rounded-lg shadow-xl p-6 md:p-8">
        @switch (selectedTab()) {
          
          <!-- ========== Aba Dashboard ========== -->
          @case ('dashboard') {
            <section>
              <h2 class="text-2xl font-semibold text-gray-700 mb-6">Dashboard</h2>
              
              <!-- Cartões de Resumo (Removido 'pt-BR' dos pipes) -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-blue-50 p-5 rounded-lg shadow-md">
                  <h3 class="text-sm font-semibold text-blue-800 uppercase">Patrimônio Líquido</h3>
                  <p class="text-3xl font-bold text-blue-900">{{ patrimonioLiquido() | number:'1.2-2' }}</p>
                </div>
                <div class="bg-green-50 p-5 rounded-lg shadow-md">
                  <h3 class="text-sm font-semibold text-green-800 uppercase">Resultado Mensal</h3>
                  <p class="text-3xl font-bold text-green-900">{{ resultadoMensal() | number:'1.2-2' }}</p>
                </div>
                <div class="bg-indigo-50 p-5 rounded-lg shadow-md">
                  <h3 class="text-sm font-semibold text-indigo-800 uppercase">Total Investido</h3>
                  <p class="text-3xl font-bold text-indigo-900">{{ totalInvestido() | number:'1.2-2' }}</p>
                </div>
                <div class="bg-red-50 p-5 rounded-lg shadow-md">
                  <h3 class="text-sm font-semibold text-red-800 uppercase">Total Dívidas</h3>
                  <p class="text-3xl font-bold text-red-900">{{ totalDividas() | number:'1.2-2' }}</p>
                </div>
              </div>

              <!-- Gráficos (Placeholders) -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-gray-50 p-6 rounded-lg shadow-md min-h-[300px] flex items-center justify-center">
                  <p class="text-gray-500">[Gráfico: Composição das Despesas]</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-lg shadow-md min-h-[300px] flex items-center justify-center">
                  <p class="text-gray-500">[Gráfico: Evolução do Patrimônio]</p>
                </div>
              </div>
            </section>
          }

          <!-- ========== Aba Orçamento Mensal ========== -->
          @case ('orcamento') {
            <section>
              <h2 class="text-2xl font-semibold text-gray-700 mb-6">Orçamento Mensal</h2>
              
              <!-- Seção Receitas -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-green-700 mb-4">Receitas</h3>
                <div class="overflow-x-auto shadow-md rounded-lg">
                  <table class="w-full min-w-[600px] table-auto">
                    <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                      <tr>
                        <th class="p-4">Categoria</th>
                        <th class="p-4">Previsto (R$)</th>
                        <th class="p-4">Realizado (R$)</th>
                        <th class="p-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      @for (item of receitas(); track item.categoria) {
                        <tr class="hover:bg-gray-50">
                          <td class="p-4">{{ item.categoria }}</td>
                          <td class="p-4">{{ item.previsto | number:'1.2-2' }}</td>
                          <td class="p-4">{{ item.realizado | number:'1.2-2' }}</td>
                          <td class="p-4"><button class="text-blue-600 hover:text-blue-800">Editar</button></td>
                        </tr>
                      }
                      <tr class="bg-gray-100 font-bold">
                        <td class="p-4">TOTAL RECEITAS</td>
                        <td class="p-4">{{ totalReceitasPrevisto() | number:'1.2-2' }}</td>
                        <td class="p-4">{{ totalReceitas() | number:'1.2-2' }}</td>
                        <td class="p-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Seção Despesas -->
              <div>
                <h3 class="text-xl font-semibold text-red-700 mb-4">Despesas</h3>
                <div class="overflow-x-auto shadow-md rounded-lg">
                  <table class="w-full min-w-[700px] table-auto">
                    <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                      <tr>
                        <th class="p-4">Categoria</th>
                        <th class="p-4">Subcategoria</th>
                        <th class="p-4">Previsto (R$)</th>
                        <th class="p-4">Realizado (R$)</th>
                        <th class="p-4">Ações</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      @for (item of despesas(); track $index) {
                        <tr class="hover:bg-gray-50">
                          <td class="p-4">{{ item.categoria }}</td>
                          <td class="p-4">{{ item.subcategoria }}</td>
                          <td class="p-4">{{ item.previsto | number:'1.2-2' }}</td>
                          <td class="p-4">{{ item.realizado | number:'1.2-2' }}</td>
                          <td class="p-4"><button class="text-blue-600 hover:text-blue-800">Editar</button></td>
                        </tr>
                      }
                      <tr class="bg-gray-100 font-bold">
                        <td class="p-4" colspan="2">TOTAL DESPESAS</td>
                        <td class="p-4">{{ totalDespesasPrevisto() | number:'1.2-2' }}</td>
                        <td class="p-4">{{ totalDespesas() | number:'1.2-2' }}</td>
                        <td class="p-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Resumo do Mês -->
              <div class="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Resumo do Mês</h3>
                <div class="flex justify-around flex-wrap gap-4">
                  <div class="text-center">
                    <span class="text-sm text-gray-600">Total Receitas</span>
                    <p class="text-2xl font-bold text-green-600">{{ totalReceitas() | number:'1.2-2' }}</p>
                  </div>
                  <div class="text-center">
                    <span class="text-sm text-gray-600">Total Despesas</span>
                    <p class="text-2xl font-bold text-red-600">{{ totalDespesas() | number:'1.2-2' }}</p>
                  </div>
                  <div class="text-center">
                    <span class="text-sm text-gray-600">Resultado (Saldo)</span>
                    <p class="text-2xl font-bold" [class.text-green-600]="resultadoMensal() >= 0" [class.text-red-600]="resultadoMensal() < 0">
                      {{ resultadoMensal() | number:'1.2-2' }}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          }

          <!-- ========== Aba Patrimônio Líquido ========== -->
          @case ('patrimonio') {
            <section>
              <h2 class="text-2xl font-semibold text-gray-700 mb-6">Patrimônio Líquido</h2>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Seção Ativos -->
                <div>
                  <h3 class="text-xl font-semibold text-green-700 mb-4">Ativos (O que possui)</h3>
                  <div class="overflow-x-auto shadow-md rounded-lg">
                    <table class="w-full min-w-[400px] table-auto">
                      <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                        <tr>
                          <th class="p-4">Tipo</th>
                          <th class="p-4">Item</th>
                          <th class="p-4">Valor (R$)</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        @for (item of ativos(); track $index) {
                          <tr class="hover:bg-gray-50">
                            <td class="p-4">{{ item.tipo }}</td>
                            <td class="p-4">{{ item.item }}</td>
                            <td class="p-4">{{ item.valor | number:'1.2-2' }}</td>
                          </tr>
                        }
                        <tr class="bg-gray-100 font-bold">
                          <td class="p-4" colspan="2">TOTAL ATIVOS</td>
                          <td class="p-4">{{ totalAtivos() | number:'1.2-2' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Seção Passivos -->
                <div>
                  <h3 class="text-xl font-semibold text-red-700 mb-4">Passivos (O que deve)</h3>
                  <div class="overflow-x-auto shadow-md rounded-lg">
                    <table class="w-full min-w-[400px] table-auto">
                      <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                        <tr>
                          <th class="p-4">Tipo</th>
                          <th class="p-4">Item</th>
                          <th class="p-4">Valor (R$)</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200">
                        @for (item of passivos(); track $index) {
                          <tr class="hover:bg-gray-50">
                            <td class="p-4">{{ item.tipo }}</td>
                            <td class="p-4">{{ item.item }}</td>
                            <td class="p-4">{{ item.valor | number:'1.2-2' }}</td>
                          </tr>
                        }
                         <tr class="bg-gray-100 font-bold">
                          <td class="p-4" colspan="2">TOTAL PASSIVOS</td>
                          <td class="p-4">{{ totalPassivos() | number:'1.2-2' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Resumo Patrimônio -->
              <div class="mt-8 bg-blue-50 p-6 rounded-lg shadow-inner text-center">
                <h3 class="text-xl font-semibold text-blue-800 mb-2">Patrimônio Líquido Total</h3>
                <p class="text-4xl font-bold text-blue-900">
                  {{ patrimonioLiquido() | number:'1.2-2' }}
                </p>
                <span class="text-blue-700">(Total de Ativos - Total de Passivos)</span>
              </div>
            </section>
          }

          <!-- ========== Aba Investimentos ========== -->
          @case ('investimentos') {
            <section>
              <h2 class="text-2xl font-semibold text-gray-700 mb-6">Controle de Investimentos</h2>
              <div class="overflow-x-auto shadow-md rounded-lg">
                <table class="w-full min-w-[900px] table-auto">
                  <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                    <tr>
                      <th class="p-4">Tipo</th>
                      <th class="p-4">Classe</th>
                      <th class="p-4">Ativo/Nome</th>
                      <th class="p-4">Corretora</th>
                      <th class="p-4">Valor Aplicado (R$)</th>
                      <th class="p-4">Valor Atual (R$)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    @for (item of investimentos(); track $index) {
                      <tr class="hover:bg-gray-50">
                        <td class="p-4">{{ item.tipo }}</td>
                        <td class="p-4">{{ item.classe }}</td>
                        <td class="p-4">{{ item.ativo }}</td>
                        <td class="p-4">{{ item.corretora }}</td>
                        <td class="p-4">{{ item.valorAplicado | number:'1.2-2' }}</td>
                        <td class="p-4">{{ item.valorAtual | number:'1.2-2' }}</td>
                      </tr>
                    }
                    <tr class="bg-gray-100 font-bold">
                      <td class="p-4" colspan="4">TOTAL INVESTIDO</td>
                      <td class="p-4">{{ totalInvestidoAplicado() | number:'1.2-2' }}</td>
                      <td class="p-4">{{ totalInvestido() | number:'1.2-2' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          }

          <!-- ========== Aba Metas e Objetivos ========== -->
          @case ('metas') {
            <section>
              <h2 class="text-2xl font-semibold text-gray-700 mb-6">Metas e Objetivos</h2>
              <div class="overflow-x-auto shadow-md rounded-lg">
                <table class="w-full min-w-[700px] table-auto">
                  <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                    <tr>
                      <th class="p-4">Objetivo</th>
                      <th class="p-4">Tipo (Prazo)</th>
                      <th class="p-4">Valor Total (R$)</th>
                      <th class="p-4">Valor Acumulado (R$)</th>
                      <th class="p-4">% Concluído</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    @for (item of metas(); track $index) {
                      <tr class="hover:bg-gray-50">
                        <td class="p-4">{{ item.objetivo }}</td>
                        <td class="p-4">{{ item.tipo }}</td>
                        <td class="p-4">{{ item.valorTotal | number:'1.2-2' }}</td>
                        <td class="p-4">{{ item.valorAcumulado | number:'1.2-2' }}</td>
                        <td class="p-4">
                          <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-blue-600 h-2.5 rounded-full" [style.width.%]="(item.valorAcumulado / item.valorTotal) * 100"></div>
                          </div>
                          <span class="text-sm">{{ (item.valorAcumulado / item.valorTotal) | percent:'1.1-1' }}</span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </section>
          }

          <!-- ========== Aba Dívidas ========== -->
          @case ('dividas') {
            <section>
              <h2 class="text-2xl font-semibold text-gray-700 mb-6">Acompanhamento de Dívidas</h2>
              <div class="overflow-x-auto shadow-md rounded-lg">
                <table class="w-full min-w-[900px] table-auto">
                  <thead class="bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">
                    <tr>
                      <th class="p-4">Tipo</th>
                      <th class="p-4">Credor</th>
                      <th class="p-4">Saldo Devedor (R$)</th>
                      <th class="p-4">Juros (a.m. %)</th>
                      <th class="p-4">Parcela (R$)</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    @for (item of dividas(); track $index) {
                      <tr class="hover:bg-gray-50">
                        <td class="p-4">{{ item.tipo }}</td>
                        <td class="p-4">{{ item.credor }}</td>
                        <td class="p-4">{{ item.saldoAtual | number:'1.2-2' }}</td>
                        <td class="p-4">{{ item.taxaJurosMensal | number:'1.1-2' }}%</td>
                        <td class="p-4">{{ item.parcela | number:'1.2-2' }}</td>
                      </tr>
                    }
                    <tr class="bg-gray-100 font-bold">
                      <td class="p-4" colspan="2">TOTAL DÍVIDAS</td>
                      <td class="p-4">{{ totalDividas() | number:'1.2-2' }}</td>
                      <td class="p-4" colspan="2"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          }
        }
      </main>
    </div>
  `,
  styles: [`
    /* Estilos Globais para o componente */
    :host {
      font-family: 'Inter', sans-serif;
    }
    
    /* Estilização base da tabela para garantir consistência */
    table {
      border-collapse: collapse;
    }
    th {
      background-color: #f9fafb; /* bg-gray-50 */
    }
    th, td {
      border: 1px solid #e5e7eb; /* border-gray-200 */
    }
    /* Adicionando um leve 'zebrado' se não estiver usando hover */
    tbody tr:nth-child(even) {
      background-color: #f9fafb; /* bg-gray-50 */
    }
    tbody tr:hover {
       background-color: #f3f4f6; /* bg-gray-100 */
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
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

