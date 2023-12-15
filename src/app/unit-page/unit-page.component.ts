import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-unit-page',
  templateUrl: './unit-page.component.html',
  styleUrls: ['./unit-page.component.scss']
})
export class UnitPageComponent /* implements OnInit */ {
  // name!: string;
  // unit: any;
  
  // constructor(private route: ActivatedRoute, private http: HttpClient) { }

  // ngOnInit() {
  //   this.name = this.route.snapshot.paramMap.get('name')!;
  //   this.http.get('../../assets/' + this.name + '.json').subscribe(data => {
  //     this.unit = data[this.name];
  //   });
  // }
}
