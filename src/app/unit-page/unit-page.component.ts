import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as $ from 'jquery';

@Component({
  selector: 'app-unit-page',
  templateUrl: './unit-page.component.html',
  styleUrls: ['./unit-page.component.scss']
})

export class UnitPageComponent implements OnInit, AfterViewInit {
  slug!: string;
  unit: any = {};
  matrix: any = {};
  upgradeData: any = {};
  activeTab: any = null;
  activeInfo: string = 'Advancements';
  sliderValues: number[] = [0, 200];
  materialsColour: any = [];
  totalMaterialsArray: [string, number][] = [];
  startvalue: number = 0;
  endvalue: number = 200;
  materialsElement!: string;


  frostMappings: { [key: string]: string } = {
    'elementalCore_A': 'icecore_A',
    'upgradeA_A': 'acidproofglaze_A',
    'upgradeB_A': 'nanofiberframe_A',
    'elementalCore_B': 'icecore_B',
    'upgradeA_B': 'acidproofglaze_B',
    'upgradeB_B': 'nanofiberframe_B',
    'elementalCore_C': 'icecore_C',
    'upgradeA_C': 'acidproofglaze_C',
    'upgradeB_C': 'nanofiberframe_C',
  };

  voltMappings: { [key: string]: string } = {
    'elementalCore_A': 'magcore_A',
    'upgradeA_A': 'nanocoating_A',
    'upgradeB_A': 'boosterframe_A',
    'elementalCore_B': 'magcore_B',
    'upgradeA_B': 'nanocoating_B',
    'upgradeB_B': 'boosterframe_B',
    'elementalCore_C': 'magcore_C',
    'upgradeA_C': 'nanocoating_C',
    'upgradeB_C': 'boosterframe_C',
  };

  physicalMappings: { [key: string]: string } = {
    'elementalCore_A': 'rockcore_A',
    'upgradeA_A': 'nanocoating_A',
    'upgradeB_A': 'boosterframe_A',
    'elementalCore_B': 'rockcore_B',
    'upgradeA_B': 'nanocoating_B',
    'upgradeB_B': 'boosterframe_B',
    'elementalCore_C': 'rockcore_C',
    'upgradeA_C': 'nanocoating_C',
    'upgradeB_C': 'boosterframe_C',
  };

  flameMappings: { [key: string]: string } = {
    'elementalCore_A': 'firecore_A',
    'upgradeA_A': 'acidproofglaze_A',
    'upgradeB_A': 'nanofiberframe_A',
    'elementalCore_B': 'firecore_B',
    'upgradeA_B': 'acidproofglaze_B',
    'upgradeB_B': 'nanofiberframe_B',
    'elementalCore_C': 'firecore_C',
    'upgradeA_C': 'acidproofglaze_C',
    'upgradeB_C': 'nanofiberframe_C',
  };

  alteredMappings: { [key: string]: string } = {
    'upgradeA_A': 'nanocoating_A',
    'upgradeB_A': 'acidproofglaze_A',
    'upgradeC_A': 'boosterframe_A',
    'upgradeD_A': 'nanofiberframe_A',
    'upgradeA_B': 'nanocoating_B',
    'upgradeB_B': 'acidproofglaze_B',
    'upgradeC_B': 'boosterframe_B',
    'upgradeD_B': 'nanofiberframe_B',
    'upgradeA_C': 'nanocoating_C',
    'upgradeB_C': 'acidproofglaze_B',
    'upgradeC_C': 'boosterframe_C',
    'upgradeD_C': 'nanofiberframe_C',
  };

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {

    const data = this.route.snapshot.data['data'];
    const simulacraData = data.simulacra;
    const matricesData = data.matrices;
    const weaponMaterialsData = data.weaponMaterials;

    this.slug = this.route.snapshot.paramMap.get('name')!;
    this.unit = simulacraData.find((unit: any) => unit.slug === this.slug);

    if (this.unit) {
      const element = this.unit.element;
      const rarity = this.unit.rarity;

      // Set page color depending on the element
      const elementColors: { [key: string]: string } = {
        "element_physical": '#CF9B14',
        "element_physicalflame": '#CF9B14',
        "element_flame": '#E74412',
        "element_flamephysical": '#E74412',
        "element_frost": '#3498DB',
        "element_frostvolt": '#3498DB',
        "element_volt": '#8C7ED0',
        "element_voltfrost": '#8C7ED0',
        "element_altered": '#0EA667'
      };
      const materialMappings: { [key: string]: string } = {
        "element_physical": 'element_physical',
        "element_physicalflame": 'element_physical',
        "element_flame": 'element_flame',
        "element_flamephysical": 'element_flame',
        "element_frost": 'element_frost',
        "element_frostvolt": 'element_frost',
        "element_volt": 'element_volt',
        "element_voltfrost": 'element_volt',
        "element_altered": 'element_altered'
      };

      this.materialsElement = materialMappings[element];
      document.documentElement.style.setProperty('--element-color', elementColors[element]);
      // Fetch upgrade data

      this.upgradeData = weaponMaterialsData.find((upgradeData: any) => {
        if (element !== 'element_altered' && rarity == 'SSR') {
          return upgradeData.slug === 'element_all';
        } else if (element === 'element_altered') {
          return upgradeData.slug === element;
        } else if (rarity === 'SR') {
          return upgradeData.slug === 'element_sr';
        } else {
          return upgradeData.slug === 'element_all';
        }
      });

      console.log(this.upgradeData);
      console.log(this.unit);
    }

    this.matrix = matricesData.find((matrix: any) => matrix.slug === this.slug);
    this.calculateTotalMaterials();
  }

