import { Component, AfterViewInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-healing',
  templateUrl: './healing.component.html',
  styleUrls: ['./healing.component.scss']
})

export class HealingComponent implements AfterViewInit {
  constructor() { }

  adjustHeight(): void {
    const headerHeight = $('.header').height() || 0;
    const footerHeight = $('.footer').height() || 0;
    const contentHeight = $('app-healing').outerHeight(true) || 0;
    const windowHeight = $(window).height() || 0;
    // console.log("Header:", headerHeight);
    // console.log("Footer:", footerHeight);
    // console.log("Content:", contentHeight);
    // console.log("Combined:", headerHeight + footerHeight + contentHeight);
    // console.log("Window:", windowHeight);
    
    if (headerHeight + footerHeight + contentHeight < windowHeight) {
      // console.log("adjusting");
      const newHeight = windowHeight - headerHeight - footerHeight - 2 - this.getBotTopMargin($('app-healing')); // the -2 comes from the border of the footer
      // console.log(newHeight);
      $('app-healing').css('height', newHeight + 'px');
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
    }, 1); // the size of images don't included when calculating the height of the contentHeight
    $(window).on('resize', () => {
      $('app-healing').css('height', 'unset'); // fix potential problem where the explicitly set height might no longer be appropriate due to changes
      this.adjustHeight();
    });
  }

  ngOnDestroy(): void {
    $(window).off('resize');
  }
}
