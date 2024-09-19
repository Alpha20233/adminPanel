import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  InputSignal,
  output,
  OutputOptions,
  signal,
  ViewChild,
} from '@angular/core';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { AsyncPipe, CommonModule, LowerCasePipe } from '@angular/common';
import { validCond } from '../../../core/models/auth.interface';
import { IconComponent } from '../icon/icon.component';
import { CommService } from '../../services/common/comm.service';

@Component({
  selector: 'datepicker',
  standalone: true,
  imports: [
    CalendarModule,
    LowerCasePipe,
    IconComponent,
    CommonModule,
    AsyncPipe,
  ],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  disabled: InputSignal<boolean> = input<boolean>(false);
  isRequired: InputSignal<boolean> = input<boolean>(false);
  isValid: InputSignal<validCond> = input<validCond>({
    cond1: false,
    form_submit: false,
  });
  datLabel: InputSignal<string> = input<string>('');
  validText: InputSignal<string> = input<string>('');
  max: InputSignal<Date> = input<Date>(new Date());
  dateChng = output<string>({ alias: 'date' });

  @ViewChild('calendar') calendar!: Calendar;

  constructor(public readonly comm: CommService) {}

  valChang(value: Date) {
    this.dateChng.emit(value.toISOString());
  }

  openCalendar() {
    this.calendar.inputfieldViewChild?.nativeElement.focus();
  }
}
