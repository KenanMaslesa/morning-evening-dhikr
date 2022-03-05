import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TasbeehService {
  selectedDhikr: any;
  dhikrs = [
    {
      arabic: 'سُبْحَانَ اللَّهِ',
      bosnian: 'Slavljen neka je Allah',
      counter: 0,
    },
    {
      arabic: 'الْحَمْدُ لِلَّهِ',
      bosnian: 'Hvala Allahu',
      counter: 0,
    },
    {
      arabic: 'اللَّهُ أَكْبَرُ',
      bosnian: 'Allah je najveci',
      counter: 0,
    },
    {
      arabic: 'اللَّهُــمَّ صَلِّ وَسَـــلِّمْ على نَبِيِّنَـــا مُحمَّد ﷺ ',
      bosnian: 'O Allahu, blagoslovi našeg poslanika Muhammeda ﷺ.',
      counter: 0,
    },
    {
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِه',
      bosnian: 'Slavljen je Allah i Njemu pripada sva hvala',
      counter: 0,
    },
    {
      arabic:
        'لا إِلَهَ إِلاّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِير',
      bosnian: 'Nema boga osim Allaha, Jedinoga, Koji druga nema. Njemu pripada vlast nad svim i sva pohvala. On sve može.',
      counter: 0,
    },
  ];
  constructor() {
    const dhikrs = localStorage.getItem('dhikrs');
    const selectedDhikr = localStorage.getItem('selectedDhikr');
    if (dhikrs) {
      this.dhikrs = JSON.parse(dhikrs);
    }
    if (selectedDhikr) {
      const selectedDhikr2 = JSON.parse(selectedDhikr);
      this.selectedDhikr = this.dhikrs.filter(
        (item) => item.arabic === selectedDhikr2.arabic
      )[0];
    } else {
      this.selectedDhikr = {counter: 0};
    }
  }

  increaseCounter() {
    this.selectedDhikr.counter++;
    localStorage.setItem('dhikrs', JSON.stringify(this.dhikrs));
    localStorage.setItem('selectedDhikr', JSON.stringify(this.selectedDhikr));
  }

  setSelectedDhikr(dhikr) {
    this.selectedDhikr = dhikr;
    localStorage.setItem('selectedDhikr', JSON.stringify(this.selectedDhikr));
  }

  addDhikr(dhikr) {
    this.dhikrs.push(dhikr);
    localStorage.setItem('dhikrs', JSON.stringify(this.dhikrs));
  }

  deleteDhikr(dhikr) {
    this.dhikrs = this.dhikrs.filter(item => item.arabic !== dhikr.arabic);
    localStorage.setItem('dhikrs', JSON.stringify(this.dhikrs));
  }

  resetCounter() {
    this.selectedDhikr.counter = 0;
    localStorage.setItem('dhikrs', JSON.stringify(this.dhikrs));
    localStorage.setItem('selectedDhikr', JSON.stringify(this.selectedDhikr));
  }
}
