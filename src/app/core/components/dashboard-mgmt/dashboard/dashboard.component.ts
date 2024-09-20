import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { filtitem, tabRows } from '../../../models/dashboard.interface';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { DatepickerComponent } from '../../../../shared/components/datepicker/datepicker.component';
import { SearchComponent } from "../../../../shared/components/search/search.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ChartViewComponent } from "../../../../shared/components/chart-view/chart-view.component";
import { TableListComponent } from "../../../../shared/components/table-list/table-list.component";
import { IndexDBService } from '../../../../shared/services/indexDB/index-db.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IconComponent, DatepickerComponent, SearchComponent, ButtonComponent, ChartViewComponent, TableListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  fillItems = signal<filtitem[]>(
    [
      { name: 'Status', iconName: 'clock' },
      { name: 'Customers', iconName: 'building' },
      { name: 'Projects', iconName: 'folder' },
      { name: 'Users', iconName: 'user' },
    ]
  )

  searchValue = signal<string>('');

  readonly tabRows = signal<tabRows[]>(
    [{ name: 'No.', }, { name: 'Customer Name', sortable: true }, { name: 'Notes', sortable: true }, { name: 'Action', sortable: true }]
  )
  readonly tabData = signal<any[]>([]);

  constructor(private readonly indexDB: IndexDBService) { }

  async getAllCustomers() {
    const customers = await this.indexDB.getAllCustomers();
    this.tabData.set(customers);
  }
}
