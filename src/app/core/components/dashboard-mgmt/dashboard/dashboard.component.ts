import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { filtitem } from '../../../models/dashboard.interface';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { DatepickerComponent } from '../../../../shared/components/datepicker/datepicker.component';
import { SearchComponent } from "../../../../shared/components/search/search.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { ChartViewComponent } from "../../../../shared/components/chart-view/chart-view.component";
import { TableListComponent } from "../../../../shared/components/table-list/table-list.component";

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

}
