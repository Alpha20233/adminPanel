import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      },
      {
        path: 'customer',
        loadComponent: () =>
          import('../../components/dashboard-mgmt/customer/customer.component').then(
            (mod) => mod.CustomerComponent,
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
