// npm install @ngrx/store --save

import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
import { RecipeModel } from 'src/app/recipes/recepies.model';

export interface State {
  recipes: RecipeModel[];
}

const initialState: State = {
  recipes: [],
};

export const recipeReducer = (
  state: State = initialState,
  action: RecipesActions.RecipesActions
) => {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };

    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case RecipesActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) => {
          if (recipe.id === action.payload.id) {
            return { ...recipe, ...action.payload.newRecipe };
          }
          return recipe;
        }),
      };

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };

    default:
      return state;
  }
};
