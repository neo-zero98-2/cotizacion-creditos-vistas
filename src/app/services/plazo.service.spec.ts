import { TestBed } from '@angular/core/testing';

import { PlazoService } from './plazo.service';

describe('PlazoService', () => {
  let service: PlazoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlazoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
