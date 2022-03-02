import { Injectable } from '@angular/core';
const adhan = require('adhan');

@Injectable({providedIn: 'root'})
export class PrayerTimesService {
  prayerTimes: any;
  constructor() {
    const prayerTimes = localStorage.getItem('prayerTimes');
    if(prayerTimes) {
      this.prayerTimes = JSON.parse(prayerTimes);
    }
  }

  getPrayerTimes(latitude, longitude){
    const date = new Date();
    const coordinates = new adhan.Coordinates(latitude, longitude);
    const params = adhan.CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
    this.prayerTimes = prayerTimes;
    localStorage.setItem('prayerTimes', JSON.stringify(prayerTimes));
    return prayerTimes;
  }
}
