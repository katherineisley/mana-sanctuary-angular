import { TestBed } from '@angular/core/testing';

import { AboutUsCardService } from './about-us-card.service';

describe('AboutUsCardService', () => {
  let service: AboutUsCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutUsCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
