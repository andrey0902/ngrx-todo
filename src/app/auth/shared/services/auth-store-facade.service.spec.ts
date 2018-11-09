import { TestBed, inject } from '@angular/core/testing';

import { AuthStoreFacadeService } from './auth-store-facade.service';

describe('AuthStoreFacadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStoreFacadeService]
    });
  });

  it('should be created', inject([AuthStoreFacadeService], (service: AuthStoreFacadeService) => {
    expect(service).toBeTruthy();
  }));
});
