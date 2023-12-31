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
    });
  }

  ngAfterViewInit() {
    $('.tabs .tab').click(function () {
      console.log('clicked');
      $(this).addClass('active').siblings().removeClass('active');
    });
  }
}
