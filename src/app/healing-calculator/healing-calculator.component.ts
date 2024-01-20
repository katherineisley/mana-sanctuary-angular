import { Component, HostListener, OnInit, Renderer2, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-healing-calculator',
  templateUrl: './healing-calculator.component.html',
  styleUrls: ['./healing-calculator.component.scss']
})

export class HealingCalculatorComponent implements OnInit {
  units: any[] = [];
  matrices: any[] = [];
  showAllUnits = false;
  showAllMatrices = false;

  constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.http.get<any>("assets/json/simulacra-data.json").subscribe(data => {
      this.units = data;
    }, error => console.error(error));
    this.http.get<any>("assets/json/matrices-data.json").subscribe(data => {
      this.matrices = data;
    }, error => console.error(error));
  }

  toggleSelects(showUnits: boolean, event: MouseEvent) { // IS NOT CONFIGURED FOR MOBILE
    // this might not make sense at first glance, but because we only have 2 states, we can just flip the boolean
    // true = show units, false = show matrices
    event.stopPropagation();
    this.showAllUnits = showUnits;
    this.showAllMatrices = !showUnits;
  
    const clickedElement = event.target as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    const docEl = document.documentElement;
    const offset = 20; // offset in pixels

    const top = rect.top + window.pageYOffset - docEl.clientTop;
    const left = rect.left + window.pageXOffset - docEl.clientLeft;
  
    if (showUnits) {
      const allUnitsElement = this.el.nativeElement.querySelector('.all-units');
      this.renderer.setStyle(allUnitsElement, 'top', `${top}px`);
      this.renderer.setStyle(allUnitsElement, 'left', `${left + rect.width + offset}px`);
    } else {
      const allMatricesElement = this.el.nativeElement.querySelector('.all-matrices');
      this.renderer.setStyle(allMatricesElement, 'top', `${top}px`);
      this.renderer.setStyle(allMatricesElement, 'left', `${left + rect.width + offset}px`);
    }
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: HTMLElement) {
    if (!target.closest('.all-units')) {
      this.showAllUnits = false;
    }
    if (!target.closest('.all-matrices')) {
      this.showAllMatrices = false;
    }
  }
}