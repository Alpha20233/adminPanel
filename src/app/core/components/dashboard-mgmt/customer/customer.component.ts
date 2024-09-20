import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { TableListComponent } from "../../../../shared/components/table-list/table-list.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { MatDialog } from '@angular/material/dialog';
import { InsertUpdateComponent } from '../../../../shared/components/insert-update/insert-update.component';
import { addCustomer, tabRows } from '../../../models/dashboard.interface';
import { IndexDBService } from '../../../../shared/services/indexDB/index-db.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, TableListComponent, ButtonComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerComponent {
  isRefresh = signal<boolean>(false);
  readonly tabRows = signal<tabRows[]>(
    [{ name: 'No.', }, { name: 'Customer Name', sortable: true }, { name: 'Notes', sortable: true }, { name: 'Action', sortable: true }]
  )
  readonly tabData = signal<any[]>([]);

  constructor(private readonly dialog: MatDialog, private readonly indexDB: IndexDBService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  addCust(): void {
    const dialogRef = this.dialog.open(InsertUpdateComponent, {
      data: { isClose: false, cPermission: 'CN' },
      minHeight: '444px',
      minWidth: '444px',
      maxHeight: '444px',
      maxWidth: '444px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.isClose) {
        this.isRefresh.set(!this.isRefresh());
      }
    });
  }

  async getAllCustomers() {
    const customers = await this.indexDB.getAllCustomers();    
    this.tabData.set(customers);
    console.log('tabData after set:', this.tabData());
  }


}
