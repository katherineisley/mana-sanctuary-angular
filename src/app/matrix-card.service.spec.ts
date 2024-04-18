import { TestBed } from '@angular/core/testing';

import { MatrixCardService } from './matrix-card.service';

describe('MatrixCardService', () => {
  let service: MatrixCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrixCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
