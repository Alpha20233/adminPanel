import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  input,
  InputSignal,
  signal, OnInit,
} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent  {
  disabled: InputSignal<boolean> = input<boolean>(false);
  type = input<'solid' | 'red'>('solid');

  private readonly baseClasses =
    'tw-w-full tw-justify-center tw-text-sm tw-rounded-lg tw-h-8  tw-border-none tw-shadow-none tw-px-3 tw-font-light';


  public readonly buttonClasses = computed(() => {
    const classes = [this.baseClasses];
    if(this.type() === 'red') classes.push('tw-bg-red-500/95');
    if (this.disabled()) classes.push('tw-pointer-events-none');
    return classes.join(' ');
  });

  constructor(private readonly primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

}
