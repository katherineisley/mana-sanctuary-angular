import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})

export class PageNotFoundComponent /* implements AfterViewInit */ {
  constructor() { }

  adjustHeight(): void {
    const headerHeight = $('.header').height() || 0;
    const footerHeight = $('.footer').height() || 0;
    const contentHeight = $('app-page-not-found').outerHeight(true) || 0;
    const windowHeight = $(window).height() || 0;
    // console.log("Header:", headerHeight);
    // console.log("Footer:", footerHeight);
    // console.log("Content:", contentHeight);
    // console.log("Combined:", headerHeight + footerHeight + contentHeight);
    // console.log("Window:", windowHeight);
    
    if (headerHeight + footerHeight + contentHeight < windowHeight) {
      // console.log("adjusting");
      const newHeight = windowHeight - headerHeight - footerHeight - 2 - this.getBotTopMargin($('app-page-not-found')); // the -2 comes from the border of the footer
      // console.log(newHeight);
      $('app-page-not-found').css('height', newHeight + 'px');
    }
  }

  getBotTopMargin(element: JQuery): number { // because using static values to figure out the height is a shit idea
    const marginTop = parseInt(element.css('margin-top'), 10);
    const marginBottom = parseInt(element.css('margin-bottom'), 10);
    return marginTop + marginBottom;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.adjustHeight();
    }, 1); // the size of the images don't get included when calculating the height of the contentHeight
    $(window).on('resize', () => {
      $('app-page-not-found').css('height', 'unset'); // fix potential problem where the explicitly set height might no longer be appropriate due to changes
      this.adjustHeight();
    });
  }

  ngOnDestroy(): void {
    $(window).off('resize');
  }
}