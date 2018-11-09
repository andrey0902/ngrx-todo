import { TestBed, inject } from '@angular/core/testing';

import { ResolveTaskService } from './resolve-task.service';

describe('ResolveTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveTaskService]
    });
  });

  it('should be created', inject([ResolveTaskService], (service: ResolveTaskService) => {
    expect(service).toBeTruthy();
  }));
});
