import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeModel } from 'src/app/recipes/recepies.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    // используем Resolver до того как компонента запустит ngOnInit
    // к этому моменту recipes в recipeService уже есть и метод getRecipeById
    // не выдаст ошибку
    this.route.params.subscribe((params: Params) => {
      this.selectedRecipeId = params['id'];
      this.selectedRecipe = this.recipeService.getRecipeById(
        this.selectedRecipeId
      );
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.selectedRecipe.ingredients
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipeId);
    this.router.navigate(['/recipes']);
  }
}
