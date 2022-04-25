import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { AppState } from 'src/app/store/app.reducer';

/*
 *    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
 *!!!!!!!!!!!!!!!!!!!!!! интерсептор нужно регистрировать в app.module providers
 * !!!! ВАЖНО  очередность запуска в app.module очень важна, кто подключается первым
 * оба отправляют next.handle(midifiedRequest), но первый interceptor отправляется последним
 * и перезаписывает все предыдущие midifiedRequest которые шли до него
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('11111 intercept url', req.url);

    // const midifiedRequest = req.clone({
    //   headers: req.headers.append('Auth', 'bearer 123456'),
    // });
    // может трансформировать ajax запрос на сервер и также добавлять дополнительные заголовки в headers
    // return next.handle(midifiedRequest);

    // return this.authService.currentUser.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const midifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(midifiedRequest);
      })
    );
  }
}
