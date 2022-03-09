import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { TasbeehService } from '../tasbeeh.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit {
  constructor(
    private notificationsService: NotificationsService,
    public tasbeehService: TasbeehService
  ) {}

  ngOnInit() {}

  increaseCounter() {
    this.tasbeehService.increaseCounter();
    if (
      this.tasbeehService.selectedDhikr.counter === 33 ||
      this.tasbeehService.selectedDhikr.counter === 66 ||
      this.tasbeehService.selectedDhikr.counter === 100
    ) {
      this.notificationsService.vibrate(200);
    } else {
      this.notificationsService.vibrate(50);
    }
  }

  resetCounter() {
    this.notificationsService.vibrate(500);
    this.tasbeehService.resetCounter();
  }
}
