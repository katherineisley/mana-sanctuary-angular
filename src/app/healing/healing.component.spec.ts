import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealingComponent } from './healing.component';

describe('HealingComponent', () => {
  let component: HealingComponent;
  let fixture: ComponentFixture<HealingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealingComponent]
    });
    fixture = TestBed.createComponent(HealingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
