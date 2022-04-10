import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RecipeModel } from 'src/app/recipes/recepies.model';
import { IngredientsModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<RecipeModel[]>();

  private recipes: RecipeModel[] = [];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    //для того чтоб возвращать не ссылку на наш основной массив а на его копию
    // и чтоб не использовать JSON.parse(JSON.stringify()) для этого используем slice()
    return this.recipes.slice();
  }

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
    this.recipeSelected.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: IngredientsModel[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipeById(id: string) {
    return this.recipes.find((elem: RecipeModel) => elem.id === id);
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipeSelected.next(this.recipes.slice());
  }

  updateRecipe(id: string, newRecipe: RecipeModel) {
    const recipeUpdatingIndex = this.recipes.findIndex((el) => el.id === id);
    this.recipes[recipeUpdatingIndex] = {
      ...this.recipes[recipeUpdatingIndex],
      ...newRecipe,
    };

    this.recipeSelected.next(this.recipes.slice());
  }

  deleteRecipe(id: string) {
    const recipeUpdatingIndex = this.recipes.findIndex((el) => el.id === id);
    this.recipes.splice(recipeUpdatingIndex, 1);
    this.recipeSelected.next(this.recipes.slice());
  }

  deleteRecipeIngredient(id: string, index: number) {
    const recipeUpdatingIndex = this.recipes.findIndex((el) => el.id === id);
    this.recipes[recipeUpdatingIndex].ingredients.splice(index, 1);
    this.recipeSelected.next(this.recipes.slice());
  }
}
