import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { TasbeehService } from '../tasbeeh.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit {
  counter = 0;
  constructor(private notificationsService: NotificationsService, public tasbeehService: TasbeehService) { }

  ngOnInit() {
  }

  increaseCounter() {
    if(this.tasbeehService.selectedDhikr.counter === 33 || this.tasbeehService.selectedDhikr.counter === 100) {
      this.notificationsService.vibrate(80);
    }
    else {
      this.notificationsService.vibrate(50);
    }
    this.tasbeehService.increaseCounter();
  }

  resetCounter(){
    this.counter = -1;
    this.notificationsService.vibrate(100);
    this.tasbeehService.resetCounter();
  }

}
