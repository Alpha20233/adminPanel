import { ChangeDetectionStrategy, Component, inject, signal, Signal, ViewChild, viewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { DropdownModule } from 'primeng/dropdown';
import { MenuItem } from '../../models/dashboard.interface';
import { InsertUpdateComponent } from '../../../shared/components/insert-update/insert-update.component';
import { MatDialog } from '@angular/material/dialog';
import { signup } from '../../models/auth.interface';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
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
      { route: '/dashboard', name: 'Dashboard', iconName: 'home', active: true },
      { route: '/dashboard/customer', name: 'Customers', iconName: 'building' },
      { route: '/dashboard/users', name: 'Users', iconName: 'users' },
      { route: '/dashboard/projects', name: 'Projects', iconName: 'folder' },
      { route: '/dashboard/services', name: 'Services', iconName: 'list' },
      { route: '/dashboard/time-entries', name: 'Team Entries', iconName: 'clock' },
      { route: '/dashboard/time-memb', name: 'Team Members', iconName: 'users' },
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

  userDetail = signal<signup>({ cEmail: '', cName: '', cPass: '', bCheck: false })


  @ViewChild('drawer') drawer: any;

  private breakpointObserver = inject(BreakpointObserver);

  constructor(private readonly route: Router, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.isActive(this.route.url);
    this.currUser();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );



  isActive(url: string) {
    debugger
    this.menuItems().map(x => x.route == url ? x.active = true : x.active = false);
  }

  logout() {
    this.route.navigate(['/auth/signin']);
    localStorage.clear();
  }

  currUser() {
    this.userDetail.set(JSON.parse(localStorage.getItem('userDetail') || '{}'));
  }

  profile(): void {
    const dialogRef = this.dialog.open(InsertUpdateComponent, {
      data: { cPermission: 'P', data: this.userDetail(), isClose: false },
      minHeight: '444px',
      minWidth: '444px',
      maxHeight: '444px',
      maxWidth: '444px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.isClose) {
        this.currUser();
      }
    });
  }
}
