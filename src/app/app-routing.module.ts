import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ServerComponent } from 'src/app/server/server.component';
import { ServersComponent } from 'src/app/servers/servers.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ServerEditComponent } from 'src/app/server/server-edit/server-edit.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { CanDeactivateGuard } from 'src/app/shared/services/can-deactivate-guard.service';
import { ErrorPageComponent } from 'src/app/error-page/error-page.component';
import { ServerResolverService } from 'src/app/shared/services/server-resolver.service';
import { ShoppingListComponent } from 'src/app/shopping-list/shopping-list.component';
import { FormComponent } from 'src/app/form/form.component';
import { Form2Component } from 'src/app/form2/form2.component';
import { PipesTransformingComponent } from 'src/app/pipes-transforming/pipes-transforming.component';
import { FetchRequestComponent } from 'src/app/fetch-request/fetch-request.component';
import { AuthComponent } from 'src/app/auth/auth.component';

// guard можно активировать на корневой роут, но роуты детей будут доступны, на родителя и на детей
// для этого canActivate можно прописывать у каждого раута, либо только у детей
// children структура описана ниже
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'auth',
    // таким образом мы указываем Ангуляр что загрузка модуля должна производиться с момощью Lazy loading
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'recipes',
    // таким образом мы указываем Ангуляр что загрузка модуля должна производиться с момощью Lazy loading
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'shopping-list',
    // таким образом мы указываем Ангуляр что загрузка модуля должна производиться с момощью Lazy loading
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'animate',
    // таким образом мы указываем Ангуляр что загрузка модуля должна производиться с момощью Lazy loading
    loadChildren: () =>
      import('src/app/animate/animate.module').then((m) => m.AnimateModule),
  },
  { path: 'form', component: FormComponent },
  { path: 'formsecond', component: Form2Component },
  { path: 'fetch', component: FetchRequestComponent },
  { path: 'pipes', component: PipesTransformingComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'servers',
    canActivate: [AuthGuardService],
    component: ServersComponent,
  },
  { path: 'servers/:id/edit', component: ServerEditComponent },
  /*
   * ресолвер ServerResolverService это специальный сервис в котором можно асинхронно получить и обработать данные до загрузки компоненты
   * в этом сервисе должен быть специальные метод resolve в котором и будут преобразовываться данные а в компоненте к ней
   * можно обратиться по переменной которая определяется в объекте resolve ниже. serverAnyName
   */
  {
    path: 'servers/:id/:secondParam',
    component: ServerComponent,
    resolve: { serverAnyName: ServerResolverService },
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found' },
  },
  { path: '**', redirectTo: '/not-found' },

  {
    path: 'servers',
    component: ServersComponent,
    // разрешит доступ к компоненте ServersComponent, но к компонентам children доступ будет запрещен
    // для этого в сервесе AuthGuard необходимо реализовать метод canActivateChild
    canActivateChild: [AuthGuardService],
    children: [
      // !!!! для того чтоб дети работали необходимо добавить <router-outlet></router-outlet>
      // в корень компоненты servers. Это будет как бы новая корневая папка
      {
        path: ':id/edit',
        canDeactivate: [CanDeactivateGuard],
        component: ServerEditComponent,
      },
      { path: ':id/:secondParam', component: ServerComponent },
    ],
  },
];

@NgModule({
  imports: [
    // preloadingStrategy выбирает как закружать модули при Lazy Loading
    // PreloadAllModules загружает и отображает первые модули нужные для отображения
    // а затем если движок браузера не занят загружает остальные модули в Lazy Loading
    // если не указывать стратегию то по дефолту модули будут подгружаться только тогда
    // когда сработает нужный раут
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
