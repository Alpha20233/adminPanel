import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../utility/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../components/dashboard-mgmt/layout.component').then(
        (mod) => mod.LayoutComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () =>
          import('../../components/dashboard-mgmt/dashboard/dashboard.component').then(
            (mod) => mod.DashboardComponent,
          ),
          canActivate: [authGuard]
      },
      {
        path: 'customer',
        loadComponent: () =>
          import('../../components/dashboard-mgmt/customer/customer.component').then(
            (mod) => mod.CustomerComponent,
          ),
        canActivate: [authGuard]
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../../components/dashboard-mgmt/user/user.component').then(
            (mod) => mod.UserComponent,
          ),
        canActivate: [authGuard]
      },
      {
        path: 'userMsg',
        loadComponent: () =>
          import('../../components/dashboard-mgmt/user-msg/user-msg.component').then(
            (mod) => mod.UserMsgComponent,
          ),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}
