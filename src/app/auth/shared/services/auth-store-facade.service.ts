import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../state/state';
import { User } from '../user';
import { ClearUser, SaveUser } from '../../../core/state/session.action';
import { StorageService } from '../../../core/storage.service';
import { RegistrationData } from '../registration.data.model';
import {
  CreateDefaultUser, CreateUserAccount, RetrievePasswordDefault, SendApplyCode, SendNewPassword,
  SendRetrievePasswordLink, SendVerifyLink, SignInEmail
} from '../../state/auth.actions';
import { RestorePassword } from '../restore-password.model';
import {
  selectGetErrorRestorePassword, selectGetErrorSendNewPassword, selectGetErrorSignIn, selectGetErrorSignUp,
  selectGetSendSuccess
} from '../../state/index';
import { Observable } from 'rxjs/index';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthStoreFacadeService {

  constructor(private store: Store<State>,
              private router: Router) { }

  /**
   * Dispatch action for save user
   * and save in the localStorage
   * */
  public saveUser(user: User) {
    this.store.dispatch(new SaveUser({user: user}));
    // save local Storage
    StorageService.setUser({user: user});
  }

  /**
   * Dispatch action for clear user
   * and clean in the localStorage
   * */
  public clearUser() {
    this.store.dispatch(new ClearUser({user: null}));
    // clean user in the localStorage
    StorageService.setUser(null);
    this.router.navigateByUrl('/sign-in');
  }

  /**
   * Dispatch action Create User Account
   * */
  public signUpEmail(data: RegistrationData) {
    this.store.dispatch(new CreateUserAccount({data}));
  }

  /**
   * Dispatch action send verify link
   * */
  public sendVerifyLink() {
    this.store.dispatch(new SendVerifyLink());
  }

  /**
   * Dispatch action login with email and password
   * */
  public signInEmail(data: RegistrationData) {
    this.store.dispatch(new SignInEmail({data}));
  }

  /**
   * Dispatch action send retrieve link to email
   * */
  public sendRestoreLink(email: {email: string}) {
    this.store.dispatch(new SendRetrievePasswordLink(email));
  }

  /**
   * Dispatch action send retrieve link to email
   * */
  public defaultRestoreState() {
    this.store.dispatch(new RetrievePasswordDefault());
  }

  /**
   * Dispatch action send new Password
   * */
  public dispatchSendNewPassword(data: RestorePassword): void {
    this.store.dispatch(new SendNewPassword({newPassword: data}));
  }

  /**
   * Dispatch action apply code activation
   * */

  public dispatchApplyCode(code: string) {
    this.store.dispatch(new SendApplyCode({code}));
  }

  /**
   * Dispatch create default user
   * */

  public dispatchCreateDefaultUser(data) {
    this.store.dispatch(new CreateDefaultUser(data));
  }

  /**
   * get Send Success Link
   * */
  getSendSuccessLink$(): Observable<boolean> {
    return this.store.pipe(
      select(
        selectGetSendSuccess
      )
    );
  }

  /**
   * get server errors signUp
   * */

  getSignUpErrors$(): Observable<string> {
    return this.store.pipe(
      select(selectGetErrorSignUp)
    );
  }

  /**
   * get server errors signIn
   * */

  getSignInErrors$(): Observable<string> {
    return this.store.pipe(
      select(selectGetErrorSignIn)
    );
  }

  /**
   * get server errors Restore Password
   * */

  getRestorePasswordErrors$(): Observable<string> {
    return this.store.pipe(
      select(selectGetErrorRestorePassword)
    );
  }

  /**
   * get server errors Restore Password
   * */

  getSendNewPasswordErrors$(): Observable<string> {
    return this.store.pipe(
      select(selectGetErrorSendNewPassword)
    );
  }
}
