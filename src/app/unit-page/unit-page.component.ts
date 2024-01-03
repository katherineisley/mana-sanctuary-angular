import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('name')!;
    this.http.get<any>("../../assets/json/simulacra-data.json").subscribe(data => {
      this.unit = data.find((unit: any) => unit.slug === this.slug);
      console.log(this.unit);
      switch (this.unit.element) {
        case "element_physical":
        case "element_physicalflame":
          $('.tabs .tab').css('border', '1px solid #CF9B14');
          $('.tab.active').css('background-color', '#CF9B14');
          break;
        case "element_flame":
        case "element_flamephysical":
          $('.tabs .tab').css('border', '1px solid #E74412');
          $('.tab.active').css('background-color', '#E74412');
          break;
        case "element_frost":
        case "element_frostvolt":
          $('.tabs .tab').css('border', '1px solid #3498DB');
          $('.tab.active').css('background-color', '#3498DB');
          break;
        case "element_volt":
        case "element_voltfrost":
          $('.tabs .tab').css('border', '1px solid #8C7ED0');
          $('.tab.active').css('background-color', '#8C7ED0');
          break;
      }
    });
  }

  ngAfterViewInit() {
    $('.tabs .tab').click(function () {
      console.log('clicked');
      $(this).addClass('active').siblings().removeClass('active');
    });
  }
}
