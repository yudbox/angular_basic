import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/recipes/recepies.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

/**
 * в тригере если элементо только вмонтируется в DOM или наоборот вместо state используется ключевое слово void
 * которое может быть использовано при описании плавности анимации в transition и задании его первоночального style()
 * в нашем случае элемент появится с такими стилями opacity: 0, transform: 'translateX(-100px)', backgroundColor: 'rgba(0,500,10,.1)',
 * и и прейдет в состояние со стилями'in'
 *
 * с помощью  group([]) можно объеденять анимации и они будут выполняться две параллельно
 *
 * с помощью keyframes можно разделить animate() на деобходимые интервалы времени с помощью ключевого слова offset: 0 и каждый keyframe
 * будет забирать %- процент от общего времени анимации
 */
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  animations: [
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
          backgroundColor: 'rgba(0,500,10,.1)',
        }),
        group([
          animate(1000),
          animate(
            1000,
            style({
              backgroundColor: '#fff',
            })
          ),
        ]),
      ]),
      transition('* => void', [
        animate(
          500,
          style({
            opacity: 0,
            transform: 'translateX(100px)',
          })
        ),
      ]),
    ]),
    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(-100px)',
              offset: 0,
            }),
            style({
              opacity: 0.5,
              transform: 'translateX(-50px)',
              offset: 0.3,
            }),
            style({
              opacity: 1,
              transform: 'translateX(-20px)',
              offset: 0.8,
            }),
            style({
              opacity: 1,
              transform: 'translateX(0px)',
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('* => void', [
        animate(
          500,
          style({
            opacity: 0,
            transform: 'translateX(100px)',
          })
        ),
      ]),
    ]),
  ],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: RecipeModel;

  ngOnInit(): void {}
}
