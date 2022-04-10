import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class Placeholderderictive {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
