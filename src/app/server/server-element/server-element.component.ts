import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServersModel } from 'src/app/models/servers.model';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // через дикоратор @Input('srvElement') можно передать данные как props при чем srvElement может быть как алиас
  // а переменная element будет использоваться как имя внутри компоненты
  @Input('srvElement') element: ServersModel;
  constructor(private route: ActivatedRoute) {
    // console.log('1 constructor called');
  }

  paramsSubscription: Subscription;

  ngOnChanges(changes: SimpleChanges) {
    // console.log('2 ngOnChanges called');
    // хранит изменения предидущих и текущих переьенных объявленных выше
    // console.log('changes', changes);
  }

  ngOnInit(): void {
    // console.log('3 ngOnInit called');
    // для динамическо считываения динамических параметров route.params возвращает observable
    // на который нужно подписаться и от будет динамически слушать и менять переменные внутри компоненты
    // когда компонента будет размонтированна все observable должны быть отписаны
    // в хуке  ngOnDestroy. ДЛя this.route это делать НЕНАДО отписка показана как пример
    // но в своихсобственных observable ЭТО НУЖНО ДЕЛАТЬ ОБЯЗЯТЕЛЬНО!!!!!
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      console.log('get dimamic params from URL', params);
    });

    // метод со snapshot не меняет параметров если вы находитесь внутри компоненты
    // и меняете динамических параметры когда компонента уже вмонтирована
    // this.element = {
    //   id: this.route.snapshot.params['id'],
    //   name: this.route.snapshot.params['name'],
    // };
  }

  ngDoCheck() {
    //вызывается на каждое изменение в переменнных или действие юзера,
    //таких как клик на любую кнопку, сабмит и т.д. на движении мыши не срабатывает
    // console.log('4 ngDoCheck called');
  }

  // CONTENT section срабатывает когда данные пришли в компонентку но еще не отобразились на UI
  // такие данные могут быть переданны снаружи компоненты между тегами, как child в Реакт
  ngAfterContentInit(): void {
    // console.log('5 ngAfterContentInit called');
  }

  ngAfterContentChecked(): void {
    //вызывается на каждое изменение в переменнных или действие юзера,
    // вызывается после ngDoCheck
    // console.log('6 ngAfterContentChecked called');
  }
  // VIEW section срабатывает когда данные отобразились на UI
  // до инициализации этого хука нельзя обращаться не к каким переменным данного шаблона пока view не отобразится
  ngAfterViewInit(): void {
    // console.log('7 ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    //вызывается на каждое изменение в переменнных или действие юзера,
    // вызывается после ngAfterContentChecked
    // console.log('8 ngAfterViewChecked called');
  }
  ngOnDestroy() {
    // вызываются после удаления компоненты из DOM дерева
    // console.log('9 ngOnDestroy called');

    this.paramsSubscription.unsubscribe();
  }
}
