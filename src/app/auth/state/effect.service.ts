import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs/index';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/internal/operators';
import { AuthService } from '../shared/auth.service';
import {
  AuthActionsUnion, AuthActionTypes, CreateUserAccount, CreateUserAccountError, CreateUserAccountSuccess, SendApplyCode,
  SendApplyCodeError, SendApplyCodeSuccess, SendNewPassword, SendNewPasswordError, SendNewPasswordSuccess,
  SendRetrievePasswordLink, SendRetrievePasswordLinkError, SendRetrievePasswordLinkSuccess, SendVerifyLinkError,
  SendVerifyLinkSuccess, SignInEmail, SignInEmailError, SignInEmailSuccess
} from './auth.actions';
import { Router } from '@angular/router';
import { RegistrationData } from '../shared/registration.data.model';
import { AuthStoreFacadeService } from '../shared/services/auth-store-facade.service';

@Injectable({
  providedIn: 'root'
})
export class EffectService {

  @Effect() sendApplyCode$: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActionTypes.SendApplyCode),
      map((action: SendApplyCode) => action.payload.code),
      mergeMap(
        code => this.auth.applyCode(code)
          .pipe(

            map((result) => new SendApplyCodeSuccess(result)),
            catchError(error => of(new SendApplyCodeError({error: error.message})))
          )
      )
    );

  @Effect() createAccount$: Observable<Action> = this.actions$
    .pipe( ofType(AuthActionTypes.CreateUserAccount),
        map((action: CreateUserAccount) => action.payload.data),
        mergeMap(data => this.auth.emailSignUp(data)
          .pipe(
            map(
            result => {
                    this.authFacadeService.sendVerifyLink();
                    return new CreateUserAccountSuccess(result);
                   }
            ),
            catchError((error) => of(new CreateUserAccountError({error: error.message})))
          )
        )
      );

  @Effect() sendVerifyLink$: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActionTypes.SendVerifyLink),
      mergeMap(() => this.auth.sendVerify()
        .pipe(
          tap(() => this.router.navigateByUrl('/done')),
          map((result) => new SendVerifyLinkSuccess(result)),
          catchError(err => of(new SendVerifyLinkError(err)))
        )
      )
    );

  @Effect() signInEmail$: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActionTypes.SignInEmail),
      map((action: SignInEmail) => action.payload.data),
      mergeMap((data: RegistrationData) => this.auth.emailSignIn(data)
        .pipe(
          tap(() => this.router.navigateByUrl('/board')),
          map(result => new SignInEmailSuccess(result)),
          catchError( error => of(new SignInEmailError({error: error.message})))
        ))
    );

  @Effect() sendRetrievePasswordLink$: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActionTypes.SendRetrievePasswordLink),
      map((action: SendRetrievePasswordLink) => action.payload.email),
      mergeMap(
        email => this.auth.forgotPassword(email)
          .pipe(
            map(data => new SendRetrievePasswordLinkSuccess(data)),
            catchError(error => of(new SendRetrievePasswordLinkError({error: error.message})))
          )
      )
    );

  @Effect() sendNewPassword$: Observable<Action> = this.actions$
    .pipe(
      ofType(AuthActionTypes.SendNewPassword),
      map((action: SendNewPassword) => action.payload.newPassword),
      switchMap(
        data => this.auth.sendNewPassword(data)
          .pipe(
            tap(() => this.router.navigateByUrl('/sign-in')),
            map(result => new SendNewPasswordSuccess(result)),
            catchError(error => of(new SendNewPasswordError({error: error.message})))
          )
      )
    );

  // @Effect()
  // createProduct$: Observable<Action> = this.actions$.pipe(
  //   ofType(productAction.ProductActionTypes.CreateProduct),
  //   map((action: productAction.CreateProduct) => action.payload),
  //   mergeMap((product: Product) => {
  //     return this.productService.createProduct(product)
  //       .pipe(
  //         map((response: Product) => new productAction.CreateProductSuccess(response)),
  //         catchError(err => of(new productAction.CreateProductFail(err)))
  //       );
  //   })
  // );

  constructor(private actions$: Actions,
              private auth: AuthService,
              private router: Router,
              private authFacadeService: AuthStoreFacadeService) {
  }
}
