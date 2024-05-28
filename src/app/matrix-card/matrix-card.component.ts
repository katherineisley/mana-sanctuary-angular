import { Component, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-matrix-card',
  templateUrl: './matrix-card.component.html',
  styleUrls: ['./matrix-card.component.scss']
})
export class MatrixCardComponent {
  @Input() matrix: any;

  getRarityClass(): string {
    return this.matrix.rarity.toLowerCase() === 'ssr' ? 'ssr-class' : 'sr-class';
  }
  
  ngAfterViewInit() {
    $('.back-card').on('mouseleave', function() {
      $(this).addClass('reverse-animation');
      setTimeout(() => {
        $(this).removeClass('reverse-animation'); // playback bug starts happening again if the filter is applied
      }, 500 /* duration of animation */ );
    });
  }
}