import { ChangeDetectionStrategy, Component, Inject, Optional, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../input/input.component";
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { IndexDBService } from '../../services/indexDB/index-db.service';
import { addCustomer } from '../../../core/models/dashboard.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-insert-update',
  standalone: true,
  imports: [InputComponent, CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './insert-update.component.html',
  styleUrl: './insert-update.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsertUpdateComponent {
  public frm!: FormGroup;
  public form_submit = signal<boolean>(false);

  constructor(private readonly indexDB: IndexDBService, private readonly dialog: MatDialogRef<InsertUpdateComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { isClose: boolean, cPermission: string, data: addCustomer }) {
    console.warn('data', data);

  }


  ngOnInit(): void {
    this.frm = new FormGroup({
      cName: new FormControl('', Validators.required),
      cNotes: new FormControl('', Validators.required),
    });

    if (this.data.data && this.data.cPermission === 'E') {
      this.frm.patchValue({
        cName: this.data.data.cName,
        cNotes: this.data.data.cNotes,
      });
    }
  }

  async addCust() {
    this.form_submit.set(true);
    if (this.frm.invalid) return;
    const frmData: addCustomer = this.frm.value;
    const res = await this.indexDB.addCustomer(frmData);
    console.warn('insert', res);
    if (res) {
      this.form_submit.set(false);
      this.data.isClose = true;
      this.dialog.close(this.data);
      this.frm.reset();
    }
  }

  async updateCust() {
    this.form_submit.set(true);
    if (this.frm.invalid) return;
    const frmData: addCustomer = this.frm.value;
    const res = await this.indexDB.updateCustomer(this.data.data.id, frmData);
    console.warn('update', res);
    if (res) {
      this.form_submit.set(false);
      this.data.isClose = true;
      this.dialog.close(this.data);
      this.frm.reset();
    }
  }

}
