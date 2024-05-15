import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as $ from 'jquery';

@Component({
  selector: 'app-matrix-page',
  templateUrl: './matrix-page.component.html',
  styleUrls: ['./matrix-page.component.scss']
})

export class MatrixPageComponent implements OnInit {
  slug!: string;
  matrix: any = {};

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    const data = this.route.snapshot.data['data'];
    const matricesData = data.matrices;

    this.slug = this.route.snapshot.paramMap.get('name')!;
    this.matrix = matricesData.find((matrix: any) => matrix.slug === this.slug);
  }
}
