import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as $ from 'jquery';

@Component({
  selector: 'app-relic-page',
  templateUrl: './relic-page.component.html',
  styleUrls: ['./relic-page.component.scss']
})

export class RelicPageComponent implements OnInit, AfterViewInit {
  slug!: string;
  relic: any = {};
  activeTab: any = null;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    const data = this.route.snapshot.data['data'];
    const relicsData = data.relics;

    this.slug = this.route.snapshot.paramMap.get('name')!;
    this.relic = relicsData.find((relic: any) => relic.slug === this.slug);
  }

  setActiveTab(element: any) {
    this.activeTab = element;
  }

  ngAfterViewInit() {
    $('.tabs .tab:first-child').addClass('active'); // make "Profile" tab active on page load
    $('.tabs .tab').click(function () {
      var tabName = $(this).data('tab');
      $(this).addClass('active').siblings().removeClass('active');
      $('.profile-part, .video-part, .guide-part').hide(); // Hide all parts initially
      switch (tabName) {
        case 'profile':
          $('.profile-part').show();
          break;
        case 'video':
          $('.video-part').show();
          break;
        case 'guide':
          $('.guide-part').show();
          break;
      }
    });
  }
}
