import { Component, OnInit } from '@angular/core';
import { UnitCardService } from '../unit-card.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-units-index',
  templateUrl: './units-index.component.html',
  styleUrls: ['./units-index.component.scss']
})

export class UnitsIndexComponent implements OnInit {
  units: any[] = [];
  activeElement: string | null = null;
  activeRarity: string | null = null;
  activeType: string | null = null;

  private physicalUnits: string[] = [];
  private flameUnits: string[] = [];
  private frostUnits: string[] = [];
  private voltUnits: string[] = [];
  private alteredUnits: string[] = [];
  private physicalFlameUnits: string[] = [];
  private flamePhysicalUnits: string[] = [];
  private frostVoltUnits: string[] = [];
  private voltFrostUnits: string[] = [];
  private SSRUnits: string[] = [];
  private SRUnits: string[] = [];
  private damageUnits: string[] = [];
  private benedictionUnits: string[] = [];
  private fortitudeUnits: string[] = [];

  private allUnits: string[] = [...this.SSRUnits, ...this.SRUnits];

  constructor(private cardDataService: UnitCardService) { }

  private populateArrays(data: any[]): void {
    data.forEach((character: any) => {
      
      //ELEMENT
      if (character.element === 'element_physical'|| character.element === 'element_physicalflame') {
        this.physicalUnits.push(character.slug);
      } 
      if (character.element === 'element_flame' || character.element === 'element_flamephysical') {
        this.flameUnits.push(character.slug);
      }
      if (character.element === 'element_frost' || character.element === 'element_frostvolt') {
        this.frostUnits.push(character.slug);
      }
      if (character.element === 'element_volt'|| character.element === 'element_voltfrost') {
        this.voltUnits.push(character.slug);
      }
      if (character.element === 'element_altered') {
        this.alteredUnits.push(character.slug);
      }
      if (character.element === 'element_physicalflame') {
        this.physicalFlameUnits.push(character.slug);
      }
      if (character.element === 'element_flamephysical') {
        this.flamePhysicalUnits.push(character.slug);
      }
      if (character.element === 'element_frostvolt') {
        this.frostVoltUnits.push(character.slug);
      }    
      if (character.element === 'element_voltfrost') {
        this.voltFrostUnits.push(character.slug);
      }
      //RARITY
      if (character.rarity === 'SSR') {
        this.SSRUnits.push(character.slug);
      }
      if (character.rarity === 'SR') {
        this.SRUnits.push(character.slug);
      }
      //RESONANCE
      if (character.resonance === 'attack') {
        this.damageUnits.push(character.slug);
      }
      if (character.resonance === 'benediction') {
        this.benedictionUnits.push(character.slug);
      }
      if (character.resonance === 'fortitude') {
        this.fortitudeUnits.push(character.slug);
      }
    });

    // Update the allUnits array
    this.allUnits = [...this.SSRUnits, ...this.SRUnits];
  }

  ngOnInit() {
    this.cardDataService.getCardData().subscribe((data: any) => {
      this.units = data;
      this.populateArrays(data); // Call the new function to populate the arrays
    });

    $('.element .wrapper img').click((event) => {
      const element = $(event.currentTarget).attr('data-element');
      this.activeElement = this.activeElement === element ? null : (element || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });
    
    $('.rarity .wrapper span').click((event) => {
      const rarity = $(event.currentTarget).attr('data-rarity');
      this.activeRarity = this.activeRarity === rarity ? null : (rarity || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });
    
    $('.type .wrapper img').click((event) => {
      const type = $(event.currentTarget).attr('data-type');
      this.activeType = this.activeType === type ? null : (type || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });
  }

  private updateActiveClasses(): void {
    // Remove all active classes
    $('.element .wrapper img, .rarity .wrapper span, .type .wrapper img').removeClass('active');

    // Add active class for each active state
    if (this.activeElement !== null) {
      $(`.element .wrapper img[data-element="${this.activeElement}"]`).addClass('active');
    }
    if (this.activeRarity !== null) {
      $(`.rarity .wrapper span[data-rarity="${this.activeRarity}"]`).addClass('active');
    }
    if (this.activeType !== null) {
      $(`.type .wrapper img[data-type="${this.activeType}"]`).addClass('active');
    }
  }

  private getUnitsToShow(
    elementFilter: string | null,
    rarityFilter: string | null,
    typeFilter: string | null
  ): string[] {
    // Use filters to narrow down the units to show
    let filteredUnits: string[] = this.allUnits;

    if (elementFilter) {
      switch (elementFilter) {
        case 'physical-flame':
          filteredUnits = filteredUnits.filter(unit => this.physicalFlameUnits.includes(unit));
          break;
        case 'flame-physical':
          filteredUnits = filteredUnits.filter(unit => this.flamePhysicalUnits.includes(unit));
          break;
        case 'frost-volt':
          filteredUnits = filteredUnits.filter(unit => this.frostVoltUnits.includes(unit));
          break;
        case 'volt-frost':
          filteredUnits = filteredUnits.filter(unit => this.voltFrostUnits.includes(unit));
          break;
        case 'altered':
          filteredUnits = filteredUnits.filter(unit => this.alteredUnits.includes(unit));
          break;
        case 'physical':
          filteredUnits = filteredUnits.filter(unit => this.physicalUnits.includes(unit));
          break;
        case 'flame':
          filteredUnits = filteredUnits.filter(unit => this.flameUnits.includes(unit));
          break;
        case 'frost':
          filteredUnits = filteredUnits.filter(unit => this.frostUnits.includes(unit));
          break;
        case 'volt':
          filteredUnits = filteredUnits.filter(unit => this.voltUnits.includes(unit));
          break;
      }
    }

    if (rarityFilter) {
      switch (rarityFilter) {
        case 'ssr':
          filteredUnits = filteredUnits.filter(unit => this.SSRUnits.includes(unit));
          break;
        case 'sr':
          filteredUnits = filteredUnits.filter(unit => this.SRUnits.includes(unit));
          break;
      }
    }

    if (typeFilter) {
      switch (typeFilter) {
        case 'damage':
          filteredUnits = filteredUnits.filter(unit => this.damageUnits.includes(unit));
          break;
        case 'benediction':
          filteredUnits = filteredUnits.filter(unit => this.benedictionUnits.includes(unit));
          break;
        case 'fortitude':
          filteredUnits = filteredUnits.filter(unit => this.fortitudeUnits.includes(unit));
          break;
      }
    }
    return filteredUnits;
  }

  private showUnits(unitsToShow: string[]): void {
    $('.unit-wrapper[data-unit]').parent().hide();
    unitsToShow.forEach(unit => {
      $(`[data-unit="${unit}"]`).parent().show();
    });
  }
}