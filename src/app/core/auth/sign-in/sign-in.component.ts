import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { CommService } from '../../../shared/services/common/comm.service';
import { signin } from '../../models/auth.interface';
import { IndexDBService } from '../../../shared/services/indexDB/index-db.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    InputComponent,
    ReactiveFormsModule,
    CheckboxModule,
    FormsModule,
    ButtonComponent,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit {
  frm!: FormGroup;
  checked = model<boolean>(true);
  form_submit = signal<boolean>(false);

  constructor(public readonly comm: CommService, private readonly router: Router, private readonly indexDB: IndexDBService) { }

  ngOnInit(): void {
    this.frm = new FormGroup({
      cEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
      ]),
      cPass: new FormControl('', Validators.required),
    });
  }

  async submit() {
    debugger
    this.form_submit.set(true);
    if (this.frm.invalid) return;
    const formData: signin = this.frm.value;
    
    const values = [formData];
    const isAdmin = values.map((x) => x.cEmail === 'admin@gmail.com' && x.cPass === 'admin@123' ? true : false);
    console.warn('admin', isAdmin[0]);
    const res = await this.indexDB.getUserByEmail(formData.cEmail, formData.cPass ,isAdmin[0])
    if (res) {
      if(isAdmin[0]){
        localStorage.setItem('userDetail', JSON.stringify(res));
      }
      this.form_submit.set(false);
      this.router.navigate(['/dashboard']);
      this.frm.reset();
    }else{
     console.warn('Invalid Credentials');
    }
  }
}
