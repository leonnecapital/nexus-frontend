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
        path: 'dashboard',
        pathMatch: 'full',
        loadComponent: () => import('./modules/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'plans',
        pathMatch: 'full',
        loadComponent: () => import('./modules/plans/plans').then(m => m.Plans)
    }
];
