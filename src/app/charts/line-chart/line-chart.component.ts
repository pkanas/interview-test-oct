import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
  @Input() data: { date: string; value: number }[] = [];
  
  private svg!: any;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };
  private width = 600 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;

  ngOnInit() {
    this.createSvg();
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && !changes['data'].isFirstChange()) {
      this.drawChart(); 
    }
  }

  private createSvg(): void {
    this.svg = d3.select('.chart-container')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private drawChart(): void {
    if (!this.svg) return;
    this.svg.selectAll('*').remove(); 


    if (this.data.length === 0) {
      return; 
    }

    const x = d3.scaleTime()
      .domain(d3.extent(this.data, d => new Date(d.date)) as [Date, Date])
      .range([0, this.width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.value) || 0]) 
      .nice()
      .range([this.height, 0]);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    this.svg.append('g')
      .call(d3.axisLeft(y));

    const line = d3.line<{ date: string; value: number }>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value));

    this.svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
}
