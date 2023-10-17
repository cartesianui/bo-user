import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IAxisResponse } from '@cartesianui/core';
import { UserHttpService } from '../user-http.service';
import { UserActions } from './user.actions';


@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private httpService: UserHttpService
  ) {}

  fetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.fetchUsers),
      map(({ criteria }) => criteria),
      switchMap((criteria) => {
        return this.httpService.users(criteria).pipe(
          map(({ data, meta }: IAxisResponse) => UserActions.loadUsers({ users: data, meta }))
          //catchError((error) => of(userActions.doFetchUsersFail()))
        );
      })
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      map(({ user }) => user),
      switchMap((user) => {
        return this.httpService.createUser(user).pipe(
          map(({ data }: IAxisResponse) =>
            UserActions.createSuccess({
              user: data
            })
          ),
          catchError(({ errors, message }: IAxisResponse) => of(UserActions.createFailure({ errors, message })))
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      map(({ user }) => user),
      switchMap(({ id, changes }) => {
        return this.httpService.updateUser(id as string, changes).pipe(
          map(({ data }: IAxisResponse) =>
            UserActions.updateSuccess({
              user: data
            })
          ),
          catchError(({ errors, message }: IAxisResponse) => of(UserActions.updateFailure({ errors, message })))
        );
      })
    )
  );

  updateUserCredentails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserCredentials),
      map(({ user }) => user),
      switchMap(({ id, changes }) => {
        return this.httpService.updateUserCredentials(id as string, changes);
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      map(({ id }) => id),
      switchMap((id) => {
        return this.httpService.deleteUser(id);
      })
    )
  );

  attachRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.attachRoles),
      map(({ form }) => form),
      switchMap((form) =>
        this.httpService.assignRole(form).pipe(
          switchMap(({ data }: IAxisResponse) => of(UserActions.updateUser({ user: data }), UserActions.updateSuccess({ user: data }))),
          catchError(({ errors, message }: IAxisResponse) => of(UserActions.updateFailure({ errors, message })))
        )
      )
    )
  );

  detachRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.detachRoles),
      map(({ form }) => form),
      switchMap((form) =>
        this.httpService.revokeRole(form).pipe(
          switchMap(({ data }: IAxisResponse) => of(UserActions.updateUser({ user: data }), UserActions.updateSuccess({ user: data }))),
          catchError(({ errors, message }: IAxisResponse) => of(UserActions.updateFailure({ errors, message })))
        )
      )
    )
  );

  attachPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.attachPermissions),
      map((payload) => payload),
      switchMap(({ id, form }) =>
        this.httpService.attachPermissions(id, form).pipe(
          switchMap(({ data }: IAxisResponse) => of(UserActions.updateUser({ user: data }), UserActions.updateSuccess({ user: data }))),
          catchError(({ errors, message }: IAxisResponse) => of(UserActions.updateFailure({ errors, message })))
        )
      )
    )
  );

  detachPermission$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.detachPermissions),
      map((payload) => payload),
      switchMap(({ id, form }) =>
        this.httpService.revokePermissions(id, form).pipe(
          switchMap(({ data }: IAxisResponse) => of(UserActions.updateUser({ user: data }), UserActions.updateSuccess({ user: data }))),
          catchError(({ errors, message }: IAxisResponse) => of(UserActions.updateFailure({ errors, message })))
        )
      )
    )
  );
}
