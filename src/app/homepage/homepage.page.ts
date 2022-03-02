import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  cards = [
    {
      title: 'Jutarnji zikr',
      url: '/morning-dhikr'
    },
    {
      title: 'Vecernji zikr',
      url: '/evening-dhikr'
    },
    {
      title: 'Zikr prije spavanja',
      url: '/dhikr-before-sleeping'
    },
    {
      title: 'Zikrilo',
      url: '/counter'
    },
    {
      title: 'Koristi zikra',
      url: '/benefits'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
