import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-matrices-index',
  templateUrl: './matrices-index.component.html',
  styleUrls: ['./matrices-index.component.scss']
})

export class MatricesIndexComponent implements OnInit {
  matrices: any[] = [];
  activeElement: string | null = null;
  activeRarity: string | null = null;
  activeType: string | null = null;
  activeRole: string | null = null;

  private physicalMatrices: string[] = [];
  private flameMatrices: string[] = [];
  private frostMatrices: string[] = [];
  private voltMatrices: string[] = [];
  private alteredMatrices: string[] = [];
  private physicalFlameMatrices: string[] = [];
  private flamePhysicalMatrices: string[] = [];
  private frostVoltMatrices: string[] = [];
  private voltFrostMatrices: string[] = [];
  private SSRMatrices: string[] = [];
  private SRMatrices: string[] = [];
  private damageMatrices: string[] = [];
  private benedictionMatrices: string[] = [];
  private fortitudeMatrices: string[] = [];
  private MDPSMatrices: string[] = [];
  private BufferMatrices: string[] = [];
  private HealerMatrices: string[] = [];
  private SupportBufferMatrices: string[] = [];
  private ShatterMatrices: string[] = [];
  private TauntMatrices: string[] = [];

  private allMatrices: string[] = [...this.SSRMatrices, ...this.SRMatrices];

  constructor(private route: ActivatedRoute) { }

  // private getUniqueMatricesResonanceValues(data: any[]): string[] {
  //   const resonanceSet = new Set<string>();

  //   if (data.twopc && data.twopc.resonance) {
  //       data.twopc.resonance.forEach((resonance: string) => {
  //           resonanceSet.add(resonance);
  //       });
  //   }
  //   if (data.fourpc && data.fourpc.resonance) {
  //       data.fourpc.resonance.forEach((resonance: string) => {
  //           resonanceSet.add(resonance);
  //       });
  //   }
  //   const uniqueResonanceValues = Array.from(resonanceSet);
  //   return uniqueResonanceValues;
  // }

  private populateArrays(data: any[]): void { // i know its a funny gag to say "the code is self-documenting" but this one really should be
    const elementMap = {
      'element_physical': this.physicalMatrices,
      'element_physicalflame': this.physicalFlameMatrices,
      'element_flame': this.flameMatrices,
      'element_flamephysical': this.flamePhysicalMatrices,
      'element_frost': this.frostMatrices,
      'element_frostvolt': this.frostVoltMatrices,
      'element_volt': this.voltMatrices,
      'element_voltfrost': this.voltFrostMatrices,
      'element_altered': this.alteredMatrices
    };
    
    const rarityMap = {
      'SSR': this.SSRMatrices,
      'SR': this.SRMatrices
    };

    const resonanceMap = {
      'attack': this.damageMatrices,
      'benediction': this.benedictionMatrices,
      'fortitude': this.fortitudeMatrices
    };

    const rolesMap = {
      'MDPS': this.MDPSMatrices,
      'Buffer': this.BufferMatrices,
      'Healer': this.HealerMatrices,
      'SupportBuffer': this.SupportBufferMatrices,
      'Shatter': this.ShatterMatrices,
      'Taunt': this.TauntMatrices
    };

    data.forEach((matrix: any) => { // just nabs the matrix's element, rarity, and resonance and adds it to the appropriate array for the filter
      const rarityKey = matrix.rarity as keyof typeof rarityMap;

      if (rarityMap[rarityKey]) {
        rarityMap[rarityKey].push(matrix.slug);
      }

      // matrix.resonance.forEach((resonance: any) => { // requires special solution to grab unique values from twopc and fourpc entry arrays
      //   const resonanceMapKey = resonance as keyof typeof resonanceMap;
      //   if (resonanceMap[resonanceMapKey]) {
      //     resonanceMap[resonanceMapKey].push(matrix.slug);
      //   }
      // })

      matrix.element.forEach((element: any) => {
        const elementMapKey = element as keyof typeof elementMap;
        if (elementMap[elementMapKey]) {
          elementMap[elementMapKey].push(matrix.slug);
        }
      });
    });

    this.allMatrices = [...this.SSRMatrices, ...this.SRMatrices]; // update the allMatrices array
  }

