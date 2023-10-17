import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UsersComponent } from './ui/users.component';
import { UserConfigurationComponent } from './ui/configuration/user-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'Users'
    },
    children: [
      {
        path: '',
        component: UsersComponent,
        data: {
          title: ''
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
