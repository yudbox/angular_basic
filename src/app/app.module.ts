import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from 'src/app/app.component';
import { ServerComponent } from 'src/app/server/server.component';
import { ServersComponent } from 'src/app/servers/servers.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { CockpitComponent } from 'src/app/server/cockpit/cockpit.component';
import { ServerElementComponent } from 'src/app/server/server-element/server-element.component';
import { BacicHighlightDirective } from 'src/app/shared/directives/basic-highlight.directive';
import { BetterHighlightDirective } from 'src/app/shared/directives/better-highlight.directive';
import { UnlessDirective } from 'src/app/shared/directives/unless.directive';
import { LoggingService } from 'src/app/shared/services/logging.service';
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { HomeComponent } from 'src/app/home/home.component';
import { ServerEditComponent } from 'src/app/server/server-edit/server-edit.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { ServersService } from 'src/app/shared/services/servers.service';
import { ServerResolverService } from 'src/app/shared/services/server-resolver.service';
import { Header2Component } from 'src/app/header2/header2.component';
import { FormComponent } from 'src/app/form/form.component';
import { Form2Component } from 'src/app/form2/form2.component';
import { PipesTransformingComponent } from 'src/app/pipes-transforming/pipes-transforming.component';
import { FilteredPipe, ShortenStringPipe } from 'src/app/shared/pipes';
import { FetchRequestComponent } from 'src/app/fetch-request/fetch-request.component';
import { AuthInterceptor } from 'src/app/interseptors/auth.interceptors';
import { LoggingInterceptor } from 'src/app/interseptors/logging.interseptor';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { shoppingListReducer } from 'src/app/shopping-list/store/shopping-list.reducer';
import { RecipesModule } from 'src/app/recipes/recipes.module';
import { ShoppingListModule } from 'src/app/shopping-list/shopping-list.module';
import { AuthModule } from 'src/app/auth/auth.module';
// import { DropdownDirective } from 'src/app/shared/directives/dropdown.directive';
// import { LoadingSpinnersComponent } from './shared/loading-spinners/loading-spinners/loading-spinners.component';
// import { AlertComponent } from 'src/app/shared/alerts/alert.component';
// import { Placeholderderictive } from 'src/app/shared/directives/placeholder.derictive';

@NgModule({
  // здесь регистрируються все компоненты и директивы
  declarations: [
    // !!!!! компоненты должны быть задикларированны только в одном из модулей
    // !!!!!! ДВОЙНОЕ ДИКЛАРИРОВАНИЕ ЗАПРЕЩЕНО!!!!!!
    // компоненты ниже задикларированны в shared.module.ts
    // DropdownDirective,
    // LoadingSpinnersComponent,
    // AlertComponent,
    // Placeholderderictive,
    AppComponent,
    ServerComponent,
    ServersComponent,
    HeaderComponent,
    CockpitComponent,
    ServerElementComponent,
    BacicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective,
    HomeComponent,
    ServerEditComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    Header2Component,
    FormComponent,
    Form2Component,
    PipesTransformingComponent,
    ShortenStringPipe,
    FilteredPipe,
    FetchRequestComponent,
    PagesComponent,
  ],
  // роутинг не работает как надо если RecipesModule компонента с чайлд роутингом
  //  находиться ниже чем AppRoutingModule где есть роут not-found
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ sl: shoppingListReducer }),
    /* если модуль добавлен в Lazy loading его не нужно добавлять в 
    app.module
        */
    // AuthModule,
    // RecipesModule,
    // ShoppingListModule,
    AppRoutingModule,
    SharedModule,
  ],
  // здесь импортятся сервисы для всего приложения
  providers: [
    LoggingService,
    AccountsService,
    RecipeService,
    ShoppingListService,
    AuthService,
    AuthGuardService,
    CanDeactivateGuard,
    ServersService,
    ServerResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
