import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

/**
 *     BrowserAnimationsModule должен быть импортирован в app.module
 * trigger это функция которая отвечает за анимацию элемента, первый параметр это имя или якорь
 * он связывает тригер с DOM элементом через переменную [@divSquare]="state", изначально   state = 'normal';
 * второй параметр это массив изменений который принимает состояние анимации. В нем прописываются стили
 * и плавность анимации или transition() в котором указывается время анимации при переходе от одного состояния
 * к другому 'normal => highlighted', animate(300). Из normal состояние в highlighted перейдет за 300 мс
 *
 * в  transition('srinked <=> *', [style({ borderRadius: '0px', }), animate(1000, style({borderRadius: '10px',})),
 *    animate( 500, style({borderRadius: '25px'})), animate(1500), - можно прописывать фазы анимации в данном случае
 *  при переходе от любого состояния в srinked и при выходе из него, на стили начального state добавляется стиль borderRadius: '0px',
 *  при переходе во вторую фазу за 1000 мс радиус поменяется от 0 до 10 px, в третьей фазе за 500 мс радиус поменяется от 10px до 25px
 *  и при переходе в финальную фазу которая указана в state триггера радиус вернется к 0, т.к. он не указан в финальном state
 *  backgroundColor: 'blue', transform: 'translateX(100px) scale(1)', и анимация пройдет за 1500 мс как указано в последнем animate(1500)
 * 
 * кроме фаз у анимаций можно задавать keyframes в которых можно разбивать время одного animate() на временные отрезки. Об это смотри в RecipeItemComponent
 *
 * в анимациях также можно возвращать callback для этого елемент к которому привязан триггер нудно забайндить (@divSquare.start)="animationStarted($event)"
 * (@divSquare.done)="animationCompleted($event)" у триггера есть два callback. Во время начала и во время окончания анимации в них пожно передать event
 * который можно обработать и принять данные о анимации
      
 */

@Component({
  selector: 'app-animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.css'],
  animations: [
    trigger('divSquare', [
      state(
        'normal',
        style({
          'background-color': 'green',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px)',
        })
      ),
      // если время анимации не отличается можно использовать  <=> вместо двойных  transition
      // transition('normal <=> highlighted', animate(300)),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
    ]),
    trigger('wildSquare', [
      state(
        'normal',
        style({
          'background-color': 'green',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'srinked',
        style({
          backgroundColor: 'salmon',
          transform: 'translateX(100px) scale(0.5)',
        })
      ),
      // если время анимации не отличается можно использовать  <=> вместо двойных  transition
      // transition('normal <=> highlighted', animate(300)),
      transition('normal => highlighted', animate(1000)),
      transition('highlighted => normal', animate(800)),
      transition('srinked <=> *', [
        style({
          borderRadius: '0px',
        }),
        animate(
          1000,
          style({
            borderRadius: '10px',
          })
        ),
        animate(
          500,
          style({
            borderRadius: '25px',
          })
        ),
        animate(1500),
      ]),
    ]),
  ],
})
export class AnimateComponent implements OnInit {
  constructor() {}
  state = 'normal';
  wildState = 'normal';
  ngOnInit(): void {}

  onAnimate() {
    this.state === 'normal'
      ? (this.state = 'highlighted')
      : (this.state = 'normal');
  }

  onShrink() {
    if (this.wildState === 'normal') {
      this.wildState = 'highlighted';
      // setTimeout(() => {
      //   this.wildState = 'srinked';
      // });
    } else if (this.wildState === 'highlighted') {
      this.wildState = 'srinked';
      // setTimeout(() => {
      //   this.wildState = 'normal';
      // });
    } else {
      this.wildState = 'normal';
    }
  }

  animationStarted(event) {
    console.log('animation started', event);
  }
  animationCompleted(event) {
    console.log('animation completed', event);
  }
}
