import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  signal,
} from '@angular/core';

@Component({
  selector: 'icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  name: InputSignal<string> = input.required<string>();
  type: InputSignal<string> = input<string>('primary');
  addCls: InputSignal<string> = input<string>('');

  public readonly iconName = computed(() => {
    return `'${this.iconList[this.name()]}'`;
  });

  iconList: Record<string, string> = {
    'eye': '\uE000',
    'eye-off': '\uE001',
    'logout': '\uE002',
    'home': '\uE003',
    'building': '\uE004',
    'folder': '\uE005',
    'list': '\uE006',
    'clock': '\uE007',
    'user': '\uE008',
    'users': '\uE009',
    'euro': '\uE00A',
    'date': '\uE00B',
    'play': '\uE00C',
    'menu': '\uE00D',
    'calendar': '\uE00E',
    'search': '\uE00F',
    'edit': '\uE010',
    'delete': '\uE012',
  };
}