  setActiveTab(element: any) {
    this.activeTab = element;
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
  onSliderChange() {
    this.calculateTotalMaterials();
  }

  private calculateTotalMaterials() {
    // Calculate the total number of each material between the selected levels
    let startLevel = this.startvalue;
    let endLevel = this.endvalue;

    let totalMaterials: { [material: string]: number } = {}; // Object to store total materials

    const thirdValueMappings: { [key: string]: string } = {
      'enhance': "#4286DC",
      'augmentGold': "#4286DC",
      "elementalCore_A": "#4286DC",
      "upgradeA_A": "#4286DC",
      "upgradeB_A": "#4286DC",
      "upgradeC_A": "#4286DC",
      "upgradeD_A": "#4286DC",
      "elementalCore_B": "#986BB5",
      "upgradeA_B": "#986BB5",
      "upgradeB_B": "#986BB5",
      "upgradeC_B": "#986BB5",
      "upgradeD_B": "#986BB5",
      "elementalCore_C": "#D99F44",
      "upgradeA_C": "#D99F44",
      "upgradeB_C": "#D99F44",
      "upgradeC_C": "#D99F44",
      "upgradeD_C": "#D99F44",
    };
    let augmentAmountIndex = 0;
    for (let i = 0; i < this.upgradeData.upgrade.length; i++) {
      const upgrade = this.upgradeData.upgrade[i];
      if (upgrade.level > startLevel && upgrade.level <= endLevel) {
        // Sum up the materials for each upgrade level
        totalMaterials['enhance'] = (totalMaterials['enhance'] || 0) + upgrade.enhance;
        totalMaterials['augmentGold'] = (totalMaterials['augmentGold'] || 0) + upgrade.augmentGold;
        // Loop through augmentM  aterials array and count each material
        upgrade.augmentMaterials.forEach((material: string) => { // Specify type string for material

          totalMaterials[material] = (totalMaterials[material] || 0) + upgrade.augmentAmount[augmentAmountIndex++];
        });
        if (augmentAmountIndex >= upgrade.augmentAmount.length) {
          augmentAmountIndex = 0;
        }
      }
    }

    // Convert the object into an array of {material: total} pairs
    this.totalMaterialsArray = Object.entries(totalMaterials);
    this.materialsColour = [];
    // Iterate over each array and create an entry value if the first element matches a specific value
    for (let i = 0; i < this.totalMaterialsArray.length; i++) {
      let firstElement = this.totalMaterialsArray[i][0];
      if (thirdValueMappings.hasOwnProperty(firstElement)) {
        // If a mapping exists for the first element, add the corresponding entry value to the materialsColour array
        let entryValue = thirdValueMappings[firstElement];
        this.materialsColour.push(entryValue);
      }
    }
    // Iterate over the array of arrays and modify the inner arrays
    for (let i = 0; i < this.totalMaterialsArray.length; i++) {
      const innerArray = this.totalMaterialsArray[i];
      const firstElement = innerArray[0];

      if (this.materialsElement == 'element_volt') {
        if (this.voltMappings.hasOwnProperty(firstElement)) {
          innerArray[0] = this.voltMappings[firstElement];
        }
      }
      if (this.materialsElement == 'element_frost') {
        if (this.frostMappings.hasOwnProperty(firstElement)) {
          innerArray[0] = this.frostMappings[firstElement];
        }
      }
      if (this.materialsElement == 'element_flame') {
        if (this.flameMappings.hasOwnProperty(firstElement)) {
          innerArray[0] = this.flameMappings[firstElement];
        }
      }
      if (this.materialsElement == 'element_physical') {
        if (this.physicalMappings.hasOwnProperty(firstElement)) {
          innerArray[0] = this.physicalMappings[firstElement];
        }
      }
      if (this.materialsElement == 'element_altered') {
        if (this.alteredMappings.hasOwnProperty(firstElement)) {
          innerArray[0] = this.alteredMappings[firstElement];
        }
      }
    }
    // Trigger change detection
    this.cdr.detectChanges();
  }

  @ViewChildren('info') infos!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const underLineInit = new Event('custom');
    Object.defineProperty(underLineInit, 'target', { value: this.infos.first.nativeElement, enumerable: true });
    this.setActiveInfo(underLineInit); // make the underline appear under "Advancements" on page load

    setTimeout(() => {
      $('.underline').css('transition', 'left 0.3s ease, width 0.3s ease');
    }, 1); // shit solution so it doesnt get applied mid-render

    $('.tabs .tab:first-child').addClass('active'); // make "Profile" tab active on page load

    $('.tabs .tab').click(function () {
      var tabName = $(this).data('tab');
      $(this).addClass('active').siblings().removeClass('active');

      $('.profile-part, .matrix-part, .materials-part, .guide-part').hide(); // Hide all parts initially

      switch (tabName) {
        case 'profile':
          $('.profile-part').show();
          break;
        case 'matrix':
          $('.matrix-part').show();
          break;
        case 'materials':
          $('.materials-part').show();
          break;
        case 'guide':
          $('.guide-part').show();
          break;
      }
    });
  }
}
