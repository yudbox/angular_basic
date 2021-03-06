import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthResponseModel } from 'src/app/models/auth-response.model';
import { AlertComponent } from 'src/app/shared/alerts/alert.component';
import { Placeholderderictive } from 'src/app/shared/directives/placeholder.derictive';
import * as fromApp from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authForm: FormGroup;
  @ViewChild(Placeholderderictive) alertHost: Placeholderderictive;

  dinamicCompoenentCloseMethodSub: Subscription;
  storeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.isFetching;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });

    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.value) {
      return;
    }
    // console.log(this.authForm.value);

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable: Observable<AuthResponseModel>;

    // this.isLoading = true;
    if (this.isLoginMode) {
      // authObservable = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    } else {
      // authObservable = this.authService.signup(email, password);
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    }

    // authObservable.subscribe({
    //   next: (res) => {
    //     this.isLoading = false;
    //     console.log('111 res', res);
    //     this.router.navigate(['/recipes']);
    //   },
    //   error: (errorMessage) => {
    //     this.isLoading = false;
    //     this.error = errorMessage;
    //     console.log('111 error', errorMessage);
    //     this.showErrorAlert(errorMessage);
    //   },
    // });
    this.authForm.reset();
  }

  // onHandleError() {
  //   this.error = null;
  // }

  ngOnDestroy(): void {
    if (this.dinamicCompoenentCloseMethodSub) {
      this.dinamicCompoenentCloseMethodSub.unsubscribe();
    }
    this.storeSub.unsubscribe();
  }

  private showErrorAlert(message: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.dinamicCompoenentCloseMethodSub =
      componentRef.instance.close.subscribe(() => {
        this.dinamicCompoenentCloseMethodSub.unsubscribe();
        hostViewContainerRef.clear();
      });
  }
}
