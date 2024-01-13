import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-healing-calculator',
  templateUrl: './healing-calculator.component.html',
  styleUrls: ['./healing-calculator.component.scss']
})

export class HealingCalculatorComponent implements OnInit {
  units: any[] = [];
  matrices: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>("assets/json/simulacra-data.json").subscribe(data => {
      this.units = data;
    }, error => console.error(error));
    // this.http.get<any>("assets/json/matrices-data.json").subscribe(data => { // does not exist yet
    //   this.matrices = data;
    // }, error => console.error(error));
  }
}
