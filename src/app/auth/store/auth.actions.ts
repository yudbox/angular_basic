import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] LOGIN_START';
export const AUTHENTIFICATE_SUCCESS = '[Auth] AUTHENTIFICATE_SUCCESS';
export const LOGOUT = '[Auth] LOGOUT';
export const AUTHENTIFICATE_FAIL = '[Auth] AUTHENTIFICATE_FAIL';
export const SIGNUP_START = '[Auth] SIGNUP_START';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';

export class AuthentificateSuccess implements Action {
  readonly type = AUTHENTIFICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      exparationDate: Date;
      redirect: boolean;
    }
  ) {}
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthentificateFail implements Action {
  readonly type = AUTHENTIFICATE_FAIL;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthentificateSuccess
  | Logout
  | LoginStart
  | AuthentificateFail
  | SignupStart
  | AutoLogin;
