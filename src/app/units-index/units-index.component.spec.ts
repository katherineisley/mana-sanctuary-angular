import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsIndexComponent } from './units-index.component';

describe('UnitsIndexComponent', () => {
  let component: UnitsIndexComponent;
  let fixture: ComponentFixture<UnitsIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitsIndexComponent]
    });
    fixture = TestBed.createComponent(UnitsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
