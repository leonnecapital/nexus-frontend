import { Routes } from '@angular/router';
import { Signin } from './components/signin/signin';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'signIn',
        pathMatch: 'full'
    },
    {
        path: 'signIn',
        pathMatch: 'full',
        loadComponent: () => import('./components/signin/signin').then(m => m.Signin)
    },
    {
        path: 'dashboard',
        pathMatch: 'full',
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'plans',
        pathMatch: 'full',
        loadComponent: () => import('./components/plans/plans').then(m => m.Plans)
    }
];
