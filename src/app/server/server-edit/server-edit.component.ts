import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/services/can-deactivate-guard.service';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.css'],
})
export class ServerEditComponent implements OnInit, CanComponentDeactivate {
  allowEdit = false;
  changesSaved = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log('edit component dinamic params', params);
    });
    this.route.queryParams.subscribe((queryParams: Params) => {
      console.log('edit component query params', queryParams);
      this.allowEdit = queryParams['allowEdit'] === 'true' ? true : false;
    });
    this.route.fragment.subscribe((fragment: string) => {
      console.log('edit component fragment', fragment);
    });
  }

  onUpdateServer() {
    this.changesSaved = true;
  }

  canDeactivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.changesSaved) {
      // здесь закладывается логика по выводу специального сообщения или модалки
      // которая может остановить смену страницы по рауту когда нажимаешь кнопку "назад-вперед"
      return confirm('Do you want to leave this page?');
    }
    return true;
  }
}
