import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-unit-page',
  templateUrl: './unit-page.component.html',
  styleUrls: ['./unit-page.component.scss']
})

export class UnitPageComponent implements OnInit, AfterViewInit {
  slug!: string;
  unit: any = {};
  activeTab: any = null;
  activeInfo: string = 'Advancements'; 
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('name')!;
    this.http.get<any>("assets/json/simulacra-data.json").subscribe(data => {
      this.unit = data.find((unit: any) => unit.slug === this.slug);
      // console.log(this.unit);
      const elementColors: {[key: string]: string} = { // this sets the page color depending on the element
        "element_physical": '#CF9B14',
        "element_physicalflame": '#CF9B14',
        "element_flame": '#E74412',
        "element_flamephysical": '#E74412',
        "element_frost": '#3498DB',
        "element_frostvolt": '#3498DB',
        "element_volt": '#8C7ED0',
        "element_voltfrost": '#8C7ED0',
        "element_altered": '#19C37D'
      };
      document.documentElement.style.setProperty('--element-color', elementColors[this.unit.element]);
    }, error => console.error(error));
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

  @ViewChildren('info') infos!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const underLineInit = new Event('custom');
    Object.defineProperty(underLineInit, 'target', {value: this.infos.first.nativeElement, enumerable: true});
    this.setActiveInfo(underLineInit); // make the underline appear under "Advancements" on page load

    setTimeout(() => {
      $('.underline').css('transition', 'left 0.3s ease, width 0.3s ease');
    }, 1); // shit solution so it doesnt get applied mid-render

    $('.tabs .tab:first-child').addClass('active'); // make "Profile" tab active on page load
    $('.tabs .tab').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
      if (!$('.tabs .tab[data-tab="profile"]').hasClass('active')) { // i doubt this solution will be permanent or at least not this ugly
        $('.profile-part').hide();
      } else {
        $('.profile-part').show();
      }
    });
  }
}
