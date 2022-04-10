import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, map, Subscription } from 'rxjs';
import { PostsModel } from 'src/app/models/posts.model';
import { PostsRepository } from '../repositories/posts.repository';

@Component({
  selector: 'app-fetch-request',
  templateUrl: './fetch-request.component.html',
  styleUrls: ['./fetch-request.component.css'],
})
export class FetchRequestComponent implements OnInit, OnDestroy {
  loadedPosts: PostsModel[] = [];
  firebaseUrl =
    'https://ng-angular-lesson-default-rtdb.europe-west1.firebasedatabase.app/posts.json';
  fetchForm: FormGroup;
  isFetching = false;
  // 1й способ отлавливать ошибки это передавать их вторым параметром после subscribe
  error = null;
  errorSubscription: Subscription;

  constructor(public postsRepository: PostsRepository) {}

  ngOnInit(): void {
    this.fetchForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    });
    this.isFetching = true;
    this.postsRepository.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: (error) => {
        // 1й способ отлавливать ошибки это передавать их вторым параметром после subscribe
        this.isFetching = false;
        console.log('111111111111', error);
        this.error = error.message;
      },
    });
    // 2й способ отлавливать ошибки если мы не подписывались на результат,
    // тогда в сервисе создать Subject слушателя который будет срабатывать при возникновении ошибки в Сервисе
    this.errorSubscription = this.postsRepository.error.subscribe(
      (errorMessage) => (this.error = errorMessage)
    );
  }

  onCreatePost() {
    const title: string = this.fetchForm.value.title;
    const content: string = this.fetchForm.value.content;
    this.postsRepository.createPosts(title, content);
    this.onFetchPosts();
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsRepository.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: (error) => {
        this.isFetching = false;
        console.log('111111111111', error);
        this.error = error.message;
      },
    });
  }

  onClearPosts() {
    this.postsRepository.deletePosts().subscribe((res) => {
      console.log('res', res);

      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }
}
