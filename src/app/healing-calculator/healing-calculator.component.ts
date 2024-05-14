import { Component, HostListener, OnInit, Renderer2, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-healing-calculator',
  templateUrl: './healing-calculator.component.html',
  styleUrls: ['./healing-calculator.component.scss']
})

export class HealingCalculatorComponent implements OnInit {
  errors: any[] = [];
  units: any[] = [];
  matrices: any[] = [];
  traits: any[] = [];
  relics: any[] = [];
  currentUnitSetId!: number;
  currentMatrixSelectIndex!: number;
  currentRelicSelectIndex!: number;
  showAllUnits = false;
  showAllMatrices = false;
  showAllTraits = false;
  showAllRelics = false;
  activeInfo: string = 'Summary'; 

  // STATS
  hpStat!: number;
  critStat!: number;
  critRateStat!: number;
  critDmgStat!: number;
  physicalAtkStat!: number;
  flameAtkStat!: number;
  frostAtkStat!: number;
  voltAtkStat!: number;
  alteredAtkStat!: number;

  // TITAN
  titanHealing!: number;

  constructor(private dataService: DataService, private http: HttpClient, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.dataService.getSimulacraData().subscribe((data: any) => {
      this.units = data;
    });
    this.dataService.getMatricesData().subscribe((data: any) => {
      this.matrices = data;
    });
    this.dataService.getRelicsData().subscribe((data: any) => {
      this.relics = data;
    });
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

  toggleTraitSelect(event: Event) {
    event.stopPropagation();
    this.showAllTraits = !this.showAllTraits;

    const clickedElement = event.target as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    const docEl = document.documentElement;
    const offset = 20; // offset in pixels

    const top = rect.top + window.pageYOffset - docEl.clientTop;
    const left = rect.left + window.pageXOffset - docEl.clientLeft;

    const allTraitsElement = this.el.nativeElement.querySelector('.all-traits');
    this.renderer.setStyle(allTraitsElement, 'top', `${top}px`);
    this.renderer.setStyle(allTraitsElement, 'left', `${left + rect.width + offset}px`);
  }

  toggleRelicSelect(event: Event, clickedRelicSelect: number) {
    this.currentRelicSelectIndex = clickedRelicSelect;

    event.stopPropagation();
    this.showAllRelics = !this.showAllRelics;

    const clickedElement = event.target as HTMLElement;
    const rect = clickedElement.getBoundingClientRect();
    const docEl = document.documentElement;
    const offset = 20; // offset in pixels

    const top = rect.top + window.pageYOffset - docEl.clientTop;
    const left = rect.left + window.pageXOffset - docEl.clientLeft;

    const allRelicsElement = this.el.nativeElement.querySelector('.all-relics');
    this.renderer.setStyle(allRelicsElement, 'top', `${top}px`);
    this.renderer.setStyle(allRelicsElement, 'left', `${left + rect.width + offset}px`);
  }

  changeThumbnailUnit(clickedEntry: any) {
    const value = clickedEntry.slug;
  
    const avatarSrc = `assets/simulacra/${value}_avatar.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.unit[data-unit="${this.currentUnitSetId}"] .simulacra-select img`);
    selectElement.src = avatarSrc;
    selectElement.parentElement.setAttribute('data-simulacra', value);
  
    console.log(clickedEntry);
    console.log("Current Unit Set ID", this.currentUnitSetId);
  }

  changeThumbnailMatrix(clickedEntry: any) {
    const value = clickedEntry.slug;
  
    const avatarSrc = `assets/matrices/${value}_matrix.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.unit[data-unit="${this.currentUnitSetId}"] .matrix-select-container:nth-child(${this.currentMatrixSelectIndex}) .matrix-select img`);
    selectElement.src = avatarSrc;
    selectElement.parentElement.setAttribute('data-matrix', value);
  
