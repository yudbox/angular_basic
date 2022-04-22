import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loadedFeature = 'recipe';
  onserverSubscription: Subscription;
  onNavigate(anyNameHere: string) {
    this.loadedFeature = anyNameHere;
  }
  constructor() {}

  ngOnInit(): void {
    const customIntervalObserver = new Observable(
      (observer: Observer<number>) => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 2) {
            // завершает работу observer
            observer.complete();
          }
          if (count > 3) {
            // искуственно имитируем ошибку и отлавливаем ее ниже
            observer.error(new Error('Count is greater than 3'));
          }
          count++;
        }, 1000);
      }
    );

    // pipe это инструмент который позволяет создать поток между data внутри Observable и результатом для observer
    // в нем используются операторы map, filter которые позволяют преобразовывать и фильтровать данные
    // которые находятся в Observable
    this.onserverSubscription = customIntervalObserver
      .pipe(
        filter((data: number) => {
          // не пропускает дату меньше 0 фильтрует данные
          return data > 0;
        }),
        map((data: number) => {
          // преобразует данные в строку с текстом
          return `Transformed data = ${data + 2}`;
        })
      )
      .subscribe({
        // функция которая вызывается при методе next
        next: (data) => {
          console.log('data', data);
        },
        // функция при ошибке. ошибка останавливает выполнение observer
        error: (error) => console.log('error', error),
        // функция при завершении.третий параметр запускается когда срабатывает метод complete()
        complete: () => console.log('Complete observer'),
      });
  }

  ngOnDestroy(): void {
    this.onserverSubscription.unsubscribe();
  }
}
