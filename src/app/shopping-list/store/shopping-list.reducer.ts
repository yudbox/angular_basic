// npm install @ngrx/store --save

import { Action } from '@ngrx/store';
import { IngredientsModel } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';

export interface State {
  ingredients: IngredientsModel[];
  editedIngredietItem: IngredientsModel;
  editedIngredietItemIndex: number;
}

const initialState: State = {
  ingredients: [],
  editedIngredietItem: null,
  editedIngredietItemIndex: -1,
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
          if (index == state.editedIngredietItemIndex) {
            return action.payload;
          }
          return ingredient;
        }),
        editedIngredietItem: null,
        editedIngredietItemIndex: -1,
      };

    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient, index) => index != state.editedIngredietItemIndex
        ),
        editedIngredietItem: null,
        editedIngredietItemIndex: -1,
      };

    case ShoppingListActions.START_EDITING:
      return {
        ...state,
        editedIngredietItemIndex: action.payload,
        editedIngredietItem: { ...state.ingredients[action.payload] },
      };

    case ShoppingListActions.FINISH_EDITING:
      return {
        ...state,
        editedIngredietItemIndex: -1,
        editedIngredietItem: null,
      };

    default:
      return state;
  }
};
