import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngredientsModel } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

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
  editMode = false;
  editedItemIndex: number;
  editedItem: IngredientsModel;

  // Сервисы создаются в конструкторе, но компоненту обязательно нужно обеспечить этим сервисом через providers
  // если передать класс сервиса в providers, то данный сервис будет доступен только данной компоненте и ее детям
  // !!!ДЛЯ ДОСТУПНОСТИ СЕРВИСА ВСЕМУ ПРИЛОЖЕНИЮ НУЖНО импортировать сервис в providers app.module.ts
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.slSubsciption = this.slService.startedEditing.subscribe(
      (id: number) => {
        this.editedItemIndex = id;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(id);
        this.slForm.setValue({
          ingrName: this.editedItem.name,
          ingrAmount: this.editedItem.amount,
        });
      }
    );
  }
  onSubmit(form: NgForm) {
    console.log('form', form);

    const ingrName = form.value.ingrName;
    const ingrAmount = form.value.ingrAmount;

    const newIngredients = new IngredientsModel(ingrName, ingrAmount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredients);
    } else {
      this.slService.addIngredient(newIngredients);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.slSubsciption.unsubscribe();
  }
}
