import { Component, OnInit } from '@angular/core';
import { UnitCardService } from '../unit-card.service';
@Component({
  selector: 'app-units-index',
  templateUrl: './units-index.component.html',
  styleUrls: ['./units-index.component.scss']
})
export class UnitsIndexComponent implements OnInit{
  units: any[] = [];

  constructor(private cardDataService: UnitCardService) {}

  ngOnInit() {
    this.cardDataService.getCardData().subscribe((data: any) => {
      this.units = data;
    });
  }
}
