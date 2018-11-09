import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user';
import { Observable, of } from 'rxjs/index';
import { auth } from 'firebase/app';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { State } from '../../state/state';
import { RegistrationData } from './registration.data.model';
import { fromPromise } from 'rxjs/internal/observable/fromPromise';
import { CanActivate, Router } from '@angular/router';
import { selectGetUser } from '../../core/state/index';
import { AbstractControl } from '@angular/forms';
import { RegExpService } from '../../core/shared/Regexp';
import { RestorePassword } from './restore-password.model';
import { AuthStoreFacadeService } from './services/auth-store-facade.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private store: Store<State>,
              private router: Router,
              private _ngZone: NgZone,
              private authFacadeService: AuthStoreFacadeService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectGetUser),
      map((user: User) => {
        if (user.emailVerified) {
          this.router.navigateByUrl('/board');
          return false;
        }
        return !user.emailVerified;
      })
    );
  }

  getUserStatus$(): Observable<User> {
    return this.afAuth.authState.
      pipe(
        map(user => {

          if (user) {
            return {
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: user.photoURL,
              displayName: user.displayName,
            };
          }
          return null;
        })
    );
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        if (res.user.uid) {
          this._ngZone.run(() => {
            this.router.navigateByUrl('/board');
          });
        }
      console.log('login', res);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authFacadeService.clearUser();
  }

  // Update properties on the user document
  // updateUser(user: User, data: any) {
  //   return this.afs.doc(`users/${user.uid}`).update(data);
  // }

  emailSignUp(data: RegistrationData) {
    return fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
    );
  }

  emailSignIn(data: RegistrationData): Observable<any> {
    return fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
    );
  }

  public sendVerify() {
    const codeSettings = {
      url: 'http://localhost:4200/sign-in'
    };
    const user = this.afAuth.auth.currentUser;
     return fromPromise(user.sendEmailVerification(codeSettings));
  }

  /**
   * send code verify for activate account user
   * */
  public applyCode(code: string) {
    return fromPromise(this.afAuth.auth.applyActionCode(code));
  }

  /**
   * send Link on the current email for change password
   * */
  public forgotPassword(email: string) {
    return fromPromise(
        this.afAuth.auth.sendPasswordResetEmail(email)
      );
  }

  /**
   * send new password and code verify
   * */
  public sendNewPassword(data: RestorePassword) {
    return fromPromise(this.afAuth.auth.confirmPasswordReset(data.code, data.newPassword));
      // .then(success => {
      //   console.log('new pass apply', success);
      // }).catch(error => {
      //   console.warn('error verify', error);
      // });


     // user.changePassword(newPassword)
    //   .then(data => {
    //     console.log('success change data', data);
    //   })
    //   .catch(err => {
    //     console.log('err change password', err);
    //   });
  }

  public passwordMatch(control: AbstractControl) {
    const password = control.get('password').value;
    const confirm = control.get('confirmPassword').value;
    if (confirm && password) {
      if (password !== confirm) {
        control.get('confirmPassword').setErrors({passwordMatch: true});
      } else {
        return null;
      }
    }
  }

  public checkEmail(control: AbstractControl): {[key: string]: any} {
    if (control.value !== null) {
      if (control.value.length > 0) {
        return !RegExpService.email.test(control.value) ? {patternEmail: true} : null;
      }
    }
  }
}
