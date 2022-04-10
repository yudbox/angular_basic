import { Injectable } from '@angular/core';
import { PostsModel } from '../models';
import { BaseRepository } from 'src/app/repositories/base.repocitory';
import { FilteredPipe } from '../shared/pipes';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// providedIn: 'root' вместо добовления сервиса в FilteredPipe.module providers
@Injectable({ providedIn: 'root' })
export class PostsRepository {
  public createPost(title: string, content: string) {}
  private firebaseUrl =
    'https://ng-angular-lesson-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
  error = new Subject<string>();

  constructor(private httpService: HttpClient) {}

  createPosts(title: string, content: string) {
    const postData: PostsModel = { title, content };
    console.log('title, content', title, content);
    // методы post<> это generic куда можно поставить тип возвращаемого ответа
    this.httpService
      .post<{ name: string }>(this.firebaseUrl, postData)
      .subscribe({
        next: () => {},
        error: (error) => this.error.next(error.message),
      });
  }

  fetchPosts() {
    const paramsObject = {
      limit: 5,
      skip: 10,
      order: ['abs', 'number'],
    };

    // в занчение принимается в се кроме обекта. filter: {hello: '1} не пройдет
    const paramsObject2 = new HttpParams().appendAll({
      limit: 5,
      skip: 10,
      order: ['abs', 'number'],
      filter: ['0', '2', 5, true],
    });

    // методы get<> это generic куда можно поставить тип возвращаемого ответа
    return this.httpService
      .get<{ [key: string]: PostsModel }>(this.firebaseUrl, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Authorization: 'Bearer fwjhf3ctm9834ct938qt9c7nt9-34cmt9-3894cmt',
        }),
        params: paramsObject2,
        // params: new HttpParams().set('filter', 'hello'),
        // params: {
        //   filter: JSON.stringify(paramsObject),
        // },
      })
      .pipe(
        map((res) => {
          const postsArray: PostsModel[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              postsArray.push({ ...res[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          //3й способ используется если есть глобальный перехватчик
          return throwError(() => new Error(errorRes.message));
        })
      );
  }

  deletePosts() {
    return this.httpService.delete(this.firebaseUrl);
  }
}
