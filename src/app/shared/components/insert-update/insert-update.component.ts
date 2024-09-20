import { ChangeDetectionStrategy, Component, Inject, Optional, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../input/input.component";
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { IndexDBService } from '../../services/indexDB/index-db.service';
import { addCustomer } from '../../../core/models/dashboard.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { signup } from '../../../core/models/auth.interface';

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
  public frm2!: FormGroup;
  public form_submit = signal<boolean>(false);
  public form_submit2 = signal<boolean>(false);
  userDetail: any;


  constructor(private readonly indexDB: IndexDBService, private readonly dialog: MatDialogRef<InsertUpdateComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { isClose: boolean, cPermission: string, data: any }) {
  }


  ngOnInit(): void {
    if (this.data.cPermission === 'CN' || this.data.cPermission === 'CE') {
      this.frm = new FormGroup({
        cName: new FormControl('', Validators.required),
        cNotes: new FormControl('', Validators.required),
      });
    }

    if (this.data.cPermission === 'P' || this.data.cPermission === 'UN' || this.data.cPermission === 'UE') {
      this.frm2 = new FormGroup({
        cName: new FormControl('', Validators.required),
        cEmail: new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ),
        ]),
        cPass: new FormControl('', Validators.required),
      });

    }

    if (this.data.cPermission === 'P' || this.data.cPermission === 'UE') {
      this.frm2.patchValue({
        cName: this.data.data.cName,
        cEmail: this.data.data.cEmail,
        cPass: this.data.data.cPass,
      });
    }

    if (this.data.data && this.data.cPermission === 'CE') {
      this.frm.patchValue({
        cName: this.data.data.cName,
        cNotes: this.data.data.cNotes,
      });
    }

    this.refetchLocal();
  }

  async addUpdate(flag: string) {
    this.form_submit.set(true);
    if (this.frm.invalid) return;
    const frmData: addCustomer = this.frm.value;
    let res;
    if (flag === 'add') {
      res = await this.indexDB.addCustomer(frmData);
    } else {
      res = await this.indexDB.updateCustomer(this.data.data.id, frmData);
    }
    if (res) {
      this.form_submit.set(false);
      this.data.isClose = true;
      this.dialog.close(this.data);
      this.frm.reset();
    }
  }

  async updateProfile() {
    debugger
    this.form_submit2.set(true);
    if (this.frm2.invalid) return;
    const frmData2: signup = this.frm2.value;
    let res;
    if (this.userDetail.cRole === 'admin') {
      const model = {
        id:1,
        cName: this.frm2.value.cName,
        cEmail: this.frm2.value.cEmail,
        cPass: this.frm2.value.cPass,
        cRole: this.userDetail.cRole
      }
      res = await this.indexDB.updateAdmin(model);
    } else {
      res = await this.indexDB.updateProfile(this.data.data.id, frmData2);
    }
    console.warn('update profile', res);
    if (res) {
      this.form_submit.set(false);
      this.data.isClose = true;
      this.dialog.close(this.data);
      this.refetchLocal();
    }
  }


  async addUpdateUser(flag: string) {
    this.form_submit2.set(true);
    if (this.frm2.invalid) return;
    const frmData2: signup = this.frm2.value;
    let res;
    if (flag === 'add') {
      res = await this.indexDB.addUser(frmData2);
    } else {
      res = await this.indexDB.updateUser(this.data.data.id, frmData2);
    }
    console.warn('add user', res);
    if (res) {
      this.form_submit.set(false);
      this.data.isClose = true;
      this.dialog.close(this.data);
    }
  }


  refetchLocal() {
    this.userDetail = JSON.parse(localStorage.getItem('userDetail') || '{}');
  }

}
