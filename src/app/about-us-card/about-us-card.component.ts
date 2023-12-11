import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-us-card',
  templateUrl: './about-us-card.component.html',
  styleUrls: ['./about-us-card.component.scss']
})
export class AboutUsCardComponent {
  @Input() card: any;

  getBackgroundStyle() {
    return `background: linear-gradient(#18181A, #18181A) padding-box, linear-gradient(0.395turn, ${this.card.color1}, ${this.card.color2}) border-box;`
    // lord have mercy I CAN'T TAKE THIS ANYMORE
  }
}