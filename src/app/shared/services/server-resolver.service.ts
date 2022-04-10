import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ServersModel } from 'src/app/models/servers.model';
import { ServersService } from './servers.service';

@Injectable()
export class ServerResolverService implements Resolve<ServersModel> {
  constructor(private serversService: ServersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ServersModel | Observable<ServersModel> | Promise<ServersModel> {
    const id = route.params['id'];
    const currentServer = this.serversService
      .getServers()
      .find((s) => s.id == id);
    console.log('33333 currentServer', currentServer);

    return currentServer;
  }
}
