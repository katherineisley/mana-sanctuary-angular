import { Component, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-unit-card',
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.scss']
})
export class UnitCardComponent implements AfterViewInit {
  @Input() unit: any;

  ngAfterViewInit() {
    $('.back-card').one('mouseleave', function() {
      $(this).addClass('reverse-animation');
    });
  }
}