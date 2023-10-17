import { Component, Injector, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { UserSearch } from '../models/forms/user.search';
import { UserSandbox } from '../user.sandbox';
import { IUser, User } from '../models';

const userChildComponents = {
  createUser: { id: 'createUser', title: 'Create User' },
  editUser: { id: 'editUser', title: 'Edit User' }
} as const;

type UserChildComponent = typeof userChildComponents;

@Component({
  templateUrl: 'users.component.html',
  providers: []
})
export class UsersComponent extends ListingControlsComponent<IUser, UserSearch, UserChildComponent> implements OnInit, AfterViewInit, OnDestroy {
  override childComponents: UserChildComponent = userChildComponents;

  constructor(
    injector: Injector,
    public sb: UserSandbox
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initCriteria(UserSearch).with('roles,permissions');
    this.addSubscriptions();
  }

  protected addSubscriptions(): void {
    this.subscriptions.push(
      this.sb.usersMeta$.subscribe((meta: any) => {
        if (meta) {
          this.pagination = meta ? meta.pagination : null;
        }
      })
    );
  }

  protected list(): void {
    this.startLoading();
    this.sb.fetchUsers(this.criteria);
  }

  edit(user: User): void {
    this.sb.selectUser(user);
    this.showChildComponent(this.childComponents.editUser);
  }

  search() {
    this.setPage(1);
    if (this.searchText) {
      this.criteria.where('name', 'like', this.searchText);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    this.list();
  }

  onDelete() {
    if (this.selected.length > 0) {
      // do deletion stuff
    }
  }

  onCreated() {
    this.list();
    this.hideChildComponent(false);
  }
}
