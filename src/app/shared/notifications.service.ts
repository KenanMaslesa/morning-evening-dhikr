import { Injectable } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications,
} from '@awesome-cordova-plugins/local-notifications/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { PrayerTimesService } from './prayer-times.service';

export enum NotificationsLocalStorage {
  'minutesMorningDhikr',
  'minutesEveningDhikr',
  'isNotificationEnabled'
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  minutesMorningDhikr: number;
  minutesEveningDhikr: number;
  isNotificationEnabled: boolean;
  constructor(
    private localNotifications: LocalNotifications,
    private vibration: Vibration,
    private prayerTimesService: PrayerTimesService
  ) {
    this.setInitialValues();
  }

  setInitialValues() {
    const minutesMorningDhikr = localStorage.getItem(
      NotificationsLocalStorage[NotificationsLocalStorage.minutesMorningDhikr]
    );
    const minutesEveningDhikr = localStorage.getItem(
      NotificationsLocalStorage[NotificationsLocalStorage.minutesEveningDhikr]
    );

    const isNotificationEnabled = localStorage.getItem(
      NotificationsLocalStorage[NotificationsLocalStorage.isNotificationEnabled]
    );

    if (minutesMorningDhikr) {
      this.minutesMorningDhikr = JSON.parse(minutesMorningDhikr);
    }

    if (minutesEveningDhikr) {
      this.minutesEveningDhikr = JSON.parse(minutesEveningDhikr);
    }

    if (isNotificationEnabled) {
      this.isNotificationEnabled = JSON.parse(isNotificationEnabled);
    }
    else {
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

  getMorningDhikrNotificationTime(): Date {
    let date;
    if(this.prayerTimesService.prayerTimes) {
      date = new Date(this.prayerTimesService.prayerTimes.fajr);
    }
    else {
      date = new Date();
      date.setHours(0);
      date.setMinutes(57);
    }
    return date;
  }

  getEveningDhikrNotificationTime(): Date {
    let date;
    if(this.prayerTimesService.prayerTimes){
      date = new Date(this.prayerTimesService.prayerTimes.asr);
    }
    else {
      date = new Date();
      date.setHours(1);
      date.setMinutes(0);
    }
    return date;
  }

  scheduleNotifications() {
    if (this.isNotificationEnabled) {
      const morningDhikrNotificationTime =
        this.getMorningDhikrNotificationTime();

      const eveningDhikrNotificationTime =
        this.getEveningDhikrNotificationTime();

      this.scheduleNotificationForMorningDhikr(
        morningDhikrNotificationTime.getHours(),
        morningDhikrNotificationTime.getMinutes()
      );

      this.scheduleNotificationForEveningDhikr(
        eveningDhikrNotificationTime.getHours(),
        eveningDhikrNotificationTime.getMinutes()
      );
    }
  }

  showNotification(notification: ILocalNotification) {
    this.localNotifications.schedule(notification);
  }

  private scheduleNotificationForMorningDhikr(hour = 6, minute = 30) {
    this.showNotification({
      title: `Vrijeme je za jutarnji zikr`,
      text: 'Zapocni dan spominjanjem Allaha Uzvisenog i tako se zastiti i u svoj zivot unesi bereket',
      id: 10,
      sound: null,
      trigger: {
        every: {
          hour,
          minute,
        },
        count: 366,
      },
      led: 'FF0000',
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
      title: `Vrijeme je za vecernji zikr`,
      text: 'Zavrsi dan spominjanjem Allaha Uzvisenog i tako se zastiti i u svoj zivot unesi bereket',
      id: 11,
      sound: null,
      trigger: {
        every: {
          hour,
          minute,
        },
        count: 365,
      },
      led: { color: '#FF00FF', on: 500, off: 500 },
      badge: 1,
      vibrate: true,
      lockscreen: true,
      foreground: true,
      sticky: true,
      priority: 2,
    });
  }
}
