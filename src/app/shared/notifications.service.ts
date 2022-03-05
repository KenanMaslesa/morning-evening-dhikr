import { Injectable } from '@angular/core';
import {
  ILocalNotification,
  LocalNotifications,
} from '@awesome-cordova-plugins/local-notifications/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

export enum NotificationsLocalStorage {
  'minutesMorningDhikr',
  'minutesEveningDhikr',
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

  scheduleNotificationsForMonth() {
    const salahs = vaktija.getMonthlyPrayerTimes(77);
    salahs.forEach((obj, index) => {
      setTimeout(() => {
        const currentDate = new Date();
        const currentDateDay = currentDate.getDate();
        if (index >= currentDateDay) {
          const fajr = obj.prayerTimes[0];
          const asr = obj.prayerTimes[0];
          const date = obj.date;
          const notificationDate = new Date();
          notificationDate.setMonth(date.month - 1);
          notificationDate.setDate(index + 1);
          notificationDate.setHours(fajr.hours);
          notificationDate.setMinutes(fajr.minutes);
          notificationDate.setSeconds(0);
          this.scheduleNotification(
            'Jutarnji zikr test',
            'Opis za jutarnji zikr',
            index,
            notificationDate
          );
          notificationDate.setHours(asr.hours);
          notificationDate.setMinutes(asr.minutes);
          this.scheduleNotification(
            'Vecernji zikr test',
            'Opis za vecernji zikr',
            index + 40,
            notificationDate
          );
        }
      }, index * 250);
    });
  }

  private scheduleNotification(title, text, id, date: Date) {
    this.showNotification({
      title,
      text,
      id,
      sound: null,
      trigger: {
        at: date,
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
        count: 1,
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
        count: 1,
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
