import { Component, Injector, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { ListingControlsComponent } from '@cartesianui/common';
import { UserSandbox } from '../user.sandbox';
import { IUser, User } from '../models';
import { LISTING_IMPORTS } from '../user.imports';
import { CreateUserComponent } from './create/create.component';
import { EditUserComponent } from './edit/edit.component';

const userChildComponents = {
  createUser: { id: 'createUser', title: 'Create User' },
  editUser: { id: 'editUser', title: 'Edit User' }
} as const;

type UserChildComponent = typeof userChildComponents;

@Component({
    templateUrl: 'users.component.html',
    imports: [
      ...LISTING_IMPORTS,
      CreateUserComponent,
      EditUserComponent
    ],
    standalone: true
})
export class UsersComponent extends ListingControlsComponent<IUser, UserChildComponent> implements OnInit, AfterViewInit, OnDestroy {
  override childComponents: UserChildComponent = userChildComponents;

  protected sb = inject(UserSandbox);

  ngOnInit(): void {
    this.initCriteria().with('roles,permissions');
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
    this.sb.getUsers(this.criteria.httpParams());
  }

  edit(user: User): void {
    this.sb.selectUser(user);
    this.showChildComponent(this.childComponents.editUser, 'editUser');
  }

  search() {
    this.setPage(1);
    if (this.searchText) {
      this.criteria.where('name', 'like', this.searchText);
    } else {
      this.criteria.where('name', 'like', '');
    } // TODO: Remove where
    // this.list();
  }

  onDelete() {
    if (this.selected.length > 0) {
      // do deletion stuff
    }
  }
}
