// bookeeper.routes.ts template
import { Routes } from '@angular/router';
import { UsersComponent } from './ui/users.component';
import { UserConfigurationComponent } from './ui/configuration/user-configuration.component';

import { provideUserFeature } from './user.providers';
import { EntryComponent } from './entry.component';

export const routes: Routes = [
  {
    path: '',
    component: EntryComponent,
    providers: [provideUserFeature()],
    children: [
      {
        path: '',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'configuration',
        component: UserConfigurationComponent,
        data: {
          title: 'Configuration'
        }
      }
    ]
  }
];
