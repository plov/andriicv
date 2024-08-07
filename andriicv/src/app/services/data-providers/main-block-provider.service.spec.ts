import { TestBed } from '@angular/core/testing';

import { from } from 'rxjs';
import { MainBlockProviderService } from './main-block-provider.service';

describe('DataProviderService', () => {
  let service: MainBlockProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainBlockProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
