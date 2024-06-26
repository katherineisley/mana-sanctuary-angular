import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsCardComponent } from './about-us-card.component';

describe('AboutUsCardComponent', () => {
  let component: AboutUsCardComponent;
  let fixture: ComponentFixture<AboutUsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsCardComponent]
    });
    fixture = TestBed.createComponent(AboutUsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
