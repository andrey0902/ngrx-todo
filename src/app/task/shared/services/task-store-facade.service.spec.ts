import { TestBed, inject } from '@angular/core/testing';

import { TaskStoreFacadeService } from './task-store-facade.service';

describe('TaskStoreFacadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskStoreFacadeService]
    });
  });

  it('should be created', inject([TaskStoreFacadeService], (service: TaskStoreFacadeService) => {
    expect(service).toBeTruthy();
  }));
});
