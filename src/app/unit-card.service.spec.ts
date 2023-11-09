import { TestBed } from '@angular/core/testing';

import { UnitCardService } from './unit-card.service';

describe('UnitCardService', () => {
  let service: UnitCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
