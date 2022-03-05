import { Component, OnInit } from '@angular/core';
import { TasbeehService } from '../tasbeeh.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  dhikrs: any;
  constructor(public tasbeehService: TasbeehService) { }

  ngOnInit() {
    this.dhikrs = this.tasbeehService.dhikrsFromStorage;
  }

}
