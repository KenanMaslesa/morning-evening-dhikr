import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TasbeehService } from '../tasbeeh.service';

@Component({
  selector: 'app-dhikrs',
  templateUrl: './dhikrs.page.html',
  styleUrls: ['./dhikrs.page.scss'],
})
export class DhikrsPage implements OnInit {
  constructor(public tasbeehService: TasbeehService, public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dodajte zikr',
      inputs: [
        {
          name: 'dhikr',
          type: 'text',
          placeholder: 'Unesite zikr'
        }
      ],
      buttons: [
        {
          text: 'Zatvori',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Spremi',
          handler: (alertData) => {
            console.log(alertData.dhikr);
            this.tasbeehService.addDhikr({arabic: alertData.dhikr, counter: 0});
          }
        }
      ]
    });

    await alert.present();
  }
}
