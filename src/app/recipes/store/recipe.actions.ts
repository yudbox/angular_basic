import { Action } from '@ngrx/store';
import { RecipeModel } from 'src/app/recipes/recepies.model';

export const SET_RECIPES = '[Recipes] SET_RECIPES';
export const FETCH_RECIPES = '[Recipes] FETCH_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';
export const STORE_RECIPES = '[Recipes] STORE_RECIPES';

export class SetRecipes implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = SET_RECIPES;

  constructor(public payload: RecipeModel[]) {}
}

export class FetchRecipes implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = ADD_RECIPE;

  constructor(public payload: RecipeModel) {}
}

export class UpdateRecipe implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { id: string; newRecipe: RecipeModel }) {}
}

export class DeleteRecipe implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = DELETE_RECIPE;

  constructor(public payload: string) {}
}

export class StoreRecipes implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = STORE_RECIPES;
}

export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
