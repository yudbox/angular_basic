import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoggingService } from 'src/app/shared/services/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.loggingService.logStatusChange('Hello from App component 111111');
  }

  // onLoadServers(id: number) {
  //   // complex calculation
  //   this.router.navigate(['/servers', id, 'edit'], {
  //     queryParams: { allowEdit: false, search: 'eee' },
  //     fragment: 'loading',
  //     // preserve означает сохранить текущие параметры в рауте, но на самом деле раут под капотом и страница согласно нового раута изменяться
  //     queryParamsHandling: 'preserve',
  //   });
  // }
  // onLogin() {
  //   this.authService.login('email', 'password');
  // }
  // onLogout() {
  //   this.authService.logout();
  // }
}
