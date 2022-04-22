import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import { AuthResponseModel } from 'src/app/models/auth-response.model';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserInterface } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

// https://www.npmjs.com/package/@ngrx/effects
// https://github.com/ngrx/platform

/*
ВСЕ ЭФФЕКТЫ ДОЛЖНЫ БЫТЬ ЗАРЕГИСТРИРОВАННЫ В app/module.ts!!!!!!!!!!!!!!!!
*/
@Injectable()
export class AuthEffects {
  firebaseAPIKey = environment.firebaseAPIKey;
  // взят из API firebase service
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseAPIKey}`;
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseAPIKey}`;

  constructor(
    private actions$: Actions,
    private httpService: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  // если эффект не возвращает Observable необходимо прописывать {dispatch: false}
  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      // AuthActions.SignupStart это типизация чтоб знать что будет в конструкторе класса то и будет в signupData
      switchMap((signupData: AuthActions.SignupStart) => {
        return this.httpService
          .post<AuthResponseModel>(
            this.signupUrl,
            {
              email: signupData.payload.email,
              password: signupData.payload.password,
              returnSecureToken: true,
            },
            {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            }
          )
          .pipe(
            tap((responseData) => {
              this.authService.autoLogout(+responseData.expiresIn * 1000);
            }),
            // оператор map преобразует данные и возвращает observable
            map(this.handleAuthentification),
            // оператор catchError отлавливает ошибки при запросе но observable не ВОЗВРАЩАЕТ
            // для этого используется оператор of() который создает observable
            catchError(this.errorHandler)
          );
      })
    );
  });

  // если эффект не возвращает Observable необходимо прописывать {dispatch: false}
  authLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        //  AuthActions.LoginStart это типизация чтоб знать что будет в конструкторе класса то и будет в authData
        switchMap((authData: AuthActions.LoginStart) => {
          return this.httpService
            .post<AuthResponseModel>(this.signInUrl, {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            })
            .pipe(
              tap((responseData) => {
                this.authService.autoLogout(+responseData.expiresIn * 1000);
              }),
              // оператор map преобразует данные и возвращает observable
              map(this.handleAuthentification),
              // оператор catchError отлавливает ошибки при запросе но observable не ВОЗВРАЩАЕТ
              // для этого используется оператор of() который создает observable
              catchError(this.errorHandler)
            );
        })
      );
    }
    // { dispatch: false }
  );

  // если эффект не возвращает Observable необходимо прописывать {dispatch: false}
  authSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AUTHENTIFICATE_SUCCESS),
        //  AuthActions.AuthentificateSuccess это типизация чтоб знать что будет в конструкторе класса то и будет в authSuccessAction
        tap((authSuccessAction: AuthActions.AuthentificateSuccess) => {
          if (authSuccessAction.payload.redirect) {
            this.router.navigate(['/recipes']);
          }
        })
      );
    },
    { dispatch: false }
  );

  // если эффект не возвращает Observable необходимо прописывать {dispatch: false}
  authLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        // типизации нет потому что класс AuthActions.Logout не имеет конструктора и ничего не возвращает
        // поэтому  tap(()  пустой
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      );
    },
    { dispatch: false }
  );

  authAutoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      // типизации нет потому что класс AuthActions.AutoLogin не имеет конструктора и ничего не возвращает
      // поэтому map(()  пустой
      map(() => {
        /* изымаем данные из локального хранилища
         * если данные есть значит пользователь уже логинился
         * усли нет значит autoLogin не сработает при загрузке app.component
         */
        const user: UserInterface = JSON.parse(
          localStorage.getItem('userData')
        );

        // возвращаем фейковый экшн чтоб эффект возвращал какой-то type и не выскакивала ошибка
        if (!user) {
          return { type: 'DUMMY' };
        }
        // создаем класс залогиненого ранее юзера
        const loadedUser = new UserModel(
          user.email,
          user.id,
          user._token,
          new Date(user._tokenExparationDate)
        );
        // в модели есть проверка token, если token expired вернется null
        // залогинивания не произойдет
        if (loadedUser.token) {
          // время на сессию вычисляется из разницы _tokenExparationDate полученного при первой логинизации и
          // текущего времени и запускается autoLogout который сам вылогинит пользователя из расчитанного времени
          const exparationDuration =
            new Date(user._tokenExparationDate).getTime() -
            new Date().getTime();

          this.authService.autoLogout(exparationDuration);

          return new AuthActions.AuthentificateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            exparationDate: new Date(user._tokenExparationDate),
            redirect: false,
          });

          // this.currentUser.next(loadedUser);
        }
        // возвращаем фейковый экшн чтоб эффект возвращал какой-то type и не выскакивала ошибка
        return { type: 'DUMMY' };
      })
    );
  });
  private handleAuthentification(responseData: AuthResponseModel) {
    const exparationDate = new Date(
      new Date().getTime() + Number(responseData.expiresIn) * 1000
    );
    const user = new UserModel(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      exparationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthentificateSuccess({
      email: responseData.email,
      userId: responseData.localId,
      token: responseData.idToken,
      exparationDate,
      redirect: true,
    });
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = '';

    switch (errorRes?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'You entered invalid password';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User does not exist';
        break;
      default:
        errorMessage = ' An unknown error occured!';
    }
    return of(new AuthActions.AuthentificateFail(errorMessage));
  }
}
