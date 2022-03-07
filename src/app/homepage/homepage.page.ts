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
      icon: 'sunny-outline',
    },
    {
      title: 'Večernji zikr',
      url: '/evening-dhikr',
      icon: 'moon-outline',
    },
    {
      title: 'Zikr prije spavanja',
      url: '/dhikr-before-sleeping',
      icon: 'bed-outline',
    },
    {
      title: 'Zikrilo',
      url: '/tasbeeh',
      icon: 'finger-print-outline',
    },
    // {
    //   title: 'O zikru',
    //   url: '/benefits',
    //   icon: 'information-circle-outline',
    // },
    {
      title: 'Postavke',
      url: '/settings',
      icon: 'settings-outline',
    },
  ];

  ayahs = [
    '“Sjećajte se vi Mene, i Ja ću se vas sjetiti, i zahvaljujte Mi, i na blagodatima Mojim nezahvalni nemojte biti." (El-Bekara 152)',
    '“I spominji Gospodara svoga ujutro i naveče u sebi, ponizno i sa strahopoštovanjem i ne podižući jako glas, i ne budi nemaran.” (El-Araf 205)',
    '“O vjernici, često Allaha spominjite i hvalite i ujutro i naveče ga veličajte.” (Ahzab:41)',
    '“O, vjernici, neka vas imanja vaša i djeca vaša ne zabave od sjećanja na Allaha. Oni koji to dopuste, bit će izgubljeni.” (El-Munafikun 9)',
    '„I muškarcima koji mnogo spominju Allaha i ženama koje mnogo spominju Allaha, Allah je, doista, za sve njih oprost i veliku nagradu pripremio“ (El-Ahzab, 35).',
    ' „O vi koji vjerujete, Allaha mnogo spominjite“ (El-Ahzab, 41)',
    'Allahov Poslanik, s.a.v.s., kaže: „Neka ti jezik bude neprestalno navlažen spominjanjem Allaha.“',
    '“I veličaj Gospodara svoga  i zahvaljuj Mu prije sunčeva izlaska i prije zalaska.” (Kaf:39)',
    '“Pa hvaljen neka je Allah, kad god omrknete i kad god osvanete.” (Rum:17)',
    '”Primjer onoga koji zikr čini (spominje) svoga Gospodara i onoga koji ga ne spominje je kao primjer živog i mrtvog.”',
  ];
  ayah: string;
  constructor() {}

  ngOnInit() {
    this.ayah = this.ayahs[this.randomNum()];
  }

  randomNum() {
    return Math.floor(Math.random() * (this.ayahs.length - 0)) + 0; // You can remove the Math.floor if you don't want it to be an integer
  }
}
