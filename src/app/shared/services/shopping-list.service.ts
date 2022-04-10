import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { IngredientsModel } from 'src/app/shared/ingredient.model';

export class ShoppingListService {
  private ingredients: IngredientsModel[] = [];

  // медод Subject заменяет EventEmitter и создает Observable
  // в который с помощью next() прокидывается данные
  // а в других компонентах можно на него подписываться и получать актуальные данные
  // обязательно не забыть отписаться в методе onDestroy
  ingredientsChanged = new Subject<IngredientsModel[]>();
  startedEditing = new Subject<number>();

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }
  // из-за того что выше мы делаем копию массива через slice новые индгридиетны
  // не будут видны в компоненте после инициализации ngOnInit
  // 1. для этого нужно удалить slice и менять исходный массив напрямую. Это непрлохой подход для чего-то не важного
  // 2. или создать eventemmiter как в примере выше. Он запускает observable в который всегда ложится свежая копия ингридиетнов
  //   и тот кто на него подписывается получает всегда актуальный массив ингридиентов
  addIngredient(ingredientsData: IngredientsModel) {
    this.ingredients.push(ingredientsData);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: IngredientsModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(id: number, newIngredient: IngredientsModel) {
    this.ingredients[id] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
