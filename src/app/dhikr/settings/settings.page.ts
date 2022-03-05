import { Component } from '@angular/core';
import { NotificationsService } from 'src/app/shared/notifications.service';
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
    public notificationsService: NotificationsService
  ) {}

  onColorChanged(color) {
    localStorage.setItem('theme', JSON.stringify(color));
    document.documentElement.style.setProperty(
      `--ion-color-primary`,
      `${color}`
    );
  }
}
