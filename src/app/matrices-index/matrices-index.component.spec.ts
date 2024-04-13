import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatricesIndexComponent } from './matrices-index.component';

describe('MatricesIndexComponent', () => {
  let component: MatricesIndexComponent;
  let fixture: ComponentFixture<MatricesIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatricesIndexComponent]
    });
    fixture = TestBed.createComponent(MatricesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
