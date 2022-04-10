import { Component, OnInit } from '@angular/core';

interface serverInterface {
  instanceType: string;
  name: string;
  status: string;
  startted: Date;
}

@Component({
  selector: 'app-pipes-transforming',
  templateUrl: './pipes-transforming.component.html',
  styleUrls: ['./pipes-transforming.component.css'],
})
export class PipesTransformingComponent implements OnInit {
  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });
  servers = [
    {
      instanceType: 'medium',
      name: 'Production Server',
      status: 'stable',
      started: new Date(2020, 1, 15),
    },
    {
      instanceType: 'large',
      name: 'User Database',
      status: 'stable',
      started: new Date(2020, 1, 16),
    },
    {
      instanceType: 'small',
      name: 'Development Server',
      status: 'offline',
      started: new Date(2020, 1, 17),
    },
    {
      instanceType: 'small',
      name: 'Testing Server',
      status: 'stable',
      started: new Date(2021, 2, 16),
    },
  ];

  filteredStatus = '';

  constructor() {}

  ngOnInit(): void {}

  getStatusClasses(server: serverInterface) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical',
    };
  }

  onAddServer() {
    this.servers.push({
      instanceType: 'small',
      name: 'New Server',
      status: 'stable',
      started: new Date(2021, 2, 16),
    });
  }
}
