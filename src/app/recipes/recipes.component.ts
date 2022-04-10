import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';

import { RecipeModel } from 'src/app/recipes/recepies.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
  // selectedRecipe: RecipeModel;
  switchValue = 2;
  resipeSubscription: Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // т.к. Eventemitter в сервисе это observable нужно подписаться на него
    // и получить данные в стрелочной в которой мы переприсваеваем значение selectedRecipe значением из сервиса
    // this.resipeSubscription = this.recipeService.recipeSelected.subscribe(
    //   (recipe: RecipeModel) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );
  }

  ngOnDestroy(): void {
    // this.resipeSubscription.unsubscribe();
  }
}
