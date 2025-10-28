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
        loadComponent: () => import('./modules/signin/signin').then(m => m.Signin)
    },
    {
        path: 'signup',
        loadComponent: () => import('./modules/signup/signup').then(m => m.Signup)
    },
    {
        path: 'forgot-password',
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
