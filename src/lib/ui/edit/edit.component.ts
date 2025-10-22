import { Component, inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent, DatetimeService } from '@cartesianui/common';
import { Role, Permission, PermissionsWidgetComponent, RolesLookupWidgetComponent, PermissionsLookupWidgetComponent, RolesWidgetComponent } from '@cartesianui/admin-auth';
import { User, UserPermission, UserRole } from '../../models';
import { UserSandbox } from '../../user.sandbox';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { FORM_IMPORTS } from '../../user.imports';

@Component({
    selector: 'edit-user',
    templateUrl: './edit.component.html',
    imports: [
      ...FORM_IMPORTS,
      PermissionsWidgetComponent,
      PermissionsLookupWidgetComponent,
      RolesWidgetComponent,
      RolesLookupWidgetComponent, 
    ],
    standalone: true
})
export class EditUserComponent extends BaseComponent implements OnInit, OnDestroy {

  protected sb = inject(UserSandbox);

  user: User;

  rolesToRevoke: Role[] = [];
  rolesToAttach: Role[] = [];

  permissionsToAttach: Permission[] = [];
  permissionsToRevoke: Permission[] = [];

  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', []),
    gender: new FormControl('Gender', []),
    birth: new FormControl('', [])
  });

  formGroupCredentails: FormGroup = new FormGroup({
    currentPassword: new FormControl('', []),
    newPassword: new FormControl('', []),
    confirmPassword: new FormControl('', [])
  });

  activeTab: string = "General";

  ngOnInit(): void {
    this.addSubscriptions();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this.sb.selectedUser$.subscribe((user: User) => {
        if (!user) return;
        this.user = { ...user, birth: DatetimeService.toJSDate(user.birth) } as User;
        this.formGroup.patchValue(this.user);
      })
    );
  }

  onUpdate() {
    if (this.formGroup.dirty && this.formGroup.valid) {
      this.sb.updateUser(
        this.user.id,
        new User({
          name: this.formGroup.controls.name.value,
          gender: this.formGroup.controls.gender.value,
          birth: DatetimeService.fromJSDate(new Date(this.formGroup.controls.birth.value)).toISO()
        })
      );
    }

    if (this.formGroupCredentails.dirty && this.formGroupCredentails.valid) {
      this.sb.updateUserCredentials(this.user.id, {
        currentPassword: this.formGroupCredentails.controls.currentPassword.value,
        newPassword: this.formGroupCredentails.controls.newPassword.value
      });
    }
  }

  onRevoke() {
    const roleIds = this.rolesToRevoke.map((role) => role.id);
    const form = new UserRole({
      userId: this.user.id,
      roleIds
    });
    this.sb.detachRoles(this.user.id, form);
    this.rolesToRevoke = [];
  }

  onAttach() {
    const roleIds = this.rolesToAttach.map((role) => role.id);
    const form = new UserRole({
      userId: this.user.id,
      roleIds
    });
    this.sb.attachRoles(this.user.id, form);
    this.rolesToAttach = [];
  }

  onRevokePermissions() {
    const permissionIds = this.permissionsToRevoke.map((permission) => permission.id);
    const form = new UserPermission({
      userId: this.user.id,
      permissionIds
    });
    this.sb.detachPermissions(this.user.id, form);
    this.permissionsToRevoke = [];
  }

  onAttachPermissions() {
    const permissionIds = this.permissionsToAttach.map((permission) => permission.id);
    const form = new UserPermission({
      userId: this.user.id,
      permissionIds
    });
    this.sb.attachPermissions(this.user.id, form);
    this.permissionsToAttach = [];
  }

  onSelectTab(data: TabDirective): void {
    this.activeTab = data.heading;
  }
}
