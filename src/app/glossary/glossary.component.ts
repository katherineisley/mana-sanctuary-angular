import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent {
  terms: any[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const data = this.route.snapshot.data['data'];
    this.terms = data.glossary;
  
    // sort alphabetically
    this.terms.sort((a, b) => a.name.localeCompare(b.name));
  }
}
