import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './ui/users.component';
import { UserConfigurationComponent } from './ui/configuration/user-configuration.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
