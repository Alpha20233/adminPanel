import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { addCustomer, tableListData } from '../../../core/models/dashboard.interface';
import { IconComponent } from '../icon/icon.component';
import { IndexDBService } from '../../services/indexDB/index-db.service';
import { signup } from '../../../core/models/auth.interface';
import { InsertUpdateComponent } from '../insert-update/insert-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'table-list',
  standalone: true,
  imports: [CommonModule, TableModule, IconComponent],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableListComponent {
  isRefresh = input<boolean>(false);
  data = signal<any[]>([]);


  constructor(private readonly indexDB: IndexDBService, private readonly cdr: ChangeDetectorRef, private readonly dialog: MatDialog) {
    effect(() => {
      if (this.isRefresh() || !this.isRefresh()) {
        this.getAllCustomers();
      }
    });
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  async getAllCustomers() {
    const res = await this.indexDB.getAllCustomers();
    this.data.set(res);
  }


  async updateCustomer(data: addCustomer) {
    const dialogRef = this.dialog.open(InsertUpdateComponent, {
      data: { isClose: false, cPermission: 'E', data: data },
      minHeight: '444px',
      minWidth: '444px',
      maxHeight: '444px',
      maxWidth: '444px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isClose) {
        this.getAllCustomers();
      }
    });
  }


  async deleteCustomer(id: number) {
    const res = await this.indexDB.deleteCustomer(id);
    if (res) {
      this.getAllCustomers();
    }
  }


}
