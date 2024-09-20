import { Component, signal } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { TableListComponent } from "../../../../shared/components/table-list/table-list.component";
import { signup } from '../../../models/auth.interface';
import { tabRows } from '../../../models/dashboard.interface';
import { InsertUpdateComponent } from '../../../../shared/components/insert-update/insert-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ButtonComponent, TableListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  isRefresh = signal<boolean>(false);
  readonly tabRows = signal<tabRows[]>(
    [{ name: 'No.', }, { name: 'User Name', sortable: true }, { name: 'Email', sortable: true }, { name: 'Action', sortable: true }]
  )
  readonly tabData = signal<any[]>([]);

  constructor(private dialog: MatDialog) { }

  addUser(): void {
    const dialogRef = this.dialog.open(InsertUpdateComponent, {
      data: { isClose: false, cPermission: 'UN' },
      minHeight: '444px',
      minWidth: '444px',
      maxHeight: '444px',
      maxWidth: '444px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.isClose) {
        this.isRefresh.set(!this.isRefresh());
      }
    });
  }
}
