import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { NotificationsService } from './shared/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showIntroPage = true;
  appUrl = 'https://play.google.com/store/apps/details?id=com.keno.zikr';
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
      title: 'Upute za korištenje',
      url: '/introduction',
      icon: 'information-circle',
    },
    {
      title: 'Ocjeni nas na Google Play',
      url: null,
      externalUrl: this.appUrl,
      icon: 'star',
    },
    {
      title: 'Podijeli',
      url: '',
      externalUrl: null,
      share: true,
      icon: 'share',
    },
    {
      title: 'Postavke',
      url: '/settings',
      icon: 'settings',
    },
  ];
  constructor(private notificationService: NotificationsService, private router: Router, private socialSharing: SocialSharing) {
    this.notificationService.scheduleNotifications();

    const showIntroPage = localStorage.getItem('showIntroPage');
    if(showIntroPage === null) {
      localStorage.setItem('showIntroPage', JSON.stringify(false));
      this.router.navigate(['/introduction']);
    }

    const themeColor = localStorage.getItem('theme');
    const themeBackgroundColor = localStorage.getItem('themeBackgroundColor');
    if (themeColor) {
      document.documentElement.style.setProperty(
        `--ion-color-primary`,
        `${JSON.parse(themeColor)}`
      );
    }
    else {
      localStorage.setItem('theme', JSON.stringify('#536a9e'));
    }
    if (themeBackgroundColor) {
      document.documentElement.style.setProperty(
        `--background-color`,
        `${JSON.parse(themeBackgroundColor)}`
      );
    }
  }

  shareApp() {
    this.socialSharing.share('','','',this.appUrl);
  }

  rateApp() {
    window.location.href = this.appUrl;
  }
}
