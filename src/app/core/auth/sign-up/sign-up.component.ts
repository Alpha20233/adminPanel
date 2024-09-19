import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Router, RouterLink } from '@angular/router';


import { CommService } from '../../../shared/services/common/comm.service';
import { signup } from '../../models/auth.interface';
import { IndexDBService } from '../../../shared/services/indexDB/index-db.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    CheckboxModule,
    ButtonComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgOptimizedImage,
    AsyncPipe,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  public frm!: FormGroup;
  public checked = model<boolean>(false);
  public form_submit = signal<boolean>(false);

  constructor(public readonly comm: CommService, private readonly router: Router, private readonly indexDB: IndexDBService) {
    effect(() => {
      this.frm.get('bCheck')?.setValue(this.checked(), { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.frm = new FormGroup({
      cName: new FormControl('', Validators.required),
      cEmail: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ),
      ]),
      cPass: new FormControl('', Validators.required),
      bCheck: new FormControl(this.checked(), Validators.requiredTrue),
    });


  }

   async submit() {
    debugger
    this.form_submit.set(true);
    if (this.frm.invalid) return;
    const formData: signup = this.frm.value;
    const res = await this.indexDB.addUser(formData);
    if (res) {
      this.form_submit.set(false);
      this.router.navigate(['/dashboard']);
      this.frm.reset();
    }
  }
}
