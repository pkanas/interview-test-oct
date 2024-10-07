import { Component } from '@angular/core';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [LineChartComponent, BarChartComponent,TranslateModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
  lineChartData = [
    { date: '2024-01-01', value: 120 },
    { date: '2024-01-02', value: 150 },
    { date: '2024-01-03', value: 90 },
    { date: '2024-01-04', value: 200 },
    { date: '2024-01-05', value: 300 },
    { date: '2024-01-06', value: 250 },
    { date: '2024-01-07', value: 400 },
  ];
  

  barChartData = [
    { label: 'Product A', value: 150 },
    { label: 'Product B', value: 200 },
    { label: 'Product C', value: 120 },
    { label: 'Product D', value: 80 },
    { label: 'Product E', value: 300 },
    { label: 'Product F', value: 90 },
    { label: 'Product G', value: 250 },
  ];
  
}
