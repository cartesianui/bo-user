import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AxisHttpInterceptor } from '@cartesianui/core';
import { CommonModule as CartesianCommonModule } from '@cartesianui/common';
import { FormsModule as CartesianFormModule } from '@cartesianui/forms';
import { BoLayoutModule } from '@cartesianui/coreui';
import { AuthModule } from '@cartesianui/bo-auth';

import * as fromUser from './store/user.reducer';
import { UserEffects } from './store/user.effect';

import { UserRoutingModule } from './user-routing.module';
import { UserHttpService } from './user-http.service';
import { UserSandbox } from './user.sandbox';

import { UserComponent } from './user.component';
import { UsersComponent } from './ui/users.component';
import { CreateUserComponent } from './ui/create/create.component';
import { EditUserComponent } from './ui/edit/edit.component';
import { UserConfigurationComponent } from './ui/configuration/user-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CartesianCommonModule.forFeature(),
    CartesianFormModule.forFeature(),
    BoLayoutModule.forFeature(),
    UserRoutingModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    NgxDatatableModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature(fromUser.usersFeatureKey, fromUser.reducer),
    AuthModule
  ],
  declarations: [UserComponent, UsersComponent, CreateUserComponent, EditUserComponent, UserConfigurationComponent],
  providers: [UserHttpService, UserSandbox, { provide: HTTP_INTERCEPTORS, useClass: AxisHttpInterceptor, multi: true }],
  exports: []
})
export class UserModule {}
