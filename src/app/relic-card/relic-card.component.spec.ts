import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelicCardComponent } from './relic-card.component';

describe('RelicCardComponent', () => {
  let component: RelicCardComponent;
  let fixture: ComponentFixture<RelicCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelicCardComponent]
    });
    fixture = TestBed.createComponent(RelicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
