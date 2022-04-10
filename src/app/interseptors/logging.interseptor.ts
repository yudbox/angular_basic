import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

/*
 *
 *если один из  interceptor используется для глобального перехвата ошибой
 * очень важна очередность, чтоб один не перезаписывал req headers другого
 */

export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          // также можно вызывать какие-то действия после получения ответа с сервера
          // tap, map, etc.

          if (event.type === HttpEventType.Response) {
            // event это параметры ответа такие как type, text, status и т.д.
            // HttpEventType это enum в котором зашифрованы коды type
            console.log('Response arived, data', event.body);
            //   здесь можно вызвать snackbar что запрос прошел успешно
          }
        },
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            switch (err.status) {
              case 401: {
                // show snackbar with erorr message
              }
            }
          }
        },
      })
    );
  }
}
