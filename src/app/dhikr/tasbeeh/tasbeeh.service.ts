import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TasbeehService {
  selectedDhikr: any;
  dhikrs = [
    {
      arabic: 'لَٓا إِلٰهَ إِلَّا اللّٰهُ',
      bosnian: 'Nema boga osim Allaha',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'سُبْحَانَ اللَّهِ',
      bosnian: 'Slavljen neka je Allah',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'الْحَمْدُ لِلَّهِ',
      bosnian: 'Hvala Allahu',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'اللَّهُ أَكْبَرُ',
      bosnian: 'Allah je najveci',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ',
      bosnian: 'Allahu moj oprosti mi',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'اللَّهُــمَّ صَلِّ وَسَـــلِّمْ على نَبِيِّنَـــا مُحمَّد',
      bosnian: 'O Allahu, blagoslovi našeg poslanika Muhammeda ﷺ.',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِه',
      bosnian: 'Slavljen je Allah i Njemu pripada sva hvala',
      counter: 0,
      favorite: false
    },
    {
      arabic:
        'لا إِلَهَ إِلاّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ، وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِير',
      bosnian:
        'Nema boga osim Allaha, Jedinoga, Koji druga nema. Njemu pripada vlast nad svim i sva pohvala. On sve može.',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'أَسْتَغْفِرُ اللّٰهَ الْعَظِیْمَ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'لَٓا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'لَٓا إِلَهَ إِلّاَ اللّٰهُ مُحَمَّدٌ رَسُوْلُ اللّٰهِ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'اَللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic: 'سُبْحَانَ اللّٰهِ وَ بِحَمْدِهِ ، سُبْحَانَ اللّٰهِ الْعَظِيْمِ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic:
        'سُبْحَانَ اللّٰهِ ، وَالْحَمْدُلِلّٰهِ ، وَ لَٓا إِلَهَ إِلّاَ اللّٰهُ ، وَ اللّٰهُ أَكْبَرُ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic:
        'اَللّٰهُمَّ إِنَّكَ عَفُوٌّ كَرِيْمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic:
        'لَٓا إِلَهَ إِلّاَ أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِيْنَ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic:
        'أَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ الَّذِي لَٓا إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّوْمُ وَ أَتُوْبُ إِلَيْهِ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
    {
      arabic:
        'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ  اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
      bosnian: '',
      counter: 0,
      favorite: false
    },
  ];
  dhikrsFromStorage = [];
  constructor() {
    this.selectedDhikr = { counter: 0 };

    const dhikrsFromStorage = localStorage.getItem('dhikrs');
    if (dhikrsFromStorage) {
      this.dhikrsFromStorage = JSON.parse(dhikrsFromStorage);
    }
    if (this.dhikrsFromStorage.length > 0) {
      this.dhikrsFromStorage.filter((item) => {
        const currentDate = this.getCurrentDateAsString(new Date());
        if (item.date === currentDate) {
          this.dhikrs = item.dhikrs.sort((a, b) => b.favorite - a.favorite);;
        }
      });
    } else {
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

  toggleFavorite(dhikr, value: boolean) {
    this.dhikrs.forEach(item => {
      if(item.arabic === dhikr.arabic){
        item.favorite = value? true: false;
      }
    });
    localStorage.setItem('dhikrs', JSON.stringify(this.dhikrsFromStorage));
    localStorage.setItem('selectedDhikr', JSON.stringify(this.selectedDhikr));
  }

  getDhikrsByMonth(month: string) {
    return this.dhikrsFromStorage.filter(item => this.getMonthFromDate(item.date) === month);
  }

  getParticularDhikrByMonth(selectedDhikr: any, month: string){
    const dhikrsByDate = this.dhikrsFromStorage.filter(item => this.getMonthFromDate(item.date) === month);
    const dhikrs = []; const dates = [];
    dhikrsByDate.forEach(item => {
      dates.push(item.date);
      item.dhikrs.forEach(dhikr => {
        if(dhikr.arabic === selectedDhikr.arabic){
          dhikrs.push(dhikr);
        }
      });
    });
    const obj = {
      labels: dates,
      data: dhikrs.map(item => item.counter)
    };
    return obj;
  }

  getMonthFromDate(date: string){
    const month = date.split('.')[1];
    return month;
  }
}
