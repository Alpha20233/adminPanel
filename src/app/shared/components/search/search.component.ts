import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
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
  maxlength = input<number>(80);

  constructor() {}
}
