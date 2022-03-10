import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';
import { MediaPlayerService } from 'src/app/shared/media-player.service';
import { DhikrService } from '../../shared/dhikr.service';
import { DhikrType, MorningEveningTrackerService } from '../morning-evening-tracker.service';

@Component({
  selector: 'app-evening-dhikr',
  templateUrl: 'evening-dhikr.page.html',
})
export class EveningDhikrPage implements OnInit {
  eveningDhikrs: any;
  dhikrType = DhikrType.eveningDhikr;
  todaysDhikrCounters: any[];

  constructor(
    private eveningDhikrsService: DhikrService,
    private mediaPlayerService: MediaPlayerService,
    private morningEveningTrackerService: MorningEveningTrackerService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.getEveningDhikr();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.eveningDhikrsService.eveningDhikrPageEntered.next(true);
    }, 100);
  }

  ionViewDidLeave() {
    this.mediaPlayerService.removePlayer();
  }

  getEveningDhikr() {
    this.morningEveningTrackerService.getTodaysEveningDhikrCounters().subscribe(response => {
      this.todaysDhikrCounters = response;
      this.eveningDhikrsService.getEveningDhikr().subscribe((dhikrs) => {
        if(this.todaysDhikrCounters.length > 0){
          dhikrs.forEach(dhikr => {
            dhikr.counter = this.getCounterForTodaysDhikr(dhikr);
          });
        }
        this.eveningDhikrs = dhikrs;
      });
    });
  }

  getCounterForTodaysDhikr(dhikr){
    return this.todaysDhikrCounters.filter(item => item.id === dhikr.id)?.map(item => item.counter)[0];
  }

  async presentModal() {
    const morningDhikrs = this.morningEveningTrackerService.morningDhikrsFromStorage;
    const modal = await this.modalController.create({
      component: ChartComponent,
      cssClass: 'my-custom-class',
      initialBreakpoint: 0.6,
      componentProps: {
        labels: morningDhikrs.map(item => item.date),
        data: morningDhikrs.map(item => item.total)
      }
    });
    return await modal.present();
  }
}
