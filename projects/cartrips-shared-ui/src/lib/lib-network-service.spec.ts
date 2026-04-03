import { TestBed } from '@angular/core/testing';

import { LibNetworkService } from './lib-network-service';

describe('LibNetworkService', () => {
  let service: LibNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
