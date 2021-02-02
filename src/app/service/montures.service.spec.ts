import { TestBed } from '@angular/core/testing';

import { MonturesService } from './montures.service';

describe('MonturesService', () => {
  let service: MonturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
