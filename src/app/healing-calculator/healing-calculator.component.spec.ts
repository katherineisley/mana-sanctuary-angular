import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealingCalculatorComponent } from './healing-calculator.component';

describe('HealingCalculatorComponent', () => {
  let component: HealingCalculatorComponent;
  let fixture: ComponentFixture<HealingCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealingCalculatorComponent]
    });
    fixture = TestBed.createComponent(HealingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
