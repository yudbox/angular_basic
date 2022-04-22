import { Component, OnDestroy, OnInit } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducer';
import * as AuthActions from 'src/app/auth/store/auth.actions';
import * as RecipesActions from 'src/app/recipes/store/recipe.actions';
// import { DataStorageService } from 'src/app/shared/services/data-storage.service';
// import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css'],
})
export class Header2Component implements OnInit, OnDestroy {
  isAuthentificated = false;
  private authSubscription: Subscription;

  constructor(
    // private dataStorageService: DataStorageService,
    // private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').subscribe((userState) => {
      this.isAuthentificated = !!userState?.user;
      console.log('user', userState);
    });
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
    // this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    // this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
