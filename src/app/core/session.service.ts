import { Injectable } from '@angular/core';
import { State } from '../state/state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/index';
import { User } from '../auth/shared/user';
import { selectGetUser } from './state/index';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private store: Store<State>) { }

 public getUser$(): Observable<User> {
   return this.store.pipe(
      select(selectGetUser)
    );
  }
}
