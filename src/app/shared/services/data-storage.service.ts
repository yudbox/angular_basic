import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { RecipeModel } from 'src/app/recipes/recepies.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppState } from 'src/app/store/app.reducer';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  recipeUrl =
    'https://ng-angular-lesson-default-rtdb.europe-west1.firebasedatabase.app/recipe.json';
  constructor(
    private httpService: HttpClient,
    private resipeService: RecipeService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  storeRecipes() {
    const recipes: RecipeModel[] = this.resipeService.getRecipes();

    this.httpService
      .put<RecipeModel[]>(this.recipeUrl, recipes)
      .subscribe((res) => {
        console.log('111111111 res', res);
      });
  }

  fetchRecipes() {
    return this.httpService.get<RecipeModel[]>(this.recipeUrl).pipe(
      map((recipes) => {
        // если рецепт был сохранен в БД без свойства ingredients,  то после возврашения
        // response таким образом можно проверить если ingredients есть то мы их вернем
        // а если нет и свойство вобще отсутствует то добавляем его как []
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        // tap оператор позволяет делать любой дополнительный код не меняя даты ответа
        this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        // this.resipeService.setRecipes(recipes);
        // console.log('1111 recipes', recipes);
      })
    );
  }
}
