import { Component, Input, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-relic-card',
  templateUrl: './relic-card.component.html',
  styleUrls: ['./relic-card.component.scss']
})

export class RelicCardComponent {
  @Input() relic: any;

  processRoleSlug(role: string): string {
    return `assets/effects/buff_${role.toLowerCase().replace(/\s+/g, '')}.png`;
  }

  getRarityClass(): string {
    return this.relic.rarity.toLowerCase() === 'ssr' ? 'ssr-class' : 'sr-class';
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