import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  unit: any = {};
  matrix: any = {};
  relic: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const data = this.route.snapshot.data['data'];
    const simulacraData = data.simulacra[0];
    const matrixData = data.matrices[0];
    const relicData = data.relics[0];
    this.unit = simulacraData;
    this.matrix = matrixData;
    this.relic = relicData;
  }

  animateBars() {
    $('.single-bar-container').each(function () {
      const parentID = $(this).attr('id');
      console.log(parentID); // debug
      const bars = $(this).find('.anim-bar'); 
      console.log(bars); // debug
      switch (parentID) {
        // change height as needed
        case "dps":
          bars[0].style.height = "30px";
          bars[1].style.height = "100%";
          bars[2].style.height = "50px";
          break;
        case "benediction":
          bars[0].style.height = "100%";
          bars[1].style.height = "20px";
          bars[2].style.height = "70px";
          break;
        case "fortitude":
          bars[0].style.height = "20px";
          bars[1].style.height = "40px";
          bars[2].style.height = "100%";
          break;
        default:
          console.log("No matching parent ID found");
      }
    });
  }

  ngAfterViewInit() {
    const observedElement = document.querySelector('div.bars-block');
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log('intersected');
        this.animateBars();
        observer.disconnect();
      }
    }, {
      root: null,
      threshold: 1
    });

    if (observedElement) {
      observer.observe(observedElement);
    }
  }
}
