import { Component } from '@angular/core';
import { NotificationsService } from './shared/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  pages = [
    {
      title: 'Jutarnji zikr',
      url: '/morning-dhikr',
      icon: 'sunny',
    },
    {
      title: 'Večernji zikr',
      url: '/evening-dhikr',
      icon: 'moon',
    },
    {
      title: 'Zikr prije spavanja',
      url: '/dhikr-before-sleeping',
      icon: 'bed',
    },
    {
      title: 'Zikrilo',
      url: '/tasbeeh',
      icon: 'finger-print',
    },
    {
      title: 'Postavke',
      url: '/settings',
      icon: 'settings',
    },
  ];
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
    else {
      localStorage.setItem('theme', '#536a9e');
    }
    if (themeBackgroundColor) {
      document.documentElement.style.setProperty(
        `--background-color`,
        `${JSON.parse(themeBackgroundColor)}`
      );
    }
  }
}
