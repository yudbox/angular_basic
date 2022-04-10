import { ServersModel } from 'src/app/models/servers.model';

export class ServersService {
  private servers: ServersModel[] = [
    { name: 'Test', content: 'Content test', id: 1 },
  ];

  getServers() {
    return this.servers.slice();
  }
}
