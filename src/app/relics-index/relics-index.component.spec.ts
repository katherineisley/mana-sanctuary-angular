import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelicsIndexComponent } from './relics-index.component';

describe('RelicsIndexComponent', () => {
  let component: RelicsIndexComponent;
  let fixture: ComponentFixture<RelicsIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelicsIndexComponent]
    });
    fixture = TestBed.createComponent(RelicsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
