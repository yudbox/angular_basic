import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';

import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { RecipeModel } from 'src/app/recipes/recepies.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<RecipeModel[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<AppState>,
    private actions$: Actions
  ) {}
  /* это мидлвар который загружается до того как компонента будет загружена
   * в данном случае мы проверяем будут ли данные для компоненты деталей в
   * севисе recipeService если данных нет, тогда делаем http запрос через fetchRecipes
   * и список рецептов появляется и ошибки после перезагрузки страницы не будет
   *а если рецепты уже были загружены до этого и это просто переход по роутам а не перезагрузка
   * после которой данные теряются тогда просто возвращаем полученый список
   * рецептов
   */

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): RecipeModel[] | Observable<RecipeModel[]> | Promise<RecipeModel[]> {
    // const recipes = this.recipeService.getRecipes();

    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => recipesState.recipes),
      switchMap((recipes) => {
        if (!recipes.length) {
          // на fetchRecipes не нужно подписываться т.к. резолвер подписывается сам
          // и возвращает дату ответа
          this.store.dispatch(new RecipesActions.FetchRecipes());
          // здесь мы имитипуем эффект чтоб resolver что-то возвращал и take запускается один раз
          // главное что выше диспатчится эффект который наполняет state данными которые нужны для
          // загрузки компонента и до его монтирования resolver возвращает данные
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );
  }
}
