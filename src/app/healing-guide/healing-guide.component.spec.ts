import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealingGuideComponent } from './healing-guide.component';

describe('HealingGuideComponent', () => {
  let component: HealingGuideComponent;
  let fixture: ComponentFixture<HealingGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealingGuideComponent]
    });
    fixture = TestBed.createComponent(HealingGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
