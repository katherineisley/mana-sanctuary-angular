import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})

export class AboutUsComponent {
  cards: any[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAboutUsData().subscribe((data: any) => {
      this.cards = data;
    });
  }
}
