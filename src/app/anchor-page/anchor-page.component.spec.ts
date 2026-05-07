import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnchorPageComponent } from './anchor-page.component';

describe('AnchorPageComponent', () => {
  let component: AnchorPageComponent;
  let fixture: ComponentFixture<AnchorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnchorPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnchorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
