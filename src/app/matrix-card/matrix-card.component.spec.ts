import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixCardComponent } from './matrix-card.component';

describe('MatrixCardComponent', () => {
  let component: MatrixCardComponent;
  let fixture: ComponentFixture<MatrixCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixCardComponent]
    });
    fixture = TestBed.createComponent(MatrixCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
