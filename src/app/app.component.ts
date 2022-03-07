import { Component } from '@angular/core';
import { NotificationsService } from './shared/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private notificationService: NotificationsService) {
    this.notificationService.scheduleNotificationsForMonth();

    const themeColor = localStorage.getItem('theme');
    const themeBackgroundColor = localStorage.getItem('themeBackgroundColor');
    if (themeColor) {
      document.documentElement.style.setProperty(
        `--ion-color-primary`,
        `${JSON.parse(themeColor)}`
      );
    }
    if (themeBackgroundColor) {
      document.documentElement.style.setProperty(
        `--background-color`,
        `${JSON.parse(themeBackgroundColor)}`
      );
    }
  }
}
