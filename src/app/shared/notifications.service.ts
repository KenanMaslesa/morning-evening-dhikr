import { Injectable } from '@angular/core';
import {
  ELocalNotificationTriggerUnit,
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
      this.isNotificationEnabled = false; //disabled by default
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
      const isha = salahs.prayerTimes[5];
      this.scheduleNotificationForMorningDhikr(fajr.hours, fajr.minutes);
      this.scheduleNotificationForEveningDhikr(asr.hours, asr.minutes);
      this.scheduleNotificationForDhikrBeforeSleeping(isha.hours, isha.minutes);
    }
  }

  private scheduleNotificationForMorningDhikr(hour = 6, minute = 30) {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    this.showNotification({
      title: `Vrijeme je za jutarnji zikr`,
      text: 'Zapo??ni dan spominjanjem Allaha Uzvi??enog i tako se za??titi i u svoj ??ivot unesi sre??u i bereket',
      id: 10,
      trigger: {
        every: ELocalNotificationTriggerUnit.DAY,
        count: 5,
        firstAt: date
      },
      badge: 1,
      vibrate: true,
      lockscreen: true,
      foreground: false,
      sticky: true,
      priority: 2,
    });
  }

  private scheduleNotificationForEveningDhikr(hour = 15, minute = 30) {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    this.showNotification({
      title: `Vrijeme je za ve??ernji zikr`,
      text: 'Zavr??i dan spominjanjem Allaha Uzvi??enog i tako se za??titi i u svoj ??ivot unesi sre??u i bereket',
      id: 11,
      trigger: {
        every: ELocalNotificationTriggerUnit.DAY,
        count: 5,
        firstAt: date
      },
      badge: 1,
      vibrate: true,
      lockscreen: true,
      foreground: false,
      sticky: true,
      priority: 2,
    });
  }

  private scheduleNotificationForDhikrBeforeSleeping(hour = 22, minute = 0) {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    this.showNotification({
      title: `Vrijeme je za zikr prije spavanja`,
      text: 'Allah ti se smilovao, prou??i zikr prije spavanja da bude?? siguran na dunjaluku i ahiretu',
      id: 12,
      trigger: {
        every: ELocalNotificationTriggerUnit.MINUTE,
        count: 5,
        firstAt: date
      },
      badge: 1,
      vibrate: true,
      lockscreen: true,
      foreground: false,
      sticky: true,
      priority: 2,
    });
  }
}
