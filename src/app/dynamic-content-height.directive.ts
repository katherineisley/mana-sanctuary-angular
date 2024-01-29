import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDynamicContentHeight]'
})

export class DynamicContentHeightDirective implements AfterViewInit {
  private resizeListener!: Function;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.adjustHeight();
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.renderer.setStyle(this.el.nativeElement, 'height', 'unset'); // fix potential problem where the explicitly set height might no longer be appropriate due to changes
      this.adjustHeight();
    });
  }

  private adjustHeight(): void {
    const headerHeight = $('.header').height() || 0;
    const footerHeight = $('.footer').height() || 0;
    const contentHeight = $(this.el.nativeElement).outerHeight(true) || 0;
    const windowHeight = $(window).height() || 0;
    // console.log("Header:", headerHeight);
    // console.log("Footer:", footerHeight);
    // console.log("Content:", contentHeight);
    // console.log("Combined:", headerHeight + footerHeight + contentHeight);
    // console.log("Window:", windowHeight);
    
    if (headerHeight + footerHeight + contentHeight < windowHeight) {
      // console.log("adjusting");
      const newHeight = windowHeight - headerHeight - footerHeight - 2 - this.getBotTopMargin(); // the -2 comes from the border of the footer
      // console.log(newHeight);
      this.renderer.setStyle(this.el.nativeElement, 'height', `${newHeight}px`);
    }
  }

  private getBotTopMargin(): number {
    const style = window.getComputedStyle(this.el.nativeElement);
    const marginTop = parseInt(style.marginTop, 10);
    const marginBottom = parseInt(style.marginBottom, 10);
    return marginTop + marginBottom;
  }
}