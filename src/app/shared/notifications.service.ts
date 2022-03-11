import { Injectable } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications,
} from '@awesome-cordova-plugins/local-notifications/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

export enum NotificationsLocalStorage {
  'isNotificationEnabled',
}
const vaktija = require('@kmaslesa/vaktija');
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  minutesMorningDhikr: number;
  minutesEveningDhikr: number;
  isNotificationEnabled: boolean;
  constructor(
    private localNotifications: LocalNotifications,
    private vibration: Vibration
  ) {
    this.setInitialValues();
  }

  setInitialValues() {
    const isNotificationEnabled = localStorage.getItem(
      NotificationsLocalStorage[NotificationsLocalStorage.isNotificationEnabled]
    );

    if (isNotificationEnabled) {
      this.isNotificationEnabled = JSON.parse(isNotificationEnabled);
    } else {
      this.isNotificationEnabled = true;
    }
  }

  isNotificationEnabledChanged(value: boolean) {
    this.isNotificationEnabled = value;
    localStorage.setItem(
      NotificationsLocalStorage[
        NotificationsLocalStorage.isNotificationEnabled
      ],
      JSON.stringify(value)
    );
  }

  vibrate(duration: number) {
    this.vibration.vibrate(duration);
  }

  showNotification(notification: ILocalNotification) {
    this.localNotifications.schedule(notification);
  }

  scheduleNotifications() {
    this.localNotifications.cancelAll();
    this.localNotifications.clearAll();

    if(this.isNotificationEnabled){
      const salahs = vaktija.getDailyPrayerTimes(77);
      const fajr = salahs.prayerTimes[0];
      const asr = salahs.prayerTimes[3];
      this.scheduleNotificationForMorningDhikr(fajr.hours, fajr.minutes);
      this.scheduleNotificationForEveningDhikr(asr.hours, asr.minutes);
    }
  }

  private scheduleNotificationForMorningDhikr(hour = 6, minute = 30) {
    this.showNotification({
      title: `Vrijeme je za jutarnji zikr`,
      text: 'Započni dan spominjanjem Allaha Uzvišenog i tako se zaštiti i u svoj život unesi sreću i bereket',
      id: 10,
      trigger: {
        every: {
          hour,
          minute,
        },
        count: 10,
      },
      badge: 1,
      vibrate: true,
      lockscreen: true,
      foreground: true,
      sticky: true,
      priority: 2,
    });
  }

  private scheduleNotificationForEveningDhikr(hour = 15, minute = 30) {
    this.showNotification({
      title: `Vrijeme je za večernji zikr`,
      text: 'Završi dan spominjanjem Allaha Uzvišenog i tako se zaštiti i u svoj život unesi sreću i bereket',
      id: 11,
      trigger: {
        every: {
          hour,
          minute,
        },
        count: 10,
      },
      badge: 1,
      vibrate: true,
      lockscreen: true,
      foreground: true,
      sticky: true,
      priority: 2,
    });
  }
}
