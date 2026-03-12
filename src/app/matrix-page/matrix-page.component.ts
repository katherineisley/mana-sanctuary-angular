import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as $ from 'jquery';

@Component({
  selector: 'app-matrix-page',
  templateUrl: './matrix-page.component.html',
  styleUrls: ['./matrix-page.component.scss']
})

export class MatrixPageComponent implements OnInit {
  slug!: string;
  matrix: any = {};
  specificUnit: any = {};
  validLinks: number = 0;
  activeTab: any = null;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.validLinks = 0;
    const data = this.route.snapshot.data['data'];
    const matricesData = data.matrices;
    this.specificUnit = data.simulacra.find((unit: any) => unit.slug === this.route.snapshot.paramMap.get('name')!);

    if (this.specificUnit) {
      this.validLinks++;
    }

    this.slug = this.route.snapshot.paramMap.get('name')!;
    this.matrix = matricesData.find((matrix: any) => matrix.slug === this.slug);

    if(this.matrix) {
      const element = this.matrix.element;
      console.log(element);

      const elementColors: { [key: string]: string } = {
        "physical": '#CF9B14',
        "physicalflame": '#CF9B14',
        "flame": '#E74412',
        "flamephysical": '#E74412',
        "frost": '#3498DB',
        "frostvolt": '#3498DB',
        "volt": '#8C7ED0',
        "voltfrost": '#8C7ED0',
        "altered": '#0EA667',
        "all":  "#C49860"
      };

      if (element.length > 1) {
        // document.documentElement.style.setProperty('--use-gradient-border', 'true');
        document.documentElement.style.setProperty('--element-gradient-color1', elementColors[element[0]]);
        document.documentElement.style.setProperty('--element-gradient-color2', elementColors[element[1]]);
        document.documentElement.style.removeProperty('--element-color');
      } else {
        // document.documentElement.style.setProperty('--use-gradient-border', 'false');
        document.documentElement.style.setProperty('--element-color', elementColors[element[0]]);
        document.documentElement.style.removeProperty('--element-gradient-color1');
        document.documentElement.style.removeProperty('--element-gradient-color2');
      }
    }
  }

  setActiveTab(element: any) {
    this.activeTab = element;
  }

  ngAfterViewInit() {
    $('.tabs .tab:first-child').addClass('active'); // make "Profile" tab active on page load
    $('.tabs .tab').click(function () {
      var tabName = $(this).data('tab');
      $(this).addClass('active').siblings().removeClass('active');
      $('.profile-part, .buff-breakdown-part, .notes-part').hide(); // Hide all parts initially
      switch (tabName) {
        case 'profile':
          $('.profile-part').show();
          break;
        case 'buff-breakdown':
          $('.buff-breakdown-part').show();
          break;
        case 'notes':
          $('.notes-part').show();
          break;
      }
    });
  }
}
