import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscriber, Subscription } from 'rxjs';

import { IngredientsModel } from 'src/app/shared/ingredient.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { RecipeModel } from 'src/app/recipes/recepies.model';
import { AppState } from 'src/app/store/app.reducer';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  /*
   *
   * ----> REACTIVE FORM APPROACH
   * !!!!!!! ReactiveFormsModule in app.module
   */

  recipeForm: FormGroup;
  private storeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private resipeService: RecipeService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null; // undefined != null // false автоприведение типов
      this.initForm();
    });
  }

  onSubmit() {
    const newRecipe = new RecipeModel(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );
    if (this.editMode) {
      this.store.dispatch(
        new RecipesActions.UpdateRecipe({
          id: this.id,
          newRecipe: this.recipeForm.value,
        })
      );
      // this.resipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.store.dispatch(new RecipesActions.AddRecipe(newRecipe));
      // this.resipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  get ingredientsControl() {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  onAddIngredient() {
    this.ingredientsControl.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    this.ingredientsControl.removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.resipeService.getRecipeById(this.id);
      this.storeSubscription = this.store
        .select('recipes')
        .pipe(
          map((recipesState) => {
            return recipesState.recipes.find((recipe) => recipe.id === this.id);
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
