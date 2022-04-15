import { Action } from '@ngrx/store';
import { IngredientsModel } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export class AddIngredient implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = ADD_INGREDIENT;

  constructor(public payload: IngredientsModel) {}
}

export class AddIngredients implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: IngredientsModel[]) {}
}

export class UpdateIngredient implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = UPDATE_INGREDIENT;

  constructor(
    public payload: { id: number; newIngredients: IngredientsModel }
  ) {}
}

export class DeleteIngredient implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = DELETE_INGREDIENT;

  constructor(public payload: number) {}
}

export type SLActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient;
