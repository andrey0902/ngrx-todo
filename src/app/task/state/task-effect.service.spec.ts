import { TestBed, inject } from '@angular/core/testing';

import { TaskEffectService } from './task-effect.service';

describe('TaskEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskEffectService]
    });
  });

  it('should be created', inject([TaskEffectService], (service: TaskEffectService) => {
    expect(service).toBeTruthy();
  }));
});
