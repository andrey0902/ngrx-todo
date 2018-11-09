import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/index';
import { TaskStoreFacadeService } from './task-store-facade.service';
import { SessionService } from '../../../core/session.service';
import { filter, first, take } from 'rxjs/internal/operators';
import { User } from '../../../auth/shared/user';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ResolveTaskService implements Resolve<CategoryModel[]> {

  constructor(private taskFacadeService: TaskStoreFacadeService,
              private sessionService: SessionService) { }

  resolve(): Observable<CategoryModel[]> {
    this.sessionService.getUser$()
      .pipe(
        filter(user => !!user),
        first()
      ).subscribe((user: User) => {
      this.taskFacadeService.getUserCategory({uid: user.uid});
    });

     return this.taskFacadeService.selectCategories$().pipe((filter(v => !!v)), first());
  }
}
