import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

// обязательно добавить в модульных файл в раздел declarations
// [appBasicHighlight] если указать селектор в [] то при применении его в HTML tag
// не нужно буть использовать [] а можно будет вставить как атрибут
@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  // если создать атрибут с именем директивы, то HTML теге ее можно обворачиыв
  // в [] вопреки тому что написано выше и присваивать ей значение
  @Input() passiveColor: string;
  @Input('appBetterHighlight') activeColor: string;

  //  можно связвть свойство в переменую с помощью HostBinding
  // НЕ РАБОТАЕТ CJDVTCNYJC механизмJV renderer. Только один подход на одно свойство.
  // Можно также задавать начальное значение
  @HostBinding('style.backgroundColor') backgroundColor: string;
  // @HostBinding('style.backgroundColor') backgroundColor: string = 'green';

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  // flags 1 means !important
  ngOnInit(): void {
    this.backgroundColor = this.passiveColor;
    // this.renderer.setStyle(this.elRef.nativeElement, 'background', 'green', 1);
  }

  @HostListener('mouseenter') mouseabove(eventData: Event) {
    this.backgroundColor = 'yellow';

    // this.renderer.setStyle(this.elRef.nativeElement, 'background', 'yellow', 1);
    this.renderer.setStyle(this.elRef.nativeElement, 'cursor', 'pointer', 1);
  }
  @HostListener('mouseleave') mouseleve(eventData: Event) {
    this.backgroundColor = this.activeColor;

    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background',
    //   'aquamarine',
    //   1
    // );
  }
}
