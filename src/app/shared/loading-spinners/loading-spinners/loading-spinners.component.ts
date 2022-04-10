import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinners',
  template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinners.component.css'],
})
export class LoadingSpinnersComponent implements OnInit {
  // https://loading.io/css/
  constructor() {}

  ngOnInit(): void {}
}
