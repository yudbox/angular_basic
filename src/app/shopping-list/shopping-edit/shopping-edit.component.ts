import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngredientsModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import * as ShoppingListActions from 'src/app/shopping-list/store/shopping-list.actions';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  // providers: [LoggingService],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //
  //TEPLATE-DRIVEN APPROACH
  //!!!!!!!!!!  FormsModule in app.module

  @ViewChild('slForm') slForm: NgForm;
  slSubsciption: Subscription;
  storeSubsciption: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: IngredientsModel;

  // Сервисы создаются в конструкторе, но компоненту обязательно нужно обеспечить этим сервисом через providers
  // если передать класс сервиса в providers, то данный сервис будет доступен только данной компоненте и ее детям
  // !!!ДЛЯ ДОСТУПНОСТИ СЕРВИСА ВСЕМУ ПРИЛОЖЕНИЮ НУЖНО импортировать сервис в providers app.module.ts
  constructor(
    // private slService: ShoppingListService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSubsciption = this.store.select('sl').subscribe((stateData) => {
      if (stateData.editedIngredietItemIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredietItem;
        this.slForm.setValue({
          ingrName: this.editedItem.name,
          ingrAmount: this.editedItem.amount,
        });
      } else {
        this.editMode = false;
      }
    });

    // Это сьарый метод с помощью сервисов и Subject оствил ради примера
    // Сейчас все работает через store и RXJS
    // this.slSubsciption = this.slService.startedEditing.subscribe(
    //   (id: number) => {
    //     this.editedItemIndex = id;
    //     this.editMode = true;
    //     this.editedItem = this.slService.getIngredient(id);
    //     this.slForm.setValue({
    //       ingrName: this.editedItem.name,
    //       ingrAmount: this.editedItem.amount,
    //     });
    //   }
    // );
  }
  onSubmit(form: NgForm) {
    const ingrName = form.value.ingrName;
    const ingrAmount = form.value.ingrAmount;

    const newIngredients = new IngredientsModel(ingrName, ingrAmount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredients);
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredients)
      );
    } else {
      // this.slService.addIngredient(newIngredients);
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(newIngredients)
      );
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.FinishEditing());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    // this.slSubsciption.unsubscribe();
    this.storeSubsciption.unsubscribe();
    this.store.dispatch(new ShoppingListActions.FinishEditing());
  }
}
