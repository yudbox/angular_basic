import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModel } from '../models';
import { AppInjector } from '../app-injector.service';

@Injectable({ providedIn: 'root' })
export class BaseRepository<T extends BaseModel> {
  protected httpService: HttpClient;

  constructor(public entityClass: typeof BaseModel & { prototype: T }) {
    this.httpService = AppInjector.getInjector().get(HttpClient);
  }
}
