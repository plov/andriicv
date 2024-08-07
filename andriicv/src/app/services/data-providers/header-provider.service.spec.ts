import { TestBed } from '@angular/core/testing';

import { HeaderProviderService } from './header-provider.service';

describe('HeaderProviderService', () => {
  let service: HeaderProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
