import { Component, OnInit } from '@angular/core';
import { AboutUsCardService } from '../about-us-card.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})

export class AboutUsComponent {
  cards: any[] = [];
  constructor(private cardDataService: AboutUsCardService) { }

  ngOnInit() {
    this.cardDataService.getCardData().subscribe((data: any) => {
      this.cards = data;
    });
  }
}
