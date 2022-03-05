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
      bosnian:
        'Nema boga osim Allaha, Jedinoga, Koji druga nema. Njemu pripada vlast nad svim i sva pohvala. On sve može.',
      counter: 0,
    },
  ];
  dhikrsFromStorage = [];
  constructor() {
    this.selectedDhikr = {counter: 0};

    const dhikrsFromStorage = localStorage.getItem('dhikrs');
    if (dhikrsFromStorage) {
      this.dhikrsFromStorage = JSON.parse(dhikrsFromStorage);
    }
    if (this.dhikrsFromStorage.length > 0) {
      this.dhikrsFromStorage.filter((item) => {
        const currentDate = this.getCurrentDateAsString(new Date());
        if (item.date === currentDate) {
          this.dhikrs = item.dhikrs;
        }
      });
    }
    else {
      const obj = {
        date: this.getCurrentDateAsString(new Date()),
        dhikrs: this.dhikrs,
      };
      this.dhikrsFromStorage.push(obj);
      localStorage.setItem('dhikrs', JSON.stringify(this.dhikrsFromStorage));
    }
  }

  getCurrentDateAsString(date: Date) {
    return (
      date.getDate().toString() +
      '.' +
      (date.getMonth() + 1).toString() +
      '.' +
      date.getFullYear().toString()
    );
  }

  increaseCounter() {
    this.selectedDhikr.counter++;
    const obj = {
      date: this.getCurrentDateAsString(new Date()),
      dhikrs: this.dhikrs,
    };
    let added = false;
    if (this.dhikrsFromStorage && !added) {
      this.dhikrsFromStorage.forEach((item) => {
        if (item.date === this.getCurrentDateAsString(new Date())) {
          item.dhikrs = this.dhikrs;
          added = true;
        }
      });
    }
    if (!added) {
      this.dhikrsFromStorage.push(obj);
    }
    localStorage.setItem('dhikrs', JSON.stringify(this.dhikrsFromStorage));
    localStorage.setItem('selectedDhikr', JSON.stringify(this.selectedDhikr));
  }

  setSelectedDhikr(dhikr) {
    this.selectedDhikr = dhikr;
    localStorage.setItem('selectedDhikr', JSON.stringify(this.selectedDhikr));
  }

  resetCounter() {
    this.selectedDhikr.counter = -1;
    localStorage.setItem('dhikrs', JSON.stringify(this.dhikrsFromStorage));
    localStorage.setItem('selectedDhikr', JSON.stringify(this.selectedDhikr));
  }
}
