import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

// если нам нужно использованть сервис в сервисе, необходимо использовать дикоратор @Injectable()
// это коворить Ангуляр что в данный сласс что-то может быть вставлено иначе при импорте другого сервиса через конструктор
//  возникнет ошибка т.к. у сервисов нет своего дикоратора @Injectable() выполняет эу функцию
@Injectable()
export class AccountsService {
  accounts = [
    {
      name: 'Account master',
      status: 'active',
    },
    {
      name: 'User',
      status: 'active',
    },
  ];

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatusChange('someStatus');
  }

  updateStatus(name: string, status: string) {
    this.accounts[name].status = status;
    this.loggingService.logStatusChange('someStatus');
  }
}
