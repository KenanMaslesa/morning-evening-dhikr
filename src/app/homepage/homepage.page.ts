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
      url: '/morning-dhikr',
      icon: 'sunny-outline'
    },
    {
      title: 'Vecernji zikr',
      url: '/evening-dhikr',
      icon: 'moon-outline'
    },
    {
      title: 'Zikr prije spavanja',
      url: '/dhikr-before-sleeping',
      icon: 'bed-outline'
    },
    {
      title: 'Zikrilo',
      url: '/tasbeeh',
      icon: 'finger-print-outline'
    },
    {
      title: 'O zikru',
      url: '/benefits',
      icon: 'information-circle-outline'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
