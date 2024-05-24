import { Component, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-unit-card',
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.scss']
})
export class UnitCardComponent implements AfterViewInit {
  @Input() unit: any;

  processRoleSlug(role: string): string {
    return `assets/effects/buff_${role.toLowerCase().replace(/\s+/g, '')}.png`;
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