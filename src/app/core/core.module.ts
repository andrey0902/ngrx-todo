import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { sessionReducer } from './state/session.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('session', sessionReducer),
  ],
  declarations: []
})
export class CoreModule { }
