

import { Action } from '@ngrx/store';
import { RegistrationData } from '../shared/registration.data.model';
import ActionCodeSettings = firebase.auth.ActionCodeSettings;
import { RestorePassword } from '../shared/restore-password.model';

export enum AuthActionTypes {
  CreateUserAccount = '[Auth] Create User Account',
  CreateUserAccountError = '[Auth] Create User Account Error',
  CreateUserAccountSuccess = '[Auth] Create User Account Success',
  SendVerifyLink = '[Auth] Send Verify Link',
  SendVerifyLinkError = '[Auth] Send Verify Link Error',
  SendVerifyLinkSuccess = '[Auth] Send Verify Link Success',
  SignInEmail = '[Auth] SignIn Email',
  SignInEmailError = '[Auth] SignInEmail Error',
  SignInEmailSuccess = '[Auth] SignInEmail Success',
  SendRetrievePasswordLink = '[Auth] Send Retrieve Password Link',
  SendRetrievePasswordLinkError = '[Auth] Send Retrieve Password Link Error',
  SendRetrievePasswordLinkSuccess = '[Auth] Send Retrieve Password Link Success',
  RetrievePasswordDefault = '[Auth] Retrieve Password Set Default State',
  SendNewPassword = '[Auth] Send New Password',
  SendNewPasswordError = '[Auth] Send New Password Error',
  SendNewPasswordSuccess = '[Auth] Send New Password Success',

  SendApplyCode = '[Auth] Send Apply Code',
  SendApplyCodeSuccess = '[Auth] Send Apply Code Success',
  SendApplyCodeError = '[Auth] Send Apply Code Error',

  CreateDefaultUser = '[Auth] Create Default User',
  CreateDefaultUserSuccess  = '[Auth] Create Default User Success ',
  CreateDefaultUserError = '[Auth] Create Default User Error',


  ADD_Auth = '[Auth] Add Auth',
  UPSERT_Auth = '[Auth] Auth',
  UPDATE_Auth = '[Auth] Update Auth',
  DELETE_Auth= '[Auth] Delete Auth',
  CLEAR_Auth = '[Auth] Clear Auth',
}

export class CreateDefaultUser implements Action {
  readonly type = AuthActionTypes.CreateDefaultUser;
  constructor(public payload: any) {}
}

export class CreateDefaultUserSuccess implements Action {
  readonly type = AuthActionTypes.CreateDefaultUserSuccess;
  constructor(public payload: any) {}
}

export class CreateDefaultUserError implements Action {
  readonly type = AuthActionTypes.CreateDefaultUserError;
  constructor(public payload: {error: string}) {}
}

export class SendApplyCode implements Action {
  readonly type = AuthActionTypes.SendApplyCode;
  constructor(public payload: {code: string}) {}
}

export class SendApplyCodeSuccess implements Action {
  readonly type = AuthActionTypes.SendApplyCodeSuccess;
  constructor(public payload: any) {}
}

export class SendApplyCodeError implements Action {
  readonly type = AuthActionTypes.SendApplyCodeError;
  constructor(public payload: {error: string}) {}
}

export class SendNewPasswordSuccess implements Action {
  readonly type = AuthActionTypes.SendNewPasswordSuccess;
  constructor(public payload: any) {}
}

export class SendNewPasswordError implements Action {
  readonly type = AuthActionTypes.SendNewPasswordError;
  constructor(public payload: {error: string}) {}
}

export class SendNewPassword implements Action {
  readonly type = AuthActionTypes.SendNewPassword;
  constructor(public payload: {newPassword: RestorePassword}) {}
}

export class RetrievePasswordDefault implements Action {
  readonly type = AuthActionTypes.RetrievePasswordDefault;
}

export class SendRetrievePasswordLink implements Action {
  readonly type = AuthActionTypes.SendRetrievePasswordLink;
  constructor(public payload: {email: string}) {}
}

export class SendRetrievePasswordLinkError implements Action {
  readonly type = AuthActionTypes.SendRetrievePasswordLinkError;
  constructor(public payload: any) {}
}

export class SendRetrievePasswordLinkSuccess implements Action {
  readonly type = AuthActionTypes.SendRetrievePasswordLinkSuccess;
  constructor(public payload: any) {}
}

export class SignInEmailSuccess implements Action {
  readonly type = AuthActionTypes.SignInEmailSuccess;
  constructor(public payload: any) {}
}

export class SignInEmailError implements Action {
  readonly type = AuthActionTypes.SignInEmailError;
  constructor(public payload: any) {}
}

export class SignInEmail implements Action {
  readonly type = AuthActionTypes.SignInEmail;
  constructor(public payload: {data: RegistrationData}) {}
}

export class SendVerifyLink implements Action {
  readonly type = AuthActionTypes.SendVerifyLink;
}

export class SendVerifyLinkError implements Action {
  readonly type = AuthActionTypes.SendVerifyLinkError;
  constructor(public payload: any) {}
}

export class SendVerifyLinkSuccess implements Action {
  readonly type = AuthActionTypes.SendVerifyLinkSuccess;
  constructor(public payload: any) {}
}

export class CreateUserAccount implements Action {
  readonly type = AuthActionTypes.CreateUserAccount;

  constructor(public payload: { data: RegistrationData }) {}
}
export class CreateUserAccountSuccess implements Action {
  readonly type = AuthActionTypes.CreateUserAccountSuccess;

  constructor(public payload: any) {}
}
export class CreateUserAccountError implements Action {
  readonly type = AuthActionTypes.CreateUserAccountError;

  constructor(public payload: {error: string}) {}
}

export type AuthActionsUnion =
  CreateUserAccount
| CreateUserAccountSuccess
| CreateUserAccountError
| SignInEmail
| SignInEmailError
| SignInEmailSuccess
| SendVerifyLinkError
| SendVerifyLinkSuccess
| SendVerifyLink
| SendRetrievePasswordLink
| SendRetrievePasswordLinkError
| SendRetrievePasswordLinkSuccess
| RetrievePasswordDefault
| SendNewPassword
| SendNewPasswordError
| SendNewPasswordSuccess
| SendApplyCodeSuccess
| SendApplyCodeError
| CreateDefaultUserSuccess
| CreateDefaultUserError;
