import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { PrayerTimesService } from './prayer-times.service';

@Injectable({providedIn: 'root'})
export class GeoLocationService {
  geolocationData: any;

  constructor(private geolocation: Geolocation, private prayertimesService: PrayerTimesService) {
    const geolocationFromStorage = localStorage.getItem('geolocation');
    if (geolocationFromStorage != null) {
      this.geolocationData = JSON.parse(geolocationFromStorage);
      this.prayertimesService.getPrayerTimes(this.geolocationData.latitude, this.geolocationData.longitude);
    }
  }

  getCurrentLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log(resp.coords.latitude + ' ' + resp.coords.longitude);
        this.geolocationData = resp.coords;
        localStorage.setItem(
          'geolocation',
          JSON.stringify({
            latitude: resp.coords.latitude,
            longitude: resp.coords.longitude,
          })
        );
        this.prayertimesService.getPrayerTimes(resp.coords.latitude, resp.coords.longitude);
      })
      .catch((error) => {
        alert('Error getting location: ' + JSON.stringify(error));
      });
  }
}
