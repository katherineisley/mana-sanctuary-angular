import { Component, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-matrix-card',
  templateUrl: './matrix-card.component.html',
  styleUrls: ['./matrix-card.component.scss']
})
export class MatrixCardComponent {
  @Input() matrix: any;


}