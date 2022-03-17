import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;
  sliderActiveIndex: number;
  sliderLength: number;

  constructor() { }

  ngOnInit() {
    this.setSliderLength();
    this.getSliderActiveIndex();
  }

  slideNext() {
    this.slides.slideNext();
  }

  slidePrev() {
    this.slides.slidePrev();
  }

  getSliderActiveIndex() {
    this.slides.getActiveIndex().then((index: number) => {
      this.sliderActiveIndex = index;
    });
  }

  setSliderLength() {
    this.slides.length().then((index: number) => {
      this.sliderLength = index;
    });
  }

  slideChanged() {
    this.getSliderActiveIndex();
  }

}
