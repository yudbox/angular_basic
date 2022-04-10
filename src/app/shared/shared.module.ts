import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from 'src/app/shared/alerts/alert.component';
import { DropdownDirective } from 'src/app/shared/directives/dropdown.directive';
import { Placeholderderictive } from 'src/app/shared/directives/placeholder.derictive';
import { LoadingSpinnersComponent } from 'src/app/shared/loading-spinners/loading-spinners/loading-spinners.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnersComponent,
    Placeholderderictive,
    DropdownDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnersComponent,
    Placeholderderictive,
    DropdownDirective,
    CommonModule,
  ],
})
export class SharedModule {}
