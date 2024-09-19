import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { DropdownModule } from 'primeng/dropdown';
import { MenuItem } from '../../models/dashboard.interface';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    IconComponent, NgOptimizedImage,
    DropdownModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  menuItems = signal<MenuItem[]>(
    [
      { route: '', name: 'Dashboard', iconName: 'home', active: true },
      { route: '/dashboard/customer', name: 'Customers', iconName: 'building' },
      { route: '/dashboard/projects', name: 'Projects', iconName: 'folder' },
      { route: '/dashboard/services', name: 'Services', iconName: 'list' },
      { route: '/dashboard/time-entries', name: 'Time Entries', iconName: 'clock' },
      { route: '/dashboard/time-memb', name: 'Time Members', iconName: 'users' },
      { route: '/dashboard/teams', name: 'Teams', iconName: 'users' },
      { route: '/dashboard/rate', name: 'Hourly Rates', iconName: 'euro' },
      { route: '/dashboard/absenseReq', name: 'Absense requests', iconName: 'date' },
    ]
  )
  dropOpt = signal<{ name: string }[]>(
    [
      { name: 'Proj1' },
      { name: 'Proj2' },
    ]
  )

  private breakpointObserver = inject(BreakpointObserver);

  constructor(private readonly route:Router){}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



   isActive(name:string) {
     this.menuItems().map(x => x.name == name ? x.active = true : x.active = false );
  }

  logout(){
    this.route.navigate(['/auth/signin']);
  }
}
