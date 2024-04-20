import { TestBed } from '@angular/core/testing';

import { RelicCardService } from './relic-card.service';

describe('RelicCardService', () => {
  let service: RelicCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelicCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
