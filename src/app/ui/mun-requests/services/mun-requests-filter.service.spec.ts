import { TestBed } from '@angular/core/testing';

import { MunRequestsFilterService } from './mun-requests-filter.service';

describe('MunRequestsFilterService', () => {
  let service: MunRequestsFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunRequestsFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
