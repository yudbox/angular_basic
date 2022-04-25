import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AnimateComponent } from 'src/app/animate/animate.component';

@NgModule({
  declarations: [AnimateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // если модуль использует Lazy loading то path раута начинается с '' т.к путь указан в app-routing.module
      {
        path: '',
        component: AnimateComponent,
      },
    ]),
  ],
})
export class AnimateModule {}
