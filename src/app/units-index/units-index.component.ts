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

  constructor(private cardDataService: UnitCardService) { }

  ngOnInit() {
    this.cardDataService.getCardData().subscribe((data: any) => {
      this.units = data;
    });

    const physicalUnits: string[] = ['yanmiao', 'mingjing', 'umi', 'gnonno', 'lyra', 'claudia', 'shiro', 'bailing'];
    const flameUnits: string[] = ['lan', 'feise', 'liuhuo', 'annabella', 'ruby', 'cobaltb', 'zero', 'king', 'huma'];
    const frostUnits: string[] = ['alyss', 'linghan', 'yulan', 'icarus', 'sakifuwa', 'frigg', 'tsubasa', 'cocoritter', 'meryl', 'hilda', 'ene'];
    const voltUnits: string[] = ['rubilia', 'huang', 'fenrir', 'tianlang', 'nemesis', 'samir', 'crow', 'pepper', 'echo'];
    const physicalFlameUnits: string[] = ['mingjing', 'yanmiao'];
    const flamePhysicalUnits: string[] = [];
    const frostVoltUnits: string[] = [];
    const voltFrostUnits: string[] = [];
    const alteredUnits: string[] = ['nanyin', 'fiona', 'lin'];
    // RARITY ARRAYS
    const SSRUnits: string[] = ['umi', 'lan', 'alyss', 'rubilia', 'yanmiao', 'linghan', 'nanyin', 'feise', 'huang', 'mingjing', 'yulan', 'liuhuo', 'gnonno', 'fiona', 'icarus', 'fenrir', 'annabella', 'tianlang', 'lyra', 'lin', 'sakifuwa', 'ruby', 'frigg', 'nemesis', 'cobaltb', 'claudia', 'zero', 'tsubasa', 'shiro', 'samir', 'meryl', 'king', 'huma', 'crow', 'cocoritter'];
    const SRUnits: string[] = ['bailing', 'hilda', 'ene', 'pepper', 'echo'];
    const RUnits: string[] = [];
    // TYPE ARRAYS
    const damageUnits: string[] = ['umi', 'alyss', 'rubilia', 'yanmiao', 'linghan', 'nanyin', 'feise', 'mingjing', 'yulan', 'liuhuo', 'gnonno', 'icarus', 'fenrir', 'annabella', 'tianlang', 'lin', 'ruby', 'frigg', 'cobaltb', 'claudia', 'tsubasa', 'shiro', 'samir', 'king', 'crow', 'hilda', 'echo', 'bailing'];
    const benedictionUnits: string[] = ['fiona', 'lyra', 'nemesis', 'zero', 'cocoritter', 'pepper'];
    const fortitudeUnits: string[] = ['lan', 'huang', 'sakifuwa', 'meryl', 'huma', 'ene'];
    // ALL
    const allUnits: string[] = [...SSRUnits, ...SRUnits, ...RUnits];

    $('.element .wrapper img').click(function () {
      const element = $(this).attr('data-element');
      if (element !== undefined) {
        const filter: string = element;
        const unitsToShow = getUnitsToShow(filter);
        showUnits(unitsToShow);
      } else {
        console.error('data-element attribute is undefined');
      }

      $('.element .wrapper img, .rarity .wrapper span, .type .wrapper img').removeClass('active');
      $(this).addClass('active');
    });

    $('.rarity .wrapper span').click(function () {
      const rarityElement = $(this).attr('data-rarity');
      if (rarityElement !== undefined) {
        const filter: string = rarityElement;
        const unitsToShow = getUnitsToShow(filter);
        showUnits(unitsToShow);
      } else {
        console.error('data-type attribute is undefined');
      }

      $('.element .wrapper img, .rarity .wrapper span, .type .wrapper img').removeClass('active');
      $(this).addClass('active');
    });

    $('.type .wrapper img').click(function () {
      const typeElement = $(this).attr('data-type');
      if (typeElement !== undefined) {
        const filter: string = typeElement;
        const unitsToShow = getUnitsToShow(filter);
        showUnits(unitsToShow);
      } else {
        console.error('data-element attribute is undefined');
      }

      $('.element .wrapper img, .rarity .wrapper span, .type .wrapper img').removeClass('active');
      $(this).addClass('active');
    });

    function getUnitsToShow(filter: string): string[] {
      switch (filter) {
        case 'all':
          return allUnits;
        case 'physical':
          return physicalUnits;
        case 'flame':
          return flameUnits;
        case 'frost':
          return frostUnits;
        case 'volt':
          return voltUnits;
        case 'physical-flame':
          return physicalFlameUnits;
        case 'flame-physical':
          return flamePhysicalUnits;
        case 'frost-volt':
          return frostVoltUnits;
        case 'volt-frost':
          return voltFrostUnits;
        case 'altered':
          return alteredUnits;
        case 'ssr':
          return SSRUnits;
        case 'sr':
          return SRUnits;
        case 'r':
          return RUnits;
        case 'damage':
          return damageUnits;
        case 'benediction':
          return benedictionUnits;
        case 'fortitude':
          return fortitudeUnits;
        default:
          console.log('Invalid filter');
          return [];
      }
    }

    function showUnits(unitsToShow: string[]): void {
      $('.unit-wrapper[data-unit]').parent().hide();
      unitsToShow.forEach(unit => {
        $(`[data-unit="${unit}"]`).parent().show();
      });
    }
  }
}
