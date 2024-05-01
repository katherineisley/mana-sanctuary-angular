import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as $ from 'jquery';

@Component({
  selector: 'app-matrix-page',
  templateUrl: './matrix-page.component.html',
  styleUrls: ['./matrix-page.component.scss']
})

export class MatrixPageComponent  {
  slug!: string;
  matrix: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('name')!;
    this.http.get<any>("assets/json/simulacra-data.json").subscribe(data => {
      this.matrix = data.find((matrix: any) => matrix.slug === this.slug);
    }, error => console.error(error));
  }
}