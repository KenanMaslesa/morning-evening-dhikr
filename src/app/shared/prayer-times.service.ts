import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
const adhan = require('adhan');

@Injectable({providedIn: 'root'})
export class PrayerTimesService {
  prayerTimes: any;
  constructor() {
  }

  getPrayerTimes(latitude = 43.8490146, longitude = 18.3829904): Observable<any>{
    const date = new Date();
    const coordinates = new adhan.Coordinates(latitude, longitude);
    const params = adhan.CalculationMethod.MuslimWorldLeague();
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
    this.prayerTimes = prayerTimes;
    return of(prayerTimes);
  }
}
