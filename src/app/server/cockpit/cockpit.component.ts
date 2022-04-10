import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
  // для того чтоб вызвать serverCreated метод снаружи компоненты нужно создать истенс класса EventEmitter и сделать типизацию
  // потом в нужный момент click эмитить событие и передать в нее аргументы согласно типизации. Внешняя функция их перехватит и передаст родительской компоненте
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  // serverName = 'Test 1';
  // serverContent = 'Content 1';

  // !!!!!!! ЖЕЛАТЕЛЬНО ИСПОЛЬЗОВАТЬ ССЫЛКИ В КРАЙНИХ СЛУЧАЯХ ngModel ПЕРДПОЧТИТЕЛЬНЕЕ
  // local referehces 1 сособ использования ссылок в HTML файле
  @ViewChild('serverContentRef') serverContent: ElementRef;

  allowNewServer = false;
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {}
  // !!!!!!! ЖЕЛАТЕЛЬНО ИСПОЛЬЗОВАТЬ ССЫЛКИ В КРАЙНИХ СЛУЧАЯХ ngModel ПЕРДПОЧТИТЕЛЬНЕЕ
  // local referehces 2 сособ использования ссылок в HTML файле
  // но может быть передана в шаблон как аргумент
  onCreateServer(serverNameRef: HTMLInputElement) {
    this.serverCreated.emit({
      serverName: serverNameRef.value,
      serverContent: this.serverContent.nativeElement.value,
    });
  }
}
