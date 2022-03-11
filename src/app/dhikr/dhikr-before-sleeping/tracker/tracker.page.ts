import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { MorningEveningTrackerService } from '../../morning-evening-tracker.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  @ViewChild('barChart') barChart;
  dhikrsByMonth = [];
  bars: any;
  themeColor: any;
  currentDate = new Date();
  selectedMonth: {
    name: string;
    value: string;
  };
  months = [
    {
      name: 'Januar',
      value: '1'
    },
    {
      name: 'Februar',
      value: '2'
    },
    {
      name: 'Mart',
      value: '3'
    },
    {
      name: 'April',
      value: '4'
    },
    {
      name: 'Maj',
      value: '5'
    },
    {
      name: 'Juni',
      value: '6'
    },
    {
      name: 'Juli',
      value: '7'
    },
    {
      name: 'August',
      value: '8'
    },
    {
      name: 'Septembar',
      value: '9'
    },
    {
      name: 'Oktobar',
      value: '10'
    },
    {
      name: 'Novembar',
      value: '11'
    },
    {
      name: 'Decembar',
      value: '12'
    }
  ];
  constructor(private morningEveningTrackerService: MorningEveningTrackerService) {
    const currentMonthNumber = this.currentDate.getMonth() + 1;
    this.selectedMonth = {
      name: this.months[currentMonthNumber].name,
      value: currentMonthNumber.toString()
    };
   }

  ngOnInit() {
    const themeColor = localStorage.getItem('theme');
    if (themeColor) {
        this.themeColor = JSON.parse(themeColor);
    }
  }

  ionViewDidEnter() {
    this.getDhikrBeforeSleeping();
  }

  getDhikrBeforeSleeping() {
      this.morningEveningTrackerService.getDhikrBeforeSleepingByMonth(this.selectedMonth.value).subscribe(response => {
      this.dhikrsByMonth = response;
      const dates = this.dhikrsByMonth.map(item => item.date);
      const counters = this.dhikrsByMonth.map(item => item.total);
    this.createBarChart(dates,counters);
    });
  }

  ionViewDidLeave()	{
    this.bars.destroy();
  }

  createBarChart(labels: any[], data: any[]) {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Vecernji zikr',
          data,
          backgroundColor: this.themeColor,
          borderColor: 'gray',
          borderWidth: 1,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
              beginAtZero: true,
              max: 14, //number of evening dhikrs
              min: 0,
              ticks: {
                stepSize: 1,
                autoSkip: false
            }
          },
      },
      },
    });
  }

  onMonthChanged(month) {
    this.selectedMonth.value = month;
    this.bars.destroy();
    this.getDhikrBeforeSleeping();
  }
}
