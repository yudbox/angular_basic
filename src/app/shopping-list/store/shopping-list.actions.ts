import { Action } from '@ngrx/store';
import { IngredientsModel } from 'src/app/shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping list] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[Shopping list] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[Shopping list] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping list] DELETE_INGREDIENT';
export const START_EDITING = '[Shopping list] START_EDITING';
export const FINISH_EDITING = '[Shopping list] FINISH_EDITING';

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

  constructor(public payload: IngredientsModel) {}
}

export class DeleteIngredient implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = DELETE_INGREDIENT;
}
export class StartEditing implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = START_EDITING;

  constructor(public payload: number) {}
}
export class FinishEditing implements Action {
  // readonly означает что данное свойство не может быть изменено снаружи
  readonly type = FINISH_EDITING;
}

export type SLActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEditing
  | FinishEditing;
