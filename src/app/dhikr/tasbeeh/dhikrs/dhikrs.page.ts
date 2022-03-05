import { Component, OnInit } from '@angular/core';
import { TasbeehService } from '../tasbeeh.service';
@Component({
  selector: 'app-dhikrs',
  templateUrl: './dhikrs.page.html',
  styleUrls: ['./dhikrs.page.scss'],
})
export class DhikrsPage implements OnInit {
  constructor(public tasbeehService: TasbeehService) { }

  ngOnInit() {
  }
}
