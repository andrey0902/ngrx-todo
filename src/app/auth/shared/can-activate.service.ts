import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { SessionService } from '../../core/session.service';
import { map } from 'rxjs/operators';
import { User } from './user';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService.getUser$()
      .pipe(
        map((user: User) => {
          if (user.emailVerified) {
            this.router.navigateByUrl('/board');
            return !user.emailVerified;
          }
          return !user.emailVerified;
        })
      );
  }
}
