import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'search',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  placeholder = input.required<string>();
  inptValue = output<string>();
  maxlength = input<number>(80);

  constructor() { }

  inputValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inptValue.emit(target.value);
  }
}
