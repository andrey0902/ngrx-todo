import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Store, StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HeaderModule } from './header/header.module';
import { TaskModule } from './task/task.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CoreModule } from './core/core.module';
import { StorageService } from './core/storage.service';
import { SaveUser } from './core/state/session.action';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import { TaskEffectService } from './task/state/task-effect.service';
import { NgDragDropModule } from 'ng-drag-drop';

function initApp(store) {
  return () => {
    const user = StorageService.getUser();
    if (user) {
      store.dispatch(new SaveUser(user));
    }
  };

}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      // {
      //   path: '',
      //   redirectTo: '',
      //   pathMatch: 'full'
      // },
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App',
      maxAge: 25,
      logOnly: environment.production
    }),
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    EffectsModule.forRoot([TaskEffectService]),
    HeaderModule,
    TaskModule,
    HttpClientModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
    Store,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
