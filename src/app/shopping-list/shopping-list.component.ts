import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientsModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { LoggingService } from '../shared/services/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientsModel[];
  // ingredients: IngredientsModel[] = [
  //   new IngredientsModel('flour', 100),
  //   new IngredientsModel('eggs', 5),
  //   new IngredientsModel('water', 500),
  // ];

  private ingredientChangeSubscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    // 2й подход синхронизации в сервисе. когда создается observable и тот кто на него подписан
    // всегда получает новый список ингридеентов и перезаписывает его в компоненте
    this.ingredientChangeSubscription =
      this.slService.ingredientsChanged.subscribe(
        (ingredients: IngredientsModel[]) => {
          this.ingredients = ingredients;
        }
      );

    this.loggingService.logStatusChange(
      'Hello from ShoppingList Component 22222'
    );
  }

  onIngredientsAdded(ingredientsData: IngredientsModel) {
    this.ingredients.push(
      new IngredientsModel(ingredientsData.name, ingredientsData.amount)
    );
  }

  onEditItem(id: number) {
    this.slService.startedEditing.next(id);
  }

  ngOnDestroy(): void {
    this.ingredientChangeSubscription.unsubscribe();
  }
}