  ngOnInit() {
    const data = this.route.snapshot.data['data'];
    const matricesData = data.matrices;
    this.matrices = matricesData;
    this.populateArrays(matricesData);

    $('.element .wrapper img').click((event) => {
      const element = $(event.currentTarget).attr('data-element');
      this.activeElement = this.activeElement === element ? null : (element || null);
      const matricesToShow = this.getMatricesToShow(this.activeElement, this.activeRarity, this.activeType, this.activeRole);
      this.showMatrices(matricesToShow);
      this.updateActiveClasses();
    });
    
    $('.rarity .wrapper span').click((event) => {
      const rarity = $(event.currentTarget).attr('data-rarity');
      this.activeRarity = this.activeRarity === rarity ? null : (rarity || null);
      const matricesToShow = this.getMatricesToShow(this.activeElement, this.activeRarity, this.activeType,this.activeRole);
      this.showMatrices(matricesToShow);
      this.updateActiveClasses();
    });
    
    $('.type .wrapper img').click((event) => {
      const type = $(event.currentTarget).attr('data-type');
      this.activeType = this.activeType === type ? null : (type || null);
      const matricesToShow = this.getMatricesToShow(this.activeElement, this.activeRarity, this.activeType,this.activeRole);
      this.showMatrices(matricesToShow);
      this.updateActiveClasses();
    });
/* 
    $('.role .wrapper img').click((event) => {
      const role = $(event.currentTarget).attr('data-role');
      this.activeRole = this.activeRole === role ? null : (role || null);
      const matricesToShow = this.getMatricesToShow(this.activeElement, this.activeRarity, this.activeType, this.activeRole);
      this.showMatrices(matricesToShow);
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
    if (this.activeType !== null) {
      $(`.type .wrapper img[data-type="${this.activeType}"]`).addClass('active');
    } /*
    if (this.activeRole !== null) {
      $(`.role .wrapper img[data-role="${this.activeRole}"]`).addClass('active');
    } */
  }

  private getMatricesToShow(
    elementFilter: string | null,
    rarityFilter: string | null,
    typeFilter: string | null,
    roleFilter: string | null
  ): string[] {
    // Use filters to narrow down the matrices to show
    let filteredMatrices: string[] = this.allMatrices;
    if (elementFilter) {
      switch (elementFilter) {
        case 'altered':
          filteredMatrices = filteredMatrices.filter(unit => this.alteredMatrices.includes(unit));
          break;
        case 'physical':
          filteredMatrices = filteredMatrices.filter(unit => this.physicalMatrices.includes(unit) || this.physicalFlameMatrices.includes(unit));
          break;
        case 'flame':
          filteredMatrices = filteredMatrices.filter(unit => this.flameMatrices.includes(unit) || this.flamePhysicalMatrices.includes(unit));
          break;
        case 'frost':
          filteredMatrices = filteredMatrices.filter(unit => this.frostMatrices.includes(unit) || this.frostVoltMatrices.includes(unit));
          break;
        case 'volt':
          filteredMatrices = filteredMatrices.filter(unit => this.voltMatrices.includes(unit) || this.voltFrostMatrices.includes(unit));
          break;
      }
    }
    
    if (rarityFilter) {
      switch (rarityFilter) {
        case 'ssr':
          filteredMatrices = filteredMatrices.filter(unit => this.SSRMatrices.includes(unit));
          break;
        case 'sr':
          filteredMatrices = filteredMatrices.filter(unit => this.SRMatrices.includes(unit));
          break;
      }
    }

    if (typeFilter) {
      switch (typeFilter) {
        case 'damage':
          filteredMatrices = filteredMatrices.filter(unit => this.damageMatrices.includes(unit));
          break;
        case 'benediction':
          filteredMatrices = filteredMatrices.filter(unit => this.benedictionMatrices.includes(unit));
          break;
        case 'fortitude':
          filteredMatrices = filteredMatrices.filter(unit => this.fortitudeMatrices.includes(unit));
          break;
      }
    }
/*     if (roleFilter) {
      switch (roleFilter) {
        case 'MDPS':
          filteredMatrices = filteredMatrices.filter(unit => this.MDPSMatrices.includes(unit));
          break;
        case 'Buffer':
          filteredMatrices = filteredMatrices.filter(unit => this.BufferMatrices.includes(unit));
          break;
        case 'Healer':
          filteredMatrices = filteredMatrices.filter(unit => this.HealerMatrices.includes(unit));
          break;
        case 'SupportBuffer':
          filteredMatrices = filteredMatrices.filter(unit => this.SupportBufferMatrices.includes(unit));
          break;
        case 'Shatter':
          filteredMatrices = filteredMatrices.filter(unit => this.ShatterMatrices.includes(unit));
          break;
        case 'Taunt':
          filteredMatrices = filteredMatrices.filter(unit => this.TauntMatrices.includes(unit));
          break;
      }
    } */
    return filteredMatrices;
  }

  private showMatrices(matricesToShow: string[]): void {
    $('.unit-wrapper[data-unit]').parent().hide();
    matricesToShow.forEach(unit => {
      $(`[data-unit="${unit}"]`).parent().show();
    });
  }
}