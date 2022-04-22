import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IngredientsModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { LoggingService } from '../shared/services/logging.service';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredientsNGRX: Observable<{ ingredients: IngredientsModel[] }>;
  ingredients: IngredientsModel[];
  // ingredients: IngredientsModel[] = [
  //   new IngredientsModel('flour', 100),
  //   new IngredientsModel('eggs', 5),
  //   new IngredientsModel('water', 500),
  // ];

  // private ingredientChangeSubscription: Subscription;

  constructor(
    // private slService: ShoppingListService,
    private loggingService: LoggingService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.ingredientsNGRX = this.store.select('sl');

    // this.ingredients = this.slService.getIngredients();
    // 2й подход синхронизации в сервисе. когда создается observable и тот кто на него подписан
    // всегда получает новый список ингридеентов и перезаписывает его в компоненте
    // данны метод заменил на библиотеку RXJS метод из store в редаксе
    // this.ingredientChangeSubscription =
    //   this.slService.ingredientsChanged.subscribe(
    //     (ingredients: IngredientsModel[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );

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
    // this.slService.startedEditing.next(id);
    this.store.dispatch(new ShoppingListActions.StartEditing(id));
  }

  ngOnDestroy(): void {
    // this.ingredientChangeSubscription.unsubscribe();
  }
}