    console.log(clickedEntry);
    console.log("Current Unit Set ID", this.currentUnitSetId);
    console.log("Current Matrix Select Index", this.currentMatrixSelectIndex);
  }

  changeThumbnailTrait(clickedEntry: any) {
    const value = clickedEntry.slug;

    const avatarSrc = `assets/simulacra/${value}_avatar.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.trait-select img`);
    selectElement.src = avatarSrc;
    selectElement.parentElement.setAttribute('data-trait', value);
  
    console.log(clickedEntry);
    console.log("Current Unit Set ID", this.currentUnitSetId);
  }

  changeThumbnailRelic(clickedEntry: any) {
    const value = clickedEntry.slug;
  
    const avatarSrc = `assets/relics/${value}_relic.webp`;
    const selectElement = this.el.nativeElement.querySelector(`.relic-select-container:nth-child(${this.currentRelicSelectIndex}) .relic-select img`);
    selectElement.src = avatarSrc;
    selectElement.parentElement.setAttribute('data-relic', value);
  
    console.log(clickedEntry);
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

  logEverything(event: Event) {
    this.errors = [];
    
    // STATS & TITAN

    const stats = {
      hp: this.hpStat ?? 0,
      crit: this.critStat ?? 0,
      critRate: this.critRateStat ?? 0,
      critDmg: this.critDmgStat ?? 0,
      physicalAtk: this.physicalAtkStat ?? 0,
      flameAtk: this.flameAtkStat ?? 0,
      frostAtk: this.frostAtkStat ?? 0,
      voltAtk: this.voltAtkStat ?? 0,

      titanHealing: this.titanHealing ?? 0,
    };

    // UNITS & MATRICES

    type Matrix = {
      matrixName: string;
      starValue: number;
    };
    
    type Unit = {
      simulacraName: string;
      starValue: number;
      matricesSet: Map<string, Matrix>;
    };
    
    const unitValues: Unit[] = [];
    const unitElements = document.querySelectorAll('[data-unit]');
    let isUnitErrorAdded = false;
    
    for (let i = 0; i < unitElements.length; i++) {
      const unitElement = unitElements[i];
      const simulacraSelect = unitElement.querySelector('.simulacra-select');
      const starSelect = unitElement.querySelector('.stars');
    
      if (simulacraSelect && starSelect) {
        const simulacraValue = simulacraSelect.getAttribute('data-simulacra') || '';
    
        if (simulacraValue === '' && !isUnitErrorAdded) {
          this.errors.push('Please fill out all the unit fields.');
          isUnitErrorAdded = true;
        }
    
        const starSelectChildren = starSelect.children;
        let maxAdvancementLevel = -1;
    
        for (let j = 0; j < starSelectChildren.length; j++) {
          const child = starSelectChildren[j];
          if (child.classList.contains('active')) {
            const advancementLevel = Number(child.getAttribute('data-advancement-level'));
            if (advancementLevel > maxAdvancementLevel) {
              maxAdvancementLevel = advancementLevel;
            }
          }
        }
    
        unitValues.push({
          simulacraName: simulacraValue,
          starValue: maxAdvancementLevel,
          matricesSet: new Map()  // We'll populate this later
        });
      }
    }

    console.log("Unit Values", unitValues);

    // TRAIT

    const traitValue = (document.querySelector('.trait-select')?.getAttribute('data-trait') || '').trim();

    // RELICS

    // CONDITIONALS

    if (this.titanHealing > 15) {
      this.errors.push('Titan Healing level cannot be higher than 15.');
    }

    if (this.errors.length > 0) { // dont allow the calculator to run if there are errors
      throw new Error(this.errors.join('\n'));
    }

    // THE ACTUAL LOGGER
  
    alert(
      "HP: " + stats.hp + '\n' +
      "Crit: " + stats.crit + '\n' +
      "Crit Rate %: " + stats.critRate + '\n' +
      "Crit DMG %: " + stats.critDmg + '\n' +
      "Physical ATK: " + stats.physicalAtk + '\n' +
      "Flame ATK: " + stats.flameAtk + '\n' +
      "Frost ATK: " + stats.frostAtk + '\n' +
      "Volt ATK: " + stats.voltAtk + '\n' +
      "Increased Healing Level: " + stats.titanHealing + '\n' +
      unitValues.map(unit => unit.simulacraName + ": " + unit.starValue).join('\n') + '\n' +
      "Trait: " + traitValue
      // Relics
    );
  }
  
  setActiveInfo(event: Event | string | null) {
    if (typeof event === 'string') {
      this.activeInfo = event;
    } else if (event instanceof Event) {
      const target = (event.target as HTMLElement);
      this.activeInfo = target.textContent || ''; // Assuming the text content of the element is the desired information
      const rect = target.getBoundingClientRect();
      const underline = document.querySelector('.underline') as HTMLElement;
      const containerRect = (underline.parentElement as HTMLElement).getBoundingClientRect();
      underline.style.left = `${rect.left - containerRect.left - 8}px`; // offset the width extension
      underline.style.width = `${rect.width + 16}px`; // make it a bit prettier
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
    if (!target.closest('.all-traits')) {
      this.showAllTraits = false;
    }
    if (!target.closest('.all-relics')) {
      this.showAllRelics = false;
    }
  }

  @HostListener('change', ['$event.target'])
  onStatChange(target: HTMLInputElement) {
    console.log(`Changed to ${target.value}`);  // This console logs the stats whenever changed
  }

  @ViewChildren('info') infos!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const underLineInit = new Event('custom');
    Object.defineProperty(underLineInit, 'target', {value: this.infos.first.nativeElement, enumerable: true});
    this.setActiveInfo(underLineInit); // make the underline appear under "Advancements" on page load

    setTimeout(() => {
      $('.underline').css('transition', 'left 0.3s ease, width 0.3s ease');
    }, 1); // shit solution so it doesnt get applied mid-render
  }
}