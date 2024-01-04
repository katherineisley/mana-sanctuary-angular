import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  activeElement: any = null;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('name')!;
    this.http.get<any>("../../assets/json/simulacra-data.json").subscribe(data => {
      this.unit = data.find((unit: any) => unit.slug === this.slug);
      // console.log(this.unit);
      const elementColors: {[key: string]: string} = {
        "element_physical": '#CF9B14',
        "element_physicalflame": '#CF9B14',
        "element_flame": '#E74412',
        "element_flamephysical": '#E74412',
        "element_frost": '#3498DB',
        "element_frostvolt": '#3498DB',
        "element_volt": '#8C7ED0',
        "element_voltfrost": '#8C7ED0'
      };
      document.documentElement.style.setProperty('--element-color', elementColors[this.unit.element]);
    }, error => console.error(error));
  }

  setActiveElement(element: any) {
    this.activeElement = element;
  }

  ngAfterViewInit() {
    $('.tabs .tab:first-child').addClass('active');
    $('.tabs .tab').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
    });
  }
}
