import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      if (event.target.closest('.menu-icon')) {
        console.log("clicked");
        const burgerMenu = this.el.nativeElement.querySelector('.burger-menu');
        const display = getComputedStyle(burgerMenu).display;
        this.renderer.setStyle(burgerMenu, 'display', display === 'none' ? 'flex' : 'none');
        event.target.closest('.menu-icon').classList.toggle('active');
      }
  
      if (event.target.closest('.menu-item') || event.target.closest('.home')) {
        const burgerMenu = this.el.nativeElement.querySelector('.burger-menu');
        this.renderer.setStyle(burgerMenu, 'display', 'none');
      }
    });
  }
}