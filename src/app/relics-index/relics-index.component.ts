import { Component, OnInit } from '@angular/core';
import { RelicCardService } from '../relic-card.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-relics-index',
  templateUrl: './relics-index.component.html',
  styleUrls: ['./relics-index.component.scss']
})

export class RelicsIndexComponent implements OnInit {
  relics: any[] = [];
  activeElement: string | null = null;
  activeRarity: string | null = null;
  activeType: string | null = null;
  activeRole: string | null = null;

  private physicalRelics: string[] = [];
  private flameRelics: string[] = [];
  private frostRelics: string[] = [];
  private voltRelics: string[] = [];
  private SSRRelics: string[] = [];
  private SRRelics: string[] = [];

  private allRelics: string[] = [...this.SSRRelics, ...this.SRRelics];

  constructor(private cardDataService: RelicCardService) { }

  private populateArrays(data: any[]): void { // i know its a funny gag to say "the code is self-documenting" but this one really should be
    const elementMap = {
      'physicalboost': this.physicalRelics,
      'physicalresistance': this.physicalRelics,
      'flameboost': this.flameRelics,
      'flameresistance': this.flameRelics,
      'frostboost': this.frostRelics,
      'frostresistance': this.frostRelics,
      'voltboost': this.voltRelics,
      'voltresistance': this.voltRelics,
    };
    
    const rarityMap = {
      'SSR': this.SSRRelics,
      'SR': this.SRRelics
    };

    // const resonanceMap = {
    //   'attack': this.damageRelics,
    //   'benediction': this.benedictionRelics,
    //   'fortitude': this.fortitudeRelics
    // };

    // const rolesMap = {
    //   'MDPS': this.MDPSRelics,
    //   'Buffer': this.BufferRelics,
    //   'Healer': this.HealerRelics,
    //   'SupportBuffer': this.SupportBufferRelics,
    //   'Shatter': this.ShatterRelics,
    //   'Taunt': this.TauntRelics
    // };

    data.forEach((relic: any) => { // just nabs the relic's element, rarity, and resonance and adds it to the appropriate array for the filter
      const elementKey = relic.elementBoost as keyof typeof elementMap;
      const rarityKey = relic.rarity as keyof typeof rarityMap;
      //const resonanceKey = relic.resonance as keyof typeof resonanceMap;

      if (elementMap[elementKey]) {
        elementMap[elementKey].push(relic.slug);
      }

      if (rarityMap[rarityKey]) {
        rarityMap[rarityKey].push(relic.slug);
      }

/*       if (resonanceMap[resonanceKey]) {
        resonanceMap[resonanceKey].push(relic.slug);
      } */
/* 
      relic.element.forEach((role: any) => {
        const elementMapKey = role as keyof typeof elementMap;
        if (elementMap[elementMapKey]) {
          elementMap[elementMapKey].push(relic.slug);
        }
      }); */
    });

    this.allRelics = [...this.SSRRelics, ...this.SRRelics]; // update the allRelics array
  }

  ngOnInit() {
    this.cardDataService.getCardData().subscribe((data: any) => {
      this.relics = data;
      this.populateArrays(data); // Call the new function to populate the arrays
    });

    $('.element .wrapper img').click((event) => {
      const element = $(event.currentTarget).attr('data-element');
      this.activeElement = this.activeElement === element ? null : (element || null);
      const relicsToShow = this.getRelicsToShow(this.activeElement, this.activeRarity, this.activeType, this.activeRole);
      this.showRelics(relicsToShow);
      this.updateActiveClasses();
    }); 
    
    $('.rarity .wrapper span').click((event) => {
      const rarity = $(event.currentTarget).attr('data-rarity');
      this.activeRarity = this.activeRarity === rarity ? null : (rarity || null);
      const relicsToShow = this.getRelicsToShow(this.activeElement, this.activeRarity, this.activeType,this.activeRole);
      this.showRelics(relicsToShow);
      this.updateActiveClasses();
    });
    
/*     $('.type .wrapper img').click((event) => {
      const type = $(event.currentTarget).attr('data-type');
      this.activeType = this.activeType === type ? null : (type || null);
      const relicsToShow = this.getRelicsToShow(this.activeElement, this.activeRarity, this.activeType,this.activeRole);
      this.showRelics(relicsToShow);
      this.updateActiveClasses();
    }); */
/* 
    $('.role .wrapper img').click((event) => {
      const role = $(event.currentTarget).attr('data-role');
      this.activeRole = this.activeRole === role ? null : (role || null);
      const relicsToShow = this.getRelicsToShow(this.activeElement, this.activeRarity, this.activeType, this.activeRole);
      this.showRelics(relicsToShow);
      this.updateActiveClasses();
    }); */
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
/*     if (this.activeType !== null) {
      $(`.type .wrapper img[data-type="${this.activeType}"]`).addClass('active');
    }
    if (this.activeRole !== null) {
      $(`.role .wrapper img[data-role="${this.activeRole}"]`).addClass('active');
    } */
  }

  private getRelicsToShow(
    elementFilter: string | null,
    rarityFilter: string | null,
    typeFilter: string | null,
    roleFilter: string | null
  ): string[] {
    // Use filters to narrow down the relics to show
    let filteredRelics: string[] = this.allRelics;
    if (elementFilter) {
      switch (elementFilter) {
        case 'physical':
          filteredRelics = filteredRelics.filter(unit => this.physicalRelics.includes(unit));
          break;
        case 'flame':
          filteredRelics = filteredRelics.filter(unit => this.flameRelics.includes(unit));
          break;
        case 'frost':
          filteredRelics = filteredRelics.filter(unit => this.frostRelics.includes(unit));
          break;
        case 'volt':
          filteredRelics = filteredRelics.filter(unit => this.voltRelics.includes(unit));
          break;
      }
    }
    
    if (rarityFilter) {
      switch (rarityFilter) {
        case 'ssr':
          filteredRelics = filteredRelics.filter(unit => this.SSRRelics.includes(unit));
          break;
        case 'sr':
          filteredRelics = filteredRelics.filter(unit => this.SRRelics.includes(unit));
          break;
      }
    }

/*     if (typeFilter) {
      switch (typeFilter) {
        case 'damage':
          filteredRelics = filteredRelics.filter(unit => this.damageRelics.includes(unit));
          break;
        case 'benediction':
          filteredRelics = filteredRelics.filter(unit => this.benedictionRelics.includes(unit));
          break;
        case 'fortitude':
          filteredRelics = filteredRelics.filter(unit => this.fortitudeRelics.includes(unit));
          break;
      }
    } */
/*     if (roleFilter) {
      switch (roleFilter) {
        case 'MDPS':
          filteredRelics = filteredRelics.filter(unit => this.MDPSRelics.includes(unit));
          break;
        case 'Buffer':
          filteredRelics = filteredRelics.filter(unit => this.BufferRelics.includes(unit));
          break;
        case 'Healer':
          filteredRelics = filteredRelics.filter(unit => this.HealerRelics.includes(unit));
          break;
        case 'SupportBuffer':
          filteredRelics = filteredRelics.filter(unit => this.SupportBufferRelics.includes(unit));
          break;
        case 'Shatter':
          filteredRelics = filteredRelics.filter(unit => this.ShatterRelics.includes(unit));
          break;
        case 'Taunt':
          filteredRelics = filteredRelics.filter(unit => this.TauntRelics.includes(unit));
          break;
      }
    } */
    return filteredRelics;
  }

  private showRelics(relicsToShow: string[]): void {
    $('.relic-wrapper[data-unit]').parent().hide();
    relicsToShow.forEach(unit => {
      $(`[data-unit="${unit}"]`).parent().show();
    });
  }
}