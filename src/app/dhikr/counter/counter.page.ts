import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/shared/notifications.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit {
  counter = 0;
  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  increaseCounter() {
    this.counter++;
    this.notificationsService.vibrate(50);
  }

  resetCounter(){
    this.counter = 0;
    this.notificationsService.vibrate(80);
  }

}
