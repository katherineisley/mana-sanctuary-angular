import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';

@Component({
  selector: 'app-anchor-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anchor-page.component.html',
  styleUrl: './anchor-page.component.scss'
})
export class AnchorPageComponent implements OnInit {

  items: any[] = [];

  // grouped by level dynamically
  groupedItems: { [key: number]: any[] } = {};

  // optional: keeps levels sorted for iteration
  levels: number[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAnchors().subscribe((data) => {
      this.items = data;

      this.groupItemsByLevel();
    });
  }

  private groupItemsByLevel(): void {
    this.groupedItems = this.items.reduce((acc: any, item: any) => {
      const level = item.Level;

      if (!acc[level]) {
        acc[level] = [];
      }

      acc[level].push(item);
      return acc;
    }, {});

    // extract and sort levels (1,2,3,...)
    this.levels = Object.keys(this.groupedItems)
      .map(Number)
      .sort((a, b) => a - b);
  }

  getRarityClass(quality: string): string {
    switch (quality?.toUpperCase()) {
      case 'COMMON':
        return 'common';
      case 'RARE':
        return 'rare';
      case 'EPIC':
        return 'epic';
      case 'LEGENDRY':
      case 'LEGENDARY':
        return 'legendary';
      default:
        return 'common';
    }
  }
}
