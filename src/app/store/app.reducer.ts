import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import * as fromAuth from 'src/app/auth/store/auth.reducer';
import * as fromRecipes from 'src/app/recipes/store/recipe.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  sl: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  sl: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
};
