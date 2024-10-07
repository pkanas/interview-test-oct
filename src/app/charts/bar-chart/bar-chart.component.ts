import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  @Input() data!: { label: string; value: number }[];

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
    this.svg = d3.select('.bar-chart-container')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private drawChart(): void {
    if (!this.svg) {
      console.error("SVG is not initialized.");
      return; 
    }

    this.svg.selectAll('*').remove(); 

    if (!this.data || this.data.length === 0) {
      console.warn("No data available to render the chart.");
      return; 
    }


    const filteredData = this.data.filter(d => d.value !== undefined);


    const x = d3.scaleBand()
      .domain(filteredData.map(d => d.label))
      .range([0, this.width])
      .padding(0.1);

    const yMax = d3.max(filteredData, d => d.value) || 0;

    const y = d3.scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([this.height, 0]);


    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    this.svg.append('g')
      .call(d3.axisLeft(y));


    this.svg.selectAll('.bar')
      .data(filteredData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => x(d.label)! as number) 
      .attr('y', (d: any) => y(d.value)! as number)
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => this.height - y(d.value!))
      .attr('fill', 'steelblue');
  }
}
