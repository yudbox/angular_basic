import { Directive, ElementRef, OnInit } from '@angular/core';

// обязательно добавить в модульных файл в раздел declarations
// [appBasicHighlight] если указать селектор в [] то при применении его в HTML tag
// не нужно буть использовать [] а можно будет вставить как атрибут
@Directive({
  selector: '[appBasicHighlight]',
})
export class BacicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
