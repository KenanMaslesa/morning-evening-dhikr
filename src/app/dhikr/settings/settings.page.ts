import { Component } from '@angular/core';
import { GeoLocationService } from 'src/app/shared/geolocation.service';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { PrayerTimesService } from 'src/app/shared/prayer-times.service';
import { DhikrLocalStoarge, DhikrService } from '../../shared/dhikr.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  dhikrLocalStoarge = DhikrLocalStoarge;
  colors = [
    '#04b3ef',
    '#36cbff',
    '#43a9b8',
    '#45c3c3',
    '#e592a1',
    'pink',
  ];
  constructor(
    public dhikrService: DhikrService,
    public notificationsService: NotificationsService,
    public prayerTimesService: PrayerTimesService,
    private geoLocationService: GeoLocationService
  ) {}

  ionViewWillLeave() {
    this.notificationsService.scheduleNotifications();
  }

  getHoursAndMinutesFromDate(date: Date) {
    const hours = date?.getHours();
    const hoursString = hours < 10 ? '0' + hours : hours;

    const minutes = date?.getMinutes();
    const minutesString = minutes < 10 ? '0' + minutes : minutes;

    return hoursString + ':' + minutesString;
  }

  getMinutesBetweenDates(date1: Date, date2: Date) {
    const difference = date1?.getTime() - date2?.getTime(); // This will give difference in milliseconds
    const resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes;
  }

  getNotificationTime(dateOfPrayerTime: Date, minutes: number) {
    const date = new Date(dateOfPrayerTime);
    date.setMinutes(date.getMinutes() + minutes);
    return this.getHoursAndMinutesFromDate(date);
  }

  scheduleNotifications(isToggleEnabled: boolean) {
    if (isToggleEnabled) {
      this.notificationsService.scheduleNotifications();
    }
  }

  getLocationAndPrayerTimes(isToggleEnabled: boolean) {
    if (isToggleEnabled) {
      this.geoLocationService.getCurrentLocation();
    }
  }

  onColorChanged(color) {
    localStorage.setItem('theme', JSON.stringify(color));
    document.documentElement.style.setProperty(
      `--ion-color-primary`,
      `${color}`
    );
  }
}
