import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

import { map } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';
import { User } from '../../../auth/shared/user';
import { filter } from 'rxjs/operators';
import { SessionService } from '../../../core/session.service';
import { first } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class CanActivateTask implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('activate');
    return this.sessionService.getUser$()
      .pipe(
        map((user: User) => {
          console.log('activate', user);
          if (user && user.emailVerified) {
            return user.emailVerified;
          }
          this.router.navigateByUrl('/sign-in');
          return false;
        })
      );
  }
}
