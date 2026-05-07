import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointOperationComponent } from './joint-operation.component';

describe('JointOperationComponent', () => {
  let component: JointOperationComponent;
  let fixture: ComponentFixture<JointOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JointOperationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JointOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
