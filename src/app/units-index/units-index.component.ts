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
  activeRole: string | null = null;

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
  private MDPSUnits: string[] = [];
  private BufferUnits: string[] = [];
  private HealUnits: string[] = [];
  private SupportBufferUnits: string[] = [];
  private ShatterUnits: string[] = [];
  private TauntUnits: string[] = [];

  private allUnits: string[] = [...this.SSRUnits, ...this.SRUnits];

  constructor(private cardDataService: UnitCardService) { }

  private populateArrays(data: any[]): void { // i know its a funny gag to say "the code is self-documenting" but this one really should be
    const elementMap = {
      'element_physical': this.physicalUnits,
      'element_physicalflame': this.physicalFlameUnits,
      'element_flame': this.flameUnits,
      'element_flamephysical': this.flamePhysicalUnits,
      'element_frost': this.frostUnits,
      'element_frostvolt': this.frostVoltUnits,
      'element_volt': this.voltUnits,
      'element_voltfrost': this.voltFrostUnits,
      'element_altered': this.alteredUnits
    };
    
    const rarityMap = {
      'SSR': this.SSRUnits,
      'SR': this.SRUnits
    };

    const resonanceMap = {
      'attack': this.damageUnits,
      'benediction': this.benedictionUnits,
      'fortitude': this.fortitudeUnits
    };

    const MDPSMap = {
      'true': this.MDPSUnits
    }
    const BufferMap = {
      'true': this.BufferUnits
    }
    const HealMap = {
      'true': this.HealUnits
    }
    const SupportBufferMap = {
      'true': this.SupportBufferUnits
    }
    const ShatterMap = {
      'true': this.ShatterUnits
    }
    const TauntMap = {
      'true': this.TauntUnits
    }

    data.forEach((character: any) => { // just nabs the character's element, rarity, and resonance and adds it to the appropriate array for the filter
      const elementKey = character.element as keyof typeof elementMap;
      const rarityKey = character.rarity as keyof typeof rarityMap;
      const resonanceKey = character.resonance as keyof typeof resonanceMap;
      const MDPSKey = character.isMDPS as keyof typeof MDPSMap;
      const BufferKey = character.isBuffer as keyof typeof BufferMap;
      const HealKey = character.isHeal as keyof typeof HealMap;
      const SupportBufferKey = character.isSupportBuffer as keyof typeof SupportBufferMap;
      const ShatterKey = character.isShatter as keyof typeof ShatterMap;
      const TauntKey = character.isTaunt as keyof typeof TauntMap;

      if (elementMap[elementKey]) {
        elementMap[elementKey].push(character.slug);
      }

      if (rarityMap[rarityKey]) {
        rarityMap[rarityKey].push(character.slug);
      }

      if (resonanceMap[resonanceKey]) {
        resonanceMap[resonanceKey].push(character.slug);
      }

      // ROLE

      if (MDPSMap[MDPSKey]) {
        MDPSMap[MDPSKey].push(character.slug);
      }

      if (BufferMap[BufferKey]) {
        BufferMap[BufferKey].push(character.slug);
      }

      if (HealMap[HealKey]) {
        HealMap[HealKey].push(character.slug);
      }

      if (SupportBufferMap[SupportBufferKey]) {
        SupportBufferMap[SupportBufferKey].push(character.slug);
      }

      if (ShatterMap[ShatterKey]) {
        ShatterMap[ShatterKey].push(character.slug);
      }

      if (TauntMap[TauntKey]) {
        TauntMap[TauntKey].push(character.slug);
      }

    });

    this.allUnits = [...this.SSRUnits, ...this.SRUnits]; // update the allUnits array
  }

  ngOnInit() {
    this.cardDataService.getCardData().subscribe((data: any) => {
      this.units = data;
      this.populateArrays(data); // Call the new function to populate the arrays
    });

    $('.element .wrapper img').click((event) => {
      const element = $(event.currentTarget).attr('data-element');
      this.activeElement = this.activeElement === element ? null : (element || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType,this.activeRole);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });
    
    $('.rarity .wrapper span').click((event) => {
      const rarity = $(event.currentTarget).attr('data-rarity');
      this.activeRarity = this.activeRarity === rarity ? null : (rarity || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType,this.activeRole);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });
    
    $('.type .wrapper img').click((event) => {
      const type = $(event.currentTarget).attr('data-type');
      this.activeType = this.activeType === type ? null : (type || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType,this.activeRole);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });

    $('.role .wrapper img').click((event) => {
      const role = $(event.currentTarget).attr('data-role');
      this.activeRole = this.activeRole === role ? null : (role || null);
      const unitsToShow = this.getUnitsToShow(this.activeElement, this.activeRarity, this.activeType, this.activeRole);
      this.showUnits(unitsToShow);
      this.updateActiveClasses();
    });
  }

  private updateActiveClasses(): void {
    // Remove all active classes
    $('.element .wrapper img, .rarity .wrapper span, .type .wrapper img, .role .wrapper img').removeClass('active');

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
    if (this.activeRole !== null) {
      $(`.role .wrapper img[data-role="${this.activeRole}"]`).addClass('active');
    }
  }

  private getUnitsToShow(
    elementFilter: string | null,
    rarityFilter: string | null,
    typeFilter: string | null,
    roleFilter: string | null
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
          filteredUnits = filteredUnits.filter(unit => this.physicalUnits.includes(unit) || this.physicalFlameUnits.includes(unit));
          break;
        case 'flame':
          filteredUnits = filteredUnits.filter(unit => this.flameUnits.includes(unit) || this.flamePhysicalUnits.includes(unit));
          break;
        case 'frost':
          filteredUnits = filteredUnits.filter(unit => this.frostUnits.includes(unit) || this.frostVoltUnits.includes(unit));
          break;
        case 'volt':
          filteredUnits = filteredUnits.filter(unit => this.voltUnits.includes(unit) || this.voltFrostUnits.includes(unit));
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
    if (roleFilter) {
      switch (roleFilter) {
        case 'mdps':
          filteredUnits = filteredUnits.filter(unit => this.MDPSUnits.includes(unit));
          break;
        case 'buffer':
          filteredUnits = filteredUnits.filter(unit => this.BufferUnits.includes(unit));
          break;
        case 'heal':
          filteredUnits = filteredUnits.filter(unit => this.HealUnits.includes(unit));
          break;
        case 'supportbuffer':
          filteredUnits = filteredUnits.filter(unit => this.SupportBufferUnits.includes(unit));
          break;
        case 'shatter':
          filteredUnits = filteredUnits.filter(unit => this.ShatterUnits.includes(unit));
          break;
        case 'taunt':
          filteredUnits = filteredUnits.filter(unit => this.TauntUnits.includes(unit));
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