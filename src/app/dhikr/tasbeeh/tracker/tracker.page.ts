import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TasbeehService } from '../tasbeeh.service';
import { Chart, registerables } from 'chart.js'; Chart.register(...registerables);
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart;
  dhikrs: any;
  bars: any;
  themeColor: any;
  constructor(public tasbeehService: TasbeehService) { }

  ngOnInit() {
    this.dhikrs = this.tasbeehService.dhikrsFromStorage;

    const themeColor = localStorage.getItem('theme');
    if (themeColor) {
        this.themeColor = JSON.parse(themeColor);
    }
  }

  ngAfterViewInit() {
    this.daily();
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

  daily(){
    const dates = this.dhikrs.map(item => item.date);
    const counters = this.dhikrs.map(item => {
      let total = 0;
      item.dhikrs.forEach(element => {
        total += element.counter;
      });
      return total;
    });
    this.createBarChart(dates, counters);
  }
}
