import { inject, Injectable, Injector } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RequestCriteriaOuput } from '@cartesianui/core';
import { Sandbox } from '@cartesianui/common';
import { User, UserRole, UserPermission } from './models';
import { UserActions } from './store/user.actions';
import * as fromUser from './store/user.reducer';

@Injectable({providedIn: 'root'})
export class UserSandbox extends Sandbox {
  protected store = inject(Store);

  public users$ = this.store.pipe(select(fromUser.entities));
  public usersMeta$ = this.store.pipe(select(fromUser.meta));
  public selectedUser$ = this.store.pipe(select(fromUser.selected));
  public createState$ = this.store.pipe(select(fromUser.create));


  getUsers = (criteria: RequestCriteriaOuput): void => {
    this.store.dispatch(UserActions.getUsers({ criteria: criteria }));
  };

  selectUser = (user: User): void => {
    this.store.dispatch(UserActions.selectUser({ user }));
  };

  createUser = (user: User): void => {
    this.store.dispatch(UserActions.createUser({ user }));
  };

  updateUser = (id: string, user: User): void => {
    this.store.dispatch(UserActions.updateUser({ user: { id, changes: user } }));
  };

  updateUserCredentials = (id: string, credentails: { currentPassword: string; newPassword: string }): void => {
    this.store.dispatch(UserActions.updateUserCredentials({ user: { id, changes: credentails } }));
  };

  deleteUser = (id: string): void => {
    this.store.dispatch(UserActions.deleteUser({ id }));
  };

  public attachRoles(id: string, form: UserRole): void {
    this.store.dispatch(UserActions.attachRoles({ id, form }));
  }

  public detachRoles(id: string, form: UserRole): void {
    this.store.dispatch(UserActions.detachRoles({ id, form }));
  }

  public attachPermissions(id: string, form: UserPermission): void {
    this.store.dispatch(UserActions.attachPermissions({ id, form }));
  }

  public detachPermissions(id: string, form: UserPermission): void {
    this.store.dispatch(UserActions.detachPermissions({ id, form }));
  }
}
