import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild('barChart') barChart;
  @Input() labels: any;
  @Input() data: any;
  @Input() selectedDhikr: any;
  bars: any;
  themeColor: any;
  constructor() { }

  ngOnInit() {
    const themeColor = localStorage.getItem('theme');
    if (themeColor) {
        this.themeColor = JSON.parse(themeColor);
    }
  }

  ionViewDidEnter() {
    this.createBarChart(this.labels, this.data);
  }

  createBarChart(labels: any[], data: any[]) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',//bar
      data: {
        labels,
        datasets: [{
          label: 'Zikr',
          data,
          backgroundColor: this.themeColor,
          borderColor: 'gray',
          borderWidth: 1,
          fill: true
        }]
      },
      // options: {
      //   indexAxis: 'y',
      // }
      options: {
        scales: {
          y: {
              beginAtZero: true
          }
      }
      },
    });
  }

}
