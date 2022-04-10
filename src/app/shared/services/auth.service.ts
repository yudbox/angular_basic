import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { AuthResponseModel } from 'src/app/models/auth-response.model';
import { UserModel } from 'src/app/models/user.model';

interface UserInterface {
  email: string;
  id: string;
  _token: string;
  _tokenExparationDate: string;
}

@Injectable()
export class AuthService {
  loggedIn = false;
  // получено из настроек firebase проекта
  firebaseAPIKey = 'AIzaSyDyBuhTXp2eB0wW0MFaeTUDSjRqS8PtSS0';
  // взят из API firebase service
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.firebaseAPIKey}`;
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseAPIKey}`;

  // BehaviorSubject это евент емитер который не только отдает данные подписчикам но и принимает начальное значение
  // перед инициализацией а также сохраняет значение переданного в последнем next(). У него что-то вроде локального state
  // в котором хранится значения и оно может быть отдано любому новому подписчику который подписался после next()
  // в обычном Subject все значения next() до подписки теряются

  currentUser = new BehaviorSubject<UserModel>(null);
  private tokenExparationTimer: any;
  constructor(private router: Router, private httpService: HttpClient) {}

  isAuthentificated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 1000);
    });
    return promise;
  }

  signup(email: string, password: string) {
    return this.httpService
      .post<AuthResponseModel>(
        this.signupUrl,
        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          // tap это оператор который вслинивается перед subscribe но не меняет возвращаемую дату
          // но позволяет производить манипуляции с ней
          this.authificationHandler(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    // -----> this, old code nessasery for old logic
    this.loggedIn = true;
    // -----> this, old code nessasery for old logic

    return this.httpService
      .post<AuthResponseModel>(this.signInUrl, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          // tap это оператор который вслинивается перед subscribe но не меняет возвращаемую дату
          // но позволяет производить манипуляции с ней
          this.authificationHandler(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    /* изымаем данные из локального хранилища
     * если данные есть значит пользователь уже логинился
     * усли нет значит autoLogin не сработает при загрузке app.component
     */
    const user: UserInterface = JSON.parse(localStorage.getItem('userData'));

    if (!user) {
      return;
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
      this.currentUser.next(loadedUser);

      // время на сессию вычисляется из разницы _tokenExparationDate полученного при первой логинизации и
      // текущего времени и запускается autoLogout который сам вылогинит пользователя из расчитанного времени
      const exparationDuration =
        new Date(user._tokenExparationDate).getTime() - new Date().getTime();
      this.autoLogout(exparationDuration);
    }
  }

  logout() {
    // удаляем все данные о текущем юзере из сервиса
    this.currentUser.next(null);
    this.loggedIn = false;
    this.router.navigate(['/auth']);
    // очищаем локальное хранилище чтоб не было autologin
    localStorage.removeItem('userData');
    // очищаем setTimeout для автовыдогинивания чтоб избежать утечек памяти
    if (this.tokenExparationTimer) {
      clearTimeout(this.tokenExparationTimer);
    }
    // очищаем id таймаута для сброса setTimeout
    this.tokenExparationTimer = null;
  }

  autoLogout(exparationData: number) {
    // эта функция используется для самостоятельного вылогинивания через время истечения токена
    // вызывается во время login or autologin
    this.tokenExparationTimer = setTimeout(() => {
      this.logout();
    }, exparationData);
  }

  private authificationHandler(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    // tap это оператор который вслинивается перед subscribe но не меняет возвращаемую дату
    // но позволяет производить манипуляции с ней
    // exparationDate генерируется самостоятояльно и она будет равна текущему timestamp +  expiresIn(3600с) * 1000
    // чтоб перевести в мс и прибавить к timestamp
    const exparationDate = new Date(
      new Date().getTime() + Number(expiresIn) * 1000
    );
    const user = new UserModel(email, localId, idToken, exparationDate);
    // currentUser это евент эмитр или Subject на который можно подписаться и всегда получать актуального залогиненого юзера
    this.currentUser.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(Number(expiresIn) * 1000);
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
    return throwError(() => new Error(errorMessage));
  }
}
