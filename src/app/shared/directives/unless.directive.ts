import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  // для того чтоб использовать имя дерективы как атрибут и передовать в него значения
  // имя селектора и атрибута @Input должны совпадать
  // вместо значения запустить функции нужно ипользовать слово set
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  // для отображения/скрытия елементов DOM в Ангуляр есть механизм ViewContainerRef
  // который по ссылке к элементу TemplateRef позволяет проявлять его или скрывать
  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
