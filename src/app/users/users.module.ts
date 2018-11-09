import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/users.reducer';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users', reducer),
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  declarations: [UsersComponent, UserComponent],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
