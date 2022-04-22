import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import { RecipeModel } from 'src/app/recipes/recepies.model';
import { AppState } from 'src/app/store/app.reducer';
import { Injectable } from '@angular/core';

/*
ВСЕ ЭФФЕКТЫ ДОЛЖНЫ БЫТЬ ЗАРЕГИСТРИРОВАННЫ В app/module.ts!!!!!!!!!!!!!!!!
*/
@Injectable()
export class RecipesEffects {
  recipeUrl =
    'https://ng-angular-lesson-default-rtdb.europe-west1.firebasedatabase.app/recipe.json';

  constructor(
    private actions$: Actions,
    private httpService: HttpClient,
    private store: Store<AppState>
  ) {}

  fetchRecipes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
          return this.httpService.get<RecipeModel[]>(this.recipeUrl);
        }),
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
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
    },
    { dispatch: false }
  );

  storeRecipes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        /**
         * withLatestFrom обединять два стрима (observable) в один
         * у нас есть один observable от this.actions$
         * и второй observable this.store.select('recipes') который получает данные из state
         * в следующий оператор switchMap попадут данные из двух стримов
         * [actionData, recipesState] возвращает в массиве путем дисрукторизации
         */
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.httpService.put<RecipeModel[]>(
            this.recipeUrl,
            recipesState.recipes
          );
        })
      );
    },
    { dispatch: false }
  );
}
