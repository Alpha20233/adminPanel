import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { chartData, charttype } from '../../../core/models/dashboard.interface';

@Component({
  selector: 'chart-view',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './chart-view.component.html',
  styleUrl: './chart-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartViewComponent {
  heading = input.required<string>();
  chartData = input<chartData[]>();
  dataCount = input.required<number[]>();
  bgColor = input.required<string[]>();
  hovBgColor = input.required<string[]>();
  chartType = input<charttype>('doughnut');


  data: any;
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      datasets: [
        {
          data: this.dataCount(),
          backgroundColor: this.bgColor(),
          hoverBackgroundColor: this.hovBgColor()
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
        , tooltip: {
          enabled: false
        }
      }
    };
  }
}
