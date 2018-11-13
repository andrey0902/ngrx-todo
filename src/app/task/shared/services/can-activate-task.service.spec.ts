import { TestBed, inject } from '@angular/core/testing';

import { CanActivateTaskService } from './can-activate-task.service';

describe('CanActivateTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateTaskService]
    });
  });

  it('should be created', inject([CanActivateTaskService], (service: CanActivateTaskService) => {
    expect(service).toBeTruthy();
  }));
});
