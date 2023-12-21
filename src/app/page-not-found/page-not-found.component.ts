import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})

export class PageNotFoundComponent implements AfterViewInit {
  constructor() { }

  adjustHeight(): void {
    const headerHeight = $('.header').height();
    const footerHeight = $('.footer').height();
    const windowHeight = $(window).height();
    if (windowHeight && headerHeight && footerHeight) {
      const newHeight = windowHeight - headerHeight - footerHeight - 2; // the -2 comes from the border of the footer
      console.log(newHeight);
      $('app-page-not-found').css('height', newHeight + 'px');
    }
  }

  ngAfterViewInit(): void {
    this.adjustHeight();
    $(window).on('resize', () => this.adjustHeight());
  }

  ngOnDestroy(): void {
    $(window).off('resize');
  }
}