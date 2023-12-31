import { Component, OnInit } from '@angular/core';
import { UnitCardService } from '../unit-card.service';
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

  // Define arrays for unit types
  private physicalUnits: string[] = ['yanmiao', 'mingjing', 'umi', 'gnonno', 'lyra', 'claudia', 'shiro', 'bailing'];
  private flameUnits: string[] = ['lan', 'feise', 'liuhuo', 'annabella', 'ruby', 'cobaltb', 'zero', 'king', 'huma'];
  private frostUnits: string[] = ['alyss', 'linghan', 'yulan', 'icarus', 'sakifuwa', 'frigg', 'tsubasa', 'cocoritter', 'meryl', 'hilda', 'ene'];
  private voltUnits: string[] = ['rubilia', 'huang', 'fenrir', 'tianlang', 'nemesis', 'samir', 'crow', 'pepper', 'echo'];
  private alteredUnits: string[] = ['nanyin', 'fiona', 'lin'];
  private physicalFlameUnits: string[] = ['mingjing', 'yanmiao'];
  private flamePhysicalUnits: string[] = [];
  private frostVoltUnits: string[] = [];
  private voltFrostUnits: string[] = [];
  // RARITY ARRAYS
  private SSRUnits: string[] = ['umi', 'lan', 'alyss', 'rubilia', 'yanmiao', 'linghan', 'nanyin', 'feise', 'huang', 'mingjing', 'yulan', 'liuhuo', 'gnonno', 'fiona', 'icarus', 'fenrir', 'annabella', 'tianlang', 'lyra', 'lin', 'sakifuwa', 'ruby', 'frigg', 'nemesis', 'cobaltb', 'claudia', 'zero', 'tsubasa', 'shiro', 'samir', 'meryl', 'king', 'huma', 'crow', 'cocoritter'];
  private SRUnits: string[] = ['bailing', 'hilda', 'ene', 'pepper', 'echo'];
  private RUnits: string[] = [];
  // TYPE ARRAYS
  private damageUnits: string[] = ['umi', 'alyss', 'rubilia', 'yanmiao', 'linghan', 'nanyin', 'feise', 'mingjing', 'yulan', 'liuhuo', 'gnonno', 'icarus', 'fenrir', 'annabella', 'tianlang', 'lin', 'ruby', 'frigg', 'cobaltb', 'claudia', 'tsubasa', 'shiro', 'samir', 'king', 'crow', 'hilda', 'echo', 'bailing'];
  private benedictionUnits: string[] = ['fiona', 'lyra', 'nemesis', 'zero', 'cocoritter', 'pepper'];
  private fortitudeUnits: string[] = ['lan', 'huang', 'sakifuwa', 'meryl', 'huma', 'ene'];
  // ALL
  private allUnits: string[] = [...this.SSRUnits, ...this.SRUnits, ...this.RUnits];

  constructor(private cardDataService: UnitCardService) { }

  ngOnInit() {
    this.cardDataService.getCardData().subscribe((data: any) => {
      this.units = data;
    });


    $('.element .wrapper img').click((event) => {
      const element = $(event.currentTarget).attr('data-element');
      this.activeElement = this.activeElement === element ? null : (element || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });
    
    $('.rarity .wrapper span').click((event) => {
      const rarityElement = $(event.currentTarget).attr('data-rarity');
      this.activeRarity = this.activeRarity === rarityElement ? null : (rarityElement || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });
    
    $('.type .wrapper img').click((event) => {
      const typeElement = $(event.currentTarget).attr('data-type');
      this.activeType = this.activeType === typeElement ? null : (typeElement || null);
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