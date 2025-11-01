import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { filter, of, switchMap } from 'rxjs';
import { User } from 'firebase/auth';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface NavTab {
  id: string; // Usado para a URL e para rastreamento
  label: string; // O nome exibido
  iconPath: string; // O atributo 'd' do SVG
  isActive?: boolean; // (Opcional) para controle de estado
}

@Component({
  selector: 'app-dashboard-layout-2',
  imports: [NgClass, RouterModule],
  templateUrl: './dashboard-layout-2.html',
  styleUrl: './dashboard-layout-2.css',
})
export class DashboardLayout2 {

  router = inject(Router);
  authService = inject(AuthService);
  private sanitizer = inject(DomSanitizer);
  isMobileMenuOpen = signal(false);

  // Variáveis para armazenar os dados dinâmicos
  // userPhotoUrl: string = 'https://via.placeholder.com/150/5c9afc/ffffff?text=U'; // Default
  userPhotoUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(
    'https://via.placeholder.com/150/5c9afc/ffffff?text=U'
  );
  userName: string = 'Carregando...';
  userRole: string = 'Financeiro'; // Pode ser estático ou vir de Firestore/variável

  tabs: NavTab[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      // Ícone Home
      iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    },
    // {
    //   id: 'orcamento',
    //   label: 'Orçamento',
    //   // Ícone Transações (Carteira/Livro)
    //   iconPath: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0h-2m2 0v2m0-2h2m0 0a2 2 0 01-2 2v2a2 2 0 002 2h2m-4-2h2m-2 0h-2m2 0v2m0-2h2m0 0a2 2 0 01-2 2v2a2 2 0 002 2h2'
    // },
    // {
    //   id: 'patrimonio',
    //   label: 'Patrimônio',
    //   // Ícone Relatórios (Gráfico de Barras)
    //   iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0h3a2 2 0 002-2v-6a2 2 0 00-2-2H9m0 10V9a2 2 0 012-2h2a2 2 0 012 2v10m-3-6h.01'
    // },
    // {
    //   id: 'investimentos',
    //   label: 'Investimentos',
    //   // Ícone Configurações (Engrenagem)
    //   iconPath: 'M10.325 4.317c.426-1.747 2.053-1.747 2.479 0l.542 2.213a.998.998 0 00.957.733h2.32c1.742 0 2.458 2.094 1.258 3.256l-1.84 1.41a.996.996 0 00-.363 1.118l.542 2.213c.426 1.747-1.307 2.864-2.479 2.083l-1.84-1.41a.996.996 0 00-1.118-.363l-2.213.542c-1.747.426-2.864-1.307-2.083-2.479l1.41-1.84a.996.996 0 00.363-1.118l-.542-2.213c-.426-1.747 1.307-2.864 2.479-2.083l1.84 1.41a.996.996 0 001.118-.363l2.213-.542zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
    // },
    // {
    //   id: 'metas',
    //   label: 'Metas',
    //   // Ícone Configurações (Engrenagem)
    //   iconPath: 'M10.325 4.317c.426-1.747 2.053-1.747 2.479 0l.542 2.213a.998.998 0 00.957.733h2.32c1.742 0 2.458 2.094 1.258 3.256l-1.84 1.41a.996.996 0 00-.363 1.118l.542 2.213c.426 1.747-1.307 2.864-2.479 2.083l-1.84-1.41a.996.996 0 00-1.118-.363l-2.213.542c-1.747.426-2.864-1.307-2.083-2.479l1.41-1.84a.996.996 0 00.363-1.118l-.542-2.213c-.426-1.747 1.307-2.864 2.479-2.083l1.84 1.41a.996.996 0 001.118-.363l2.213-.542zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
    // },
    // {
    //   id: 'dividas',
    //   label: 'Dívidas',
    //   // Ícone Configurações (Engrenagem)
    //   iconPath: 'M10.325 4.317c.426-1.747 2.053-1.747 2.479 0l.542 2.213a.998.998 0 00.957.733h2.32c1.742 0 2.458 2.094 1.258 3.256l-1.84 1.41a.996.996 0 00-.363 1.118l.542 2.213c.426 1.747-1.307 2.864-2.479 2.083l-1.84-1.41a.996.996 0 00-1.118-.363l-2.213.542c-1.747.426-2.864-1.307-2.083-2.479l1.41-1.84a.996.996 0 00.363-1.118l-.542-2.213c-.426-1.747 1.307-2.864 2.479-2.083l1.84 1.41a.996.996 0 001.118-.363l2.213-.542zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
    // },
    {
      id: 'planejamento-financeiro',
      label: 'Planejamento',
      // Ícone Configurações (Engrenagem)
      iconPath: 'M10.325 4.317c.426-1.747 2.053-1.747 2.479 0l.542 2.213a.998.998 0 00.957.733h2.32c1.742 0 2.458 2.094 1.258 3.256l-1.84 1.41a.996.996 0 00-.363 1.118l.542 2.213c.426 1.747-1.307 2.864-2.479 2.083l-1.84-1.41a.996.996 0 00-1.118-.363l-2.213.542c-1.747.426-2.864-1.307-2.083-2.479l1.41-1.84a.996.996 0 00.363-1.118l-.542-2.213c-.426-1.747 1.307-2.864 2.479-2.083l1.84 1.41a.996.996 0 001.118-.363l2.213-.542zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      id: 'diagnostico-financeiro',
      label: 'Diagnóstico',
      // Ícone Configurações (Engrenagem)
      iconPath: 'M10.325 4.317c.426-1.747 2.053-1.747 2.479 0l.542 2.213a.998.998 0 00.957.733h2.32c1.742 0 2.458 2.094 1.258 3.256l-1.84 1.41a.996.996 0 00-.363 1.118l.542 2.213c.426 1.747-1.307 2.864-2.479 2.083l-1.84-1.41a.996.996 0 00-1.118-.363l-2.213.542c-1.747.426-2.864-1.307-2.083-2.479l1.41-1.84a.996.996 0 00.363-1.118l-.542-2.213c-.426-1.747 1.307-2.864 2.479-2.083l1.84 1.41a.996.996 0 001.118-.363l2.213-.542zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      id: 'controle-de-gastos',
      label: 'Gastos',
      // Ícone Configurações (Engrenagem)
      iconPath: 'M10.325 4.317c.426-1.747 2.053-1.747 2.479 0l.542 2.213a.998.998 0 00.957.733h2.32c1.742 0 2.458 2.094 1.258 3.256l-1.84 1.41a.996.996 0 00-.363 1.118l.542 2.213c.426 1.747-1.307 2.864-2.479 2.083l-1.84-1.41a.996.996 0 00-1.118-.363l-2.213.542c-1.747.426-2.864-1.307-2.083-2.479l1.41-1.84a.996.996 0 00.363-1.118l-.542-2.213c-.426-1.747 1.307-2.864 2.479-2.083l1.84 1.41a.996.996 0 001.118-.363l2.213-.542zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      id: 'investimentos',
      label: 'Investimentos',
      // Ícone Configurações (Engrenagem)
      iconPath: 'M10.325 4.317c.426-1.747 2.053-1.747 2.479 0l.542 2.213a.998.998 0 00.957.733h2.32c1.742 0 2.458 2.094 1.258 3.256l-1.84 1.41a.996.996 0 00-.363 1.118l.542 2.213c.426 1.747-1.307 2.864-2.479 2.083l-1.84-1.41a.996.996 0 00-1.118-.363l-2.213.542c-1.747.426-2.864-1.307-2.083-2.479l1.41-1.84a.996.996 0 00.363-1.118l-.542-2.213c-.426-1.747 1.307-2.864 2.479-2.083l1.84 1.41a.996.996 0 001.118-.363l2.213-.542zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      id: 'perfil',
      label: 'Perfil',
      // Ícone Configurações (Engrenagem)
      iconPath: 'M10.325 4.317c.426-1.747 2.053-1.747 2.479 0l.542 2.213a.998.998 0 00.957.733h2.32c1.742 0 2.458 2.094 1.258 3.256l-1.84 1.41a.996.996 0 00-.363 1.118l.542 2.213c.426 1.747-1.307 2.864-2.479 2.083l-1.84-1.41a.996.996 0 00-1.118-.363l-2.213.542c-1.747.426-2.864-1.307-2.083-2.479l1.41-1.84a.996.996 0 00.363-1.118l-.542-2.213c-.426-1.747 1.307-2.864 2.479-2.083l1.84 1.41a.996.996 0 001.118-.363l2.213-.542zM15 12a3 3 0 11-6 0 3 3 0 016 0z'
    },
  ];

  selectedTab: any = signal<NavTab>({
    id: 'dashboard',
    label: 'Dashboard',
    // Ícone Home
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  }); // O ID da aba atualmente ativa

  constructor() { }

  ngOnInit(): void {
    // Define a aba ativa com base na URL atual
    this.router.events.subscribe(() => {
      // Exemplo simples: pega o primeiro segmento da URL
      const urlSegments = this.router.url.split('/').filter(s => s.length > 0);
      this.selectedTab = urlSegments[0] || 'dashboard'; // Default para 'dashboard'
    });

    // Escuta o Observable do usuário do AuthService
    this.authService.user$.pipe(
      filter(user => !!user), // Garante que o usuário exista
      switchMap((user: User | null) => {
        if (user && user.photoURL) {
          // 1. Atualiza o nome de forma simples
          this.userName = user.displayName || user.email?.split('@')[0] || 'Usuário NEXUS';

          // 2. 🚨 Sanitiza a URL antes de atribuir à variável
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(user.photoURL);
          this.userPhotoUrl = safeUrl;

        } else {
          this.userName = 'Convidado';
          // Mantém a imagem de placeholder (já sanitizada no início)
        }
        return of(null);
      })
    ).subscribe();
  }

  // --- Funções de Navegação ---
  selectTab(tab: any) {
    var selected: NavTab = tab;
    this.selectedTab.set(selected);
  }

  signout() {
    this.authService.signout()
      .subscribe(() => {
        this.router.navigate(['/signin']);
      });
  }

  // Função para aplicar a classe ativa
  getTabClass(tab: NavTab): string {
    const defaultClasses = 'flex items-center justify-center lg:justify-start py-3 px-4 rounded-lg transition duration-150 hover:bg-[#001940] group-hover:justify-start lg:justify-start';

    if (tab.id === this.selectedTab) {
      // Classes para o item ATIVO
      return `${defaultClasses} font-semibold text-[#5c9afc] bg-[#001940]`;
    } else {
      // Classes para o item INATIVO
      return `${defaultClasses} text-gray-300 hover:text-white`;
    }
  }

  doClick(route: string) {
    this.router.navigate(['/u/', route]);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }
}
