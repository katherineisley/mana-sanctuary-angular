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
  currentUnitSetId!: number;
  currentMatrixSelectIndex!: number;
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

  toggleUnitSelect(event: Event, clickedUnitSetId: number) { // this shit needs to be refactored and optimized, shares a lot of code with toggleMatrixSelect
    this.currentUnitSetId = clickedUnitSetId;

    event.stopPropagation();
    this.showAllUnits = !this.showAllUnits;
  
    const clickedElement = event.target as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    const docEl = document.documentElement;
    const offset = 20; // offset in pixels

    const top = rect.top + window.pageYOffset - docEl.clientTop;
    const left = rect.left + window.pageXOffset - docEl.clientLeft;

    const allUnitsElement = this.el.nativeElement.querySelector('.all-units');
    this.renderer.setStyle(allUnitsElement, 'top', `${top}px`);
    this.renderer.setStyle(allUnitsElement, 'left', `${left + rect.width + offset}px`);
  }

  toggleMatrixSelect(event: Event, clickedUnitSetId: number, clickedMatrixSelect: number) { // this shit needs to be refactored and optimized, shares a lot of code with toggleUnitSelect
    this.currentUnitSetId = clickedUnitSetId;
    this.currentMatrixSelectIndex = clickedMatrixSelect;

    event.stopPropagation();
    this.showAllMatrices = !this.showAllMatrices;

    const clickedElement = event.target as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    const docEl = document.documentElement;
    const offset = 20; // offset in pixels

    const top = rect.top + window.pageYOffset - docEl.clientTop;
    const left = rect.left + window.pageXOffset - docEl.clientLeft;

    const allMatricesElement = this.el.nativeElement.querySelector('.all-matrices');
    this.renderer.setStyle(allMatricesElement, 'top', `${top}px`);
    this.renderer.setStyle(allMatricesElement, 'left', `${left + rect.width + offset}px`);
  }

  changeThumbnailUnit(clickedEntry: any) {
    const value = clickedEntry.slug;
  
    const avatarSrc = `assets/simulacra/${value}_avatar.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.unit[data-unit="${this.currentUnitSetId}"] .simulacra-select img`);
    selectElement.src = avatarSrc;
  
    console.log(clickedEntry);
    console.log("Current Unit Set ID", this.currentUnitSetId);
  }

  changeThumbnailMatrix(clickedEntry: any) {
    const value = clickedEntry.slug;
  
    const avatarSrc = `assets/matrices/${value}_matrix.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.unit[data-unit="${this.currentUnitSetId}"] .matrix-select-container:nth-child(${this.currentMatrixSelectIndex + 1}) .matrix-select img`);
    selectElement.src = avatarSrc;
  
    console.log(clickedEntry);
    console.log("Current Unit Set ID", this.currentUnitSetId);
    console.log("Current Matrix Select Index", this.currentMatrixSelectIndex);
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