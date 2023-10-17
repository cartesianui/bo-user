import { Injectable, Injector } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RequestCriteria } from '@cartesianui/core';
import { Sandbox } from '@cartesianui/common';
import { User, UserSearch, UserRole, UserPermission } from './models';
import { UserActions } from './store/user.actions';
import * as fromUser from './store/user.reducer';

@Injectable()
export class UserSandbox extends Sandbox {
  public users$ = this.store.pipe(select(fromUser.entities));
  public usersMeta$ = this.store.pipe(select(fromUser.meta));
  public selectedUser$ = this.store.pipe(select(fromUser.selected));
  public creationState$ = this.store.pipe(select(fromUser.creation));

  constructor(
    protected store: Store,
    protected override injector: Injector
  ) {
    super(injector);
  }

  fetchUsers = (criteria: RequestCriteria<UserSearch>): void => {
    this.store.dispatch(UserActions.fetchUsers({ criteria: criteria }));
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

  public attachRoles(form: UserRole): void {
    this.store.dispatch(UserActions.attachRoles({ form }));
  }

  public detachRoles(form: UserRole): void {
    this.store.dispatch(UserActions.detachRoles({ form }));
  }

  public attachPermissions(id: string, form: UserPermission): void {
    this.store.dispatch(UserActions.attachPermissions({ id, form }));
  }

  public detachPermissions(id: string, form: UserPermission): void {
    this.store.dispatch(UserActions.detachPermissions({ id, form }));
  }
}
