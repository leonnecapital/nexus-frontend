import { Routes } from '@angular/router';
import { Signin } from './modules/signin/signin';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    },
    {
        path: 'signin',
        pathMatch: 'full',
        loadComponent: () => import('./modules/signin/signin').then(m => m.Signin)
    },
    {
        path: 'signup',
        pathMatch: 'full',
        loadComponent: () => import('./modules/signup/signup').then(m => m.Signup)
    },
    {
        path: 'forgot-password',
        pathMatch: 'full',
        loadComponent: () => import('./modules/forgot-password/forgot-password').then(m => m.ForgotPassword)
    },
    {
        path: 'u',
        loadComponent: () => import('./layouts/dashboard-layout-2/dashboard-layout-2').then(m => m.DashboardLayout2),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./modules/dashboard/dashboard').then(m => m.Dashboard)
            },
            {
                path: 'diagnostico-financeiro',
                loadComponent: () => import('./modules/diagnostico-financeiro/diagnostico-financeiro').then(m => m.DiagnosticoFinanceiro)
            },
            {
                path: 'investimentos',
                loadComponent: () => import('./modules/investimentos/investimentos').then(m => m.Investimentos)
            },
            {
                path: 'planejamento-financeiro',
                loadComponent: () => import('./modules/planejamento-financeiro/planejamento-financeiro').then(m => m.PlanejamentoFinanceiro)
            },
            {
                path: 'controle-de-gastos',
                loadComponent: () => import('./modules/controle-de-gastos/controle-de-gastos').then(m => m.ControleDeGastos)
            },
            {
                path: 'perfil',
                loadComponent: () => import('./modules/profile/profile').then(m => m.Profile)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'plans',
        pathMatch: 'full',
        loadComponent: () => import('./modules/plans/plans').then(m => m.Plans)
    }
];
