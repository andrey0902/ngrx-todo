import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { DeleteUser, LoadUsers, UpdateUser } from '../state/user.actions';
import { State } from '../../state/state';
import { selectAllUsers } from '../state/index';
import { User } from '../state/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: User[];
  constructor(private store: Store<State>) { }

  ngOnInit() {
    const users: any = [
      {
        id: 1,
        name: 'Dime'
      },
      {
        id: 2,
        name: 'David'
      }
    ];
    this.store.dispatch(new LoadUsers({
      users: users
      }
    ));
    this.getUsers();
  }

  getUsers() {
    this.store.pipe(
      select(selectAllUsers)
    )
      .subscribe((value) => {
        console.log('users', value);
        this.users = value;
      });
  }

  updateUser(user: User) {
    console.log({user});
    this.store.dispatch(new UpdateUser({user: {id: user.id, changes: user}}));
  }

  deleteUser(id) {
    this.store.dispatch(new DeleteUser({id}));
  }

}
