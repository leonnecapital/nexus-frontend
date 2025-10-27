import { Routes } from '@angular/router';
import { Signin } from './components/signin/signin';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
    },
    {
        path: 'signin',
        pathMatch: 'full',
        loadComponent: () => import('./components/signin/signin').then(m => m.Signin)
    }
];
