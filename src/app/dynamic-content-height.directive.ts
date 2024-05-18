import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Directive({
  selector: '[appDynamicContentHeight]'
})

export class DynamicContentHeightDirective {
  private resizeListener!: Function;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) { }

  ngAfterViewInit(): void {
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.renderer.setStyle(this.el.nativeElement, 'height', 'unset'); // fix potential problem where the explicitly set height might no longer be appropriate due to changes
      this.adjustHeight();
    });

    this.router.events.subscribe((event) => { // fix Home load --> any other page
      if (event instanceof NavigationEnd) {
        this.adjustHeight();
      }
    });
  }

  @HostListener('window:load', ['$event'])
  onWindowLoad(event: any): void {
    this.adjustHeight();
  }

  private adjustHeight(): void {
    const headerHeight = $('.header').outerHeight(true) || 0;
    const footerHeight = $('.footer').outerHeight(true) || 0;
    const contentHeight = $(this.el.nativeElement).outerHeight(true) || 0;
    const windowHeight = $(window).height() || 0;
    
    if (headerHeight + footerHeight + contentHeight < windowHeight) {
      const newHeight = windowHeight - headerHeight - footerHeight - this.getBotTopMargin();
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