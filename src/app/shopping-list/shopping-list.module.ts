import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from 'src/app/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from 'src/app/shopping-list/shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      // если модуль использует Lazy loading то path раута начинается с '' т.к путь указан в app-routing.module
      {
        path: '',
        component: ShoppingListComponent,
      },
    ]),
  ],
})
export class ShoppingListModule {}
