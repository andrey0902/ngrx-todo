import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { SessionService } from '../../core/session.service';
import { map } from 'rxjs/operators';
import { User } from './user';
import { CanActivate, Router } from '@angular/router';
import { filter, first } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('activate sign up');
    return this.sessionService.getUser$()
      .pipe(
        map((user: User) => {
          console.log('activate', user);
          if (user && user.emailVerified) {
            this.router.navigateByUrl('/board');
            return !user.emailVerified;
          }
          return true;
        })
      );
  }
}
