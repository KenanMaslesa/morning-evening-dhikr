import { Component } from '@angular/core';
import { NotificationsService } from './shared/notifications.service';
import { PrayerTimesService } from './shared/prayer-times.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private notificationService: NotificationsService,
    private prayerTimesService: PrayerTimesService
  ) {
    this.prayerTimesService.getPrayerTimes().subscribe(() => {
      this.notificationService.scheduleNotifications();
    });

    const themeColor = localStorage.getItem('theme');
    if (themeColor) {
      document.documentElement.style.setProperty(
        `--ion-color-primary`,
        `${JSON.parse(themeColor)}`
      );
    }
  }
}
