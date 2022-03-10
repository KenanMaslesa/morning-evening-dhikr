import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';
import { MediaPlayerService } from 'src/app/shared/media-player.service';
import { DhikrService } from '../../shared/dhikr.service';
import { DhikrType, MorningEveningTrackerService } from '../morning-evening-tracker.service';

@Component({
  selector: 'app-morning-dhikr',
  templateUrl: 'morning-dhikr.page.html',
})
export class MorningDhikrPage implements OnInit {
  morningDhikrs: any;
  todaysDhikrCounters: any[];
  dhikrType = DhikrType.morningDhikr;

  constructor(
    private morningDhikrService: DhikrService,
    private mediaPlayerService: MediaPlayerService,
    private modalController: ModalController,
    private morningEveningTrackerService: MorningEveningTrackerService
  ) {}

  ngOnInit(): void {
    this.getMorningDhikr();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.morningDhikrService.morningDhikrPageEntered.next(true);
    }, 100);
  }

  ionViewDidLeave() {
    this.mediaPlayerService.removePlayer();
  }

  getMorningDhikr() {
    this.morningEveningTrackerService.getTodaysMorningDhikrCounters().subscribe(response => {
      this.todaysDhikrCounters = response;
      this.morningDhikrService.getMorningDhikr().subscribe((dhikrs) => {
        if(this.todaysDhikrCounters.length > 0){
          dhikrs.forEach(dhikr => {
            dhikr.counter = this.getCounterForTodaysDhikr(dhikr);
          });
        }
        this.morningDhikrs = dhikrs;
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
