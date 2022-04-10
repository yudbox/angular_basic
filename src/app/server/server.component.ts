import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { ServersModel } from 'src/app/models/servers.model';
import { ServersService } from '../shared/services/servers.service';

// дикоратор который говорит ангуляр что это компонента
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
})
export class ServerComponent implements OnInit {
  servers: ServersModel[] = [];
  serverId = 10;
  serverStatus = 'offline';

  serverCreationStatus = 'No server was created';
  serverCreated = false;

  constructor(
    private serversServise: ServersService,
    private route: ActivatedRoute
  ) {
    this.servers = this.serversServise.getServers();

    this.serverCreated = Math.random() > 0.5 ? true : false;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      console.log('444444444 serverAnyName', data['serverAnyName']);
    });
  }

  onCreateServer(serverData: { serverName: string; serverContent: string }) {
    this.servers.push({
      name: serverData.serverName,
      content: serverData.serverContent,
      id: +this.servers.length + 1,
    });
  }

  // onUpdateServerName(event: Event) {
  //   // HTMLInputElement нужно для типизации HTML елемента
  //   this.serverName = (<HTMLInputElement>event.target).value;
  // }

  getColor() {
    return this.serverCreated ? 'green' : 'blue';
  }
}
