import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelicPageComponent } from './relic-page.component';

describe('RelicPageComponent', () => {
  let component: RelicPageComponent;
  let fixture: ComponentFixture<RelicPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelicPageComponent]
    });
    fixture = TestBed.createComponent(RelicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
