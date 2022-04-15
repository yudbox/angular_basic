// npm install @ngrx/store --save

import { Action } from '@ngrx/store';
import { IngredientsModel } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';

export interface AppState {
  sl: State;
}

export interface State {
  ingredients: IngredientsModel[];
}

const initialState: State = {
  ingredients: [],
};

export const shoppingListReducer = (
  state: State = initialState,
  action: ShoppingListActions.SLActions
) => {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.map((ingredient, index) => {
          if (index == action.payload.id) {
            return action.payload.newIngredients;
          }
          return ingredient;
        }),
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index != action.payload
        ),
      };

    default:
      return state;
  }
};
