import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { IError, RequestCriteria } from '@cartesianui/core';
import { ResponseMeta } from '@cartesianui/common';
import { User, UserPermission, UserRole, UserSearch } from '../models';


export const UserActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load Users': props<{ users: User[]; meta: ResponseMeta }>(),
    'Add User': props<{ user: User }>(),
    'Upsert User': props<{ user: User }>(),
    'Add Users': props<{ user: User[] }>(),
    'Upsert Users': props<{ user: User[] }>(),
    'Update User': props<{ user: Update<User> }>(),
    'Update Users': props<{ users: Update<User>[] }>(),
    'Delete User': props<{ id: string }>(),
    'Delete Users': props<{ ids: string[] }>(),
    'Clear Users': emptyProps(),
    // Custom
    'Select User': props<{ user: User }>(),
    'Create User': props<{ user: User }>(),
    'Create Success': props<{ user: User }>(),
    'Create Failure': props<{ errors: IError; message: string }>(),
    'Update User Credentials': props<{ user: { id: string; changes: { currentPassword: string; newPassword: string } } }>(),
    'Update Success': props<{ user: User }>(),
    'Update Failure': props<{ errors: IError; message: string }>(),
    'Fetch Users': props<{ criteria: RequestCriteria<UserSearch> }>(),
    'Sync Roles': props<{ form: UserRole }>(),
    'Attach Roles': props<{ form: UserRole }>(),
    'Detach Roles': props<{ form: UserRole }>(),
    'Attach Permissions': props<{ id: string, form: UserPermission }>(),
    'Detach Permissions': props<{ id: string, form: UserPermission }>()
  }
});
