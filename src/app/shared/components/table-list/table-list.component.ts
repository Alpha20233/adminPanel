import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { tableListData } from '../../../core/models/dashboard.interface';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'table-list',
  standalone: true,
  imports: [CommonModule, TableModule,IconComponent],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableListComponent {
  data = signal<tableListData[]>([
    {
      nSno: 1,
      cCusName: 'John',
      cCusDes: 'Doe',
    },
    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },
    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },

    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },
    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },
    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },
    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },
    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },
    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },
    {
      nSno: 2,
      cCusName: 'Jane',
      cCusDes: 'Doe',
    },
    
  ])
}
