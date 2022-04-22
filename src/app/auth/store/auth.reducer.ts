// npm install @ngrx/store --save

import * as AuthActions from 'src/app/auth/store/auth.actions';
import { UserModel } from 'src/app/models/user.model';

export interface State {
  user: UserModel;
  authError: string;
  isFetching: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  isFetching: false,
};

export const authReducer = (
  state: State = initialState,
  action: AuthActions.AuthActions
) => {
  switch (action.type) {
    case AuthActions.AUTHENTIFICATE_SUCCESS:
      const user = new UserModel(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.exparationDate
      );
      return {
        ...state,
        user,
        authError: null,
        isFetching: false,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        isFetching: true,
      };

    case AuthActions.AUTHENTIFICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};
