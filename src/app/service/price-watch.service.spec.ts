import { TestBed } from '@angular/core/testing';

import { PriceWatchService } from './price-watch.service';

describe('PriceWatchService', () => {
  let service: PriceWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
