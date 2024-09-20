import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { addCustomer, permissionType, sortOrder, tableListData, tabRows, UpdateData } from '../../../core/models/dashboard.interface';
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
  tabRows = input.required<tabRows[]>();
  tabData = input.required<string>();
  searchValue = input<string>('');
  rowsCount = input<number>(5);

  sortOrder = signal<sortOrder>('asc');
  data = signal<any[]>([]);


  filteredData = computed(() => {
    if (this.searchValue()) {
      return this.data().filter((item) =>
        item.cName.toLowerCase().includes(this.searchValue().toLowerCase())
      );
    }
    return this.data();
  });


  constructor(private readonly indexDB: IndexDBService, private readonly cdr: ChangeDetectorRef, private readonly dialog: MatDialog) {
    effect(() => {
      if (this.isRefresh() || !this.isRefresh()) {
        this.getAllListData();
      }
    });
  }


  ngOnInit(): void {
    // this.getAllListData();
  }

  async getAllListData() {
    const method = this.indexDB[this.tabData() as keyof IndexDBService] as Function;
    const res = await method.call(this.indexDB);
    this.data.set(res);
  }


  async update(data: UpdateData, cPermission: permissionType) {
    const dialogRef = this.dialog.open(InsertUpdateComponent, {
      data: { isClose: false, cPermission: cPermission, data: data },
      minHeight: '444px',
      minWidth: '444px',
      maxHeight: '444px',
      maxWidth: '444px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.isClose) {
        this.getAllListData();
      }
    });
  }


  async delete(id: number, name: string) {
    const method = await this.indexDB[name as keyof IndexDBService] as Function;
    const res = await method.call(this.indexDB, id, name);
    if (res) {
      this.getAllListData();
    }
  }


  sort() {
    this.data.update(data => {
      const sortedData = [...data].sort((a, b) => 
        this.sortOrder() === 'asc' ? b.id - a.id : a.id - b.id
      );
      this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
      return sortedData;
    });
  }



}
