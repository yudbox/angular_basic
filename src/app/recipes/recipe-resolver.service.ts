import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { RecipeModel } from 'src/app/recipes/recepies.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<RecipeModel[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
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
    const recipes = this.recipeService.getRecipes();
    if (!recipes.length) {
      // на fetchRecipes не нужно подписываться т.к. резолвер подписывается сам
      // и возвращает дату ответа
      return this.dataStorageService.fetchRecipes();
    }

    return recipes;
  }
}
