import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { RecipeModel } from 'src/app/recipes/recepies.model';
import { IngredientsModel } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: RecipeModel;
  selectedRecipeId: string;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // используем Resolver до того как компонента запустит ngOnInit
    // к этому моменту recipes в recipeService уже есть и метод getRecipeById
    // не выдаст ошибку

    this.route.params
      .pipe(
        map((params) => {
          return params['id'];
        }),
        switchMap((id) => {
          this.selectedRecipeId = id;
          return this.store.select('recipes');
        }),
        map((recipesState) =>
          recipesState.recipes.find(
            (recipe) => recipe.id === this.selectedRecipeId
          )
        )
      )
      .subscribe((recipe) => {
        this.selectedRecipe = recipe;
      });
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(
    //   this.selectedRecipe.ingredients
    // );
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.selectedRecipe.ingredients)
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.selectedRecipeId));
    // this.recipeService.deleteRecipe(this.selectedRecipeId);
    this.router.navigate(['/recipes']);
  }
}
