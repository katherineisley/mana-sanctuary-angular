import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DpsDashboardComponent } from './dps-dashboard.component';

describe('DpsDashboardComponent', () => {
  let component: DpsDashboardComponent;
  let fixture: ComponentFixture<DpsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DpsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DpsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
