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

  currentAdvancementLevel(event: Event) {
    let target = event.target as HTMLElement;

    // this is retarded because the path is on TOP of the svg, despite the path being the child of the svg WITH NO Z-INDEX
    // this wasted like 20 minutes of my life because i couldn't figure out why stars with "active" kept getting its "active" removed when clicked
    // but it worked properly if i clicked the very edge of the star
    if (target.tagName.toLowerCase() === 'path') {
      target = target.closest('svg') as unknown as HTMLElement;
    }
  
    const advancementLevel = Number(target.getAttribute('data-advancement-level'));
    const parentStarsDiv = target.closest('.stars'); // prevents from selecting ALL the stars on the page
  
    if (parentStarsDiv) {
      const svgElements = parentStarsDiv.querySelectorAll('svg');
  
      svgElements.forEach((svg: SVGSVGElement) => {
        const level = Number(svg.getAttribute('data-advancement-level'));
        const shouldBeActive = level <= advancementLevel;
  
        if (shouldBeActive) {
          this.renderer.addClass(svg, 'active');
        } else {
          this.renderer.removeClass(svg, 'active');
        }
      });
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