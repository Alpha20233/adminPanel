import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { TableListComponent } from "../../../../shared/components/table-list/table-list.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { MatDialog } from '@angular/material/dialog';
import { InsertUpdateComponent } from '../../../../shared/components/insert-update/insert-update.component';

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
  
  constructor(private readonly dialog: MatDialog) { }

  addCust(): void {
    const dialogRef = this.dialog.open(InsertUpdateComponent, {
      data: {isClose:false,cPermission:'N'},
      minHeight:'444px',
      minWidth:'444px',
      maxHeight:'444px',
      maxWidth:'444px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.isClose){
        this.isRefresh.set(!this.isRefresh());
      }
    });
  }

 
}
