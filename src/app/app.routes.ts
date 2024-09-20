import { Routes } from '@angular/router';
import { authGuard } from './core/utility/guards/auth.guard';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./core/modules/auth/auth.module').then((mod) => mod.AuthModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./core/modules/dashboard/dashboard.module').then((mod) => mod.DashboardModule),
      },
];
