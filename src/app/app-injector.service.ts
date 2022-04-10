import { Injector } from '@angular/core';

export class AppInjector {
  private static injector: Injector;

  static setInjector(componentInjector: Injector) {
    AppInjector.injector = componentInjector;
  }
  static getInjector(): Injector {
    return AppInjector.injector;
  }
}
