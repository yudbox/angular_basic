import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { RecipeModel } from 'src/app/recipes/recepies.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  recipesSubscription: Subscription;
  constructor(
    // private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.recipesSubscription = this.recipeService.recipeSelected.subscribe(
    this.recipesSubscription = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((resipes: RecipeModel[]) => {
        this.recipes = resipes;
      });

    // this.recipes = this.recipeService.getRecipes();
  }

  onCreateNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
