import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealingTeamsComponent } from './healing-teams.component';

describe('HealingTeamsComponent', () => {
  let component: HealingTeamsComponent;
  let fixture: ComponentFixture<HealingTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealingTeamsComponent]
    });
    fixture = TestBed.createComponent(HealingTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
