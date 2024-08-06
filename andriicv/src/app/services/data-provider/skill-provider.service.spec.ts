import { TestBed } from '@angular/core/testing';

import { SkillProviderServiceService } from './skill-provider.service';

describe('SkillProviderServiceService', () => {
  let service: SkillProviderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillProviderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
