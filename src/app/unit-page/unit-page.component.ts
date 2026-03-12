import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as $ from 'jquery';

@Component({
  selector: 'app-unit-page',
  templateUrl: './unit-page.component.html',
  styleUrls: ['./unit-page.component.scss']
})

export class UnitPageComponent implements OnInit, AfterViewInit {

  @ViewChildren('info') infos!: QueryList<ElementRef>;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  // Radar Chart
  radarChartType: ChartType = 'radar';
  radarChartLabels: string[] = [];
  radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [{
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  };
  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false  // <-- disables the legend
      }
    },
    elements: {
      line: { borderWidth: 2 } // line thickness
    },
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.6)' // color of the web lines
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.6)' // color of the lines going from center to each label
        },
        pointLabels: {
          color: '#ffffff', // color of the labels around the chart
          font: {
            size: 16
          }
        },
        ticks: {
          display: false
        }
      }
    }
  };

  updateRadarChart(newLabels: string[], newData: number[]) {
    this.radarChartLabels = newLabels;
    this.radarChartData.labels = this.radarChartLabels;
    this.radarChartData.datasets[0].data = newData;
    this.chart?.update();
  }

  // Utility
  processRoleSlug(role: string): string {
    return `assets/effects/buff_${role.toLowerCase().replace(/\s+/g, '')}.png`;
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Materials
  onSliderChange() {
    if (this.unit.server == "gacha") {
      this.calculateTotalMaterials();
    }
    if (this.unit.server == "warp") {
      this.calculateTotalMaterialsMMO(this.element);
    }
  }

  elementMaterialMappings: Record<string, Record<string, string>> = {
    frost: {
      elementalCore_A: 'icecore_A',
      upgradeA_A: 'acidproofglaze_A',
      upgradeB_A: 'nanofiberframe_A',
      elementalCore_B: 'icecore_B',
      upgradeA_B: 'acidproofglaze_B',
      upgradeB_B: 'nanofiberframe_B',
      elementalCore_C: 'icecore_C',
      upgradeA_C: 'acidproofglaze_C',
      upgradeB_C: 'nanofiberframe_C',
    },

    volt: {
      elementalCore_A: 'magcore_A',
      upgradeA_A: 'nanocoating_A',
      upgradeB_A: 'boosterframe_A',
      elementalCore_B: 'magcore_B',
      upgradeA_B: 'nanocoating_B',
      upgradeB_B: 'boosterframe_B',
      elementalCore_C: 'magcore_C',
      upgradeA_C: 'nanocoating_C',
      upgradeB_C: 'boosterframe_C',
    },

    physical: {
      elementalCore_A: 'rockcore_A',
      upgradeA_A: 'nanocoating_A',
      upgradeB_A: 'boosterframe_A',
      elementalCore_B: 'rockcore_B',
      upgradeA_B: 'nanocoating_B',
      upgradeB_B: 'boosterframe_B',
      elementalCore_C: 'rockcore_C',
      upgradeA_C: 'nanocoating_C',
      upgradeB_C: 'boosterframe_C',
    },

    flame: {
      elementalCore_A: 'firecore_A',
      upgradeA_A: 'acidproofglaze_A',
      upgradeB_A: 'nanofiberframe_A',
      elementalCore_B: 'firecore_B',
      upgradeA_B: 'acidproofglaze_B',
      upgradeB_B: 'nanofiberframe_B',
      elementalCore_C: 'firecore_C',
      upgradeA_C: 'acidproofglaze_C',
      upgradeB_C: 'nanofiberframe_C',
    },

    altered: {
      upgradeA_A: 'nanocoating_A',
      upgradeB_A: 'acidproofglaze_A',
      upgradeC_A: 'boosterframe_A',
      upgradeD_A: 'nanofiberframe_A',
      upgradeA_B: 'nanocoating_B',
      upgradeB_B: 'acidproofglaze_B',
      upgradeC_B: 'boosterframe_B',
      upgradeD_B: 'nanofiberframe_B',
      upgradeA_C: 'nanocoating_C',
      upgradeB_C: 'acidproofglaze_C',
      upgradeC_C: 'boosterframe_C',
      upgradeD_C: 'nanofiberframe_C',
    }
  };

  calculateTotalMaterials() {
    const start = this.startvalue;
    const end = this.endvalue;

    const totals: Record<string, number> = {};

    const colourMap: Record<string, string> = {
      enhance: "#4286DC",
      augmentGold: "#4286DC",

      elementalCore_A: "#4286DC",
      upgradeA_A: "#4286DC",
      upgradeB_A: "#4286DC",
      upgradeC_A: "#4286DC",
      upgradeD_A: "#4286DC",

      elementalCore_B: "#986BB5",
      upgradeA_B: "#986BB5",
      upgradeB_B: "#986BB5",
      upgradeC_B: "#986BB5",
      upgradeD_B: "#986BB5",

      elementalCore_C: "#D99F44",
      upgradeA_C: "#D99F44",
      upgradeB_C: "#D99F44",
      upgradeC_C: "#D99F44",
      upgradeD_C: "#D99F44",
    };

    // 🔹 1. Sum materials
    for (const upgrade of this.upgradeData.upgrade) {
      if (upgrade.level > start && upgrade.level <= end) {

        totals['enhance'] = (totals['enhance'] || 0) + upgrade['enhance'];
        totals['augmentGold'] = (totals['augmentGold'] || 0) + upgrade['augmentGold'];

        upgrade['augmentMaterials'].forEach((material: string, index: number) => {
          const amount = upgrade['augmentAmount'][index] || 0;
          totals[material] = (totals[material] || 0) + amount;
        });
      }
    }

    // 🔹 2. Get correct element mapping object dynamically
    const elementMap = this.getElementMapping();

    // 🔹 3. Convert to array + rename materials + assign colours
    this.totalMaterialsArray = Object.entries(totals).map(([key, value]) => {
      const renamedKey = elementMap[key] ?? key;
      return [renamedKey, value];
    });

    // 🔹 Assign colours based on ORIGINAL keys
    this.materialsColour = Object.keys(totals).map(key =>
      colourMap[key] ?? "#FFFFFF"
    );

    this.cdr.detectChanges();
  }

  getElementMapping(): Record<string, string> {
    return this.elementMaterialMappings[this.materialsElement] ?? {};
  }

  // Tabs
  setActiveTab(element: any) {
    this.activeTab = element;
  }

  setActiveInfo(event: Event | string | null) {
    if (typeof event === 'string') {
      this.activeInfo = event;
    } else if (event instanceof Event) {
      const target = (event.target as HTMLElement);
      this.activeInfo = target.textContent || ''; // assuming the text content of the element is the desired information
      const rect = target.getBoundingClientRect();
      const underline = document.querySelector('.underline') as HTMLElement;
      const containerRect = (underline.parentElement as HTMLElement).getBoundingClientRect();
      underline.style.left = `${rect.left - containerRect.left - 8}px`; // offset the width extension
      underline.style.width = `${rect.width + 16}px`; // make it a bit prettier

      // remove the class "active" from all the other infos
      const infoElements = document.querySelectorAll('.info');
      infoElements.forEach(element => {
        element.classList.remove('active');
      });

      // add the class "active" to the current info
      target.classList.add('active');
    }
  }

  tierColours: Record<string, string> = {
    A: '#69c26c',   // Green
    B: "#4286DC",   // Blue
    C: "#986BB5",   // Purple
    D: "#D99F44"    // Gold
  };


  calculateTotalMaterialsMMO(element: string) {
    const start = this.startvalue;
    const end = this.endvalue;

    const totals: Record<string, number> = {};
    let totalGold = 0;

    for (const level of this.weaponMaterialsData) {
      if (level.lv > start && level.lv <= end) {

        totalGold += level.gold;

        for (const item of level.items) {
          const key = item.id=="A" ? item.id : `${item.id}_${element}`;
          totals[key] = (totals[key] || 0) + item.amount;
        }
      }
    }

    // Convert to array with colours
    this.totalMaterialsArray = Object.entries(totals);

    this.materialsColour = this.totalMaterialsArray.map(([id]) => {
      const tier = id[0];
      return tier ? this.tierColours[tier] : '#FFFFFF';
    });

    // Add gold separately if you want it displayed
    if (totalGold > 0) {
      this.totalMaterialsArray.unshift(['augmentGold', totalGold]);
      this.materialsColour.unshift("#4286DC");
    }

    this.cdr.detectChanges();
  }

  // Variables
  slug!: string;
  server!:string;
  unit: any = {};
  matrix: any = {};
  upgradeData: any = {};
  activeTab: any = null;
  activeInfo: string = 'Advancements';
  sliderValues!: number[];
  materialsColour: any = [];
  totalMaterialsArray: [string, number][] = [];
  startvalue!: number;
  endvalue!: number;
  materialsElement!: string;
  weaponMaterialsData: any = [];
  element!:string;
  simulacraData!: any;
  matricesData!: any;


  ngOnInit() {
    const data = this.route.snapshot.data['data'];

    this.route.paramMap.subscribe(params => {
      this.simulacraData = data.simulacra;
      this.matricesData = data.matrices;
      this.slug = this.route.snapshot.paramMap.get('name')!;
      this.server = this.route.snapshot.paramMap.get('server')!;
      this.unit = this.simulacraData.find((unit: any) => unit.slug === this.slug && unit.server === this.server);
      this.matrix = this.matricesData.find((matrix: any) => matrix.slug === this.slug);

    // set initial values first
    this.startvalue = 0;
    this.endvalue = this.unit.server === 'warp' ? 15 : 200;
    this.sliderValues = this.unit.server === 'warp' ? [0, 15] : [0, 200];

    if (this.unit.server == "warp") {
      this.weaponMaterialsData = data.weaponMaterialsWarp;

    }
    if (this.unit.server == "gacha") {
      this.weaponMaterialsData = data.weaponMaterials;

    }

    this.element = this.unit.element;
    const rarity = this.unit.rarity;

    // Set page color depending on the element
    const elementColors: { [key: string]: string } = {
      "physical": '#CF9B14',
      "physicalflame": '#CF9B14',
      "flame": '#E74412',
      "flamephysical": '#E74412',
      "frost": '#3498DB',
      "frostvolt": '#3498DB',
      "volt": '#8C7ED0',
      "voltfrost": '#8C7ED0',
      "altered": '#0EA667'
    };

    document.documentElement.style.setProperty('--element-color', elementColors[this.element]);

    // Weapon Element for materials
    const materialMappings: { [key: string]: string } = {
      "physical": 'physical',
      "physicalflame": 'physical',
      "flame": 'flame',
      "flamephysical": 'flame',
      "frost": 'frost',
      "frostvolt": 'frost',
      "volt": 'volt',
      "voltfrost": 'volt',
      "altered": 'altered'
    };

    this.materialsElement = materialMappings[this.element];

    // Fetch upgrade data

    if (this.unit.server == "gacha") {
      this.upgradeData = this.weaponMaterialsData.find((upgradeData: any) => {
        if (this.element !== 'altered' && rarity == 'SSR') {
          return upgradeData.slug === 'element_all';
        } else if (this.element === 'altered') {
          return upgradeData.slug === this.element;
        } else if (rarity === 'SR') {
          return upgradeData.slug === 'element_sr';
        } else {
          return upgradeData.slug === 'element_all';
        }
      });
    }

    if (this.unit.server == "gacha") {
      this.calculateTotalMaterials();
    }
    if (this.unit.server == "warp") {
      this.calculateTotalMaterialsMMO(this.element);
    }
       });
  }


  ngAfterViewInit() {

    // Radar Chart
    if (this.unit && this.unit.ability_maps) {
      const labels = this.unit.ability_maps.map((a: any) => {
        const key = Object.keys(a)[0];
        const value = Object.values(a)[0];
        return `${key} ${value}`;  // Combine name and value
      });
      const data = this.unit.ability_maps.map((a: any) => Object.values(a)[0]);
      this.updateRadarChart(labels, data);
    }

    // Tabs
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
