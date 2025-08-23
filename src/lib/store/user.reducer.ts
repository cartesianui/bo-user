import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { User } from '../models';
import { UserActions } from './user.actions';
import { EntityStateExtended, requestCompleted, requestDefault, requestFailed, requestStarted, updateMetaState } from '@cartesianui/common';

export const usersFeatureKey = 'users';

export interface UserState extends EntityStateExtended<User> {
  selected: User | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UserState = adapter.getInitialState({
  selected: null,
  meta: null,
  request: requestDefault,
  create: requestDefault,
  update: requestDefault,
  get: requestDefault,
  delete: requestDefault
});

export const reducer = createReducer(
  initialState,
  on(UserActions.createUser, (state, { user }) => {
    return { ...state, create: { ...requestStarted } };
  }),
  on(UserActions.createSuccess, (state, { user }) => {
    return { ...state, selected: user, create: { ...requestCompleted } };
  }),
  on(UserActions.createFailure, (state, { errors, message }) => {
    return { ...state, create: { ...requestFailed } };
  }),
  on(UserActions.updateSuccess, (state, { user }) => {
    return adapter.updateOne(
      { id: user.id, changes: { ...user } }, // 👈 replaces the entity
      { ...state, selected: user, update: { ...requestCompleted } }
    );
  }),
  on(UserActions.updateFailure, (state, { errors, message }) => {
    return { ...state, update: { ...requestFailed } };
  }),
  on(UserActions.selectUser, (state, { user }) => {
    return { ...state, selected: user };
  }),
  on(UserActions.addUser, (state, action) => adapter.addOne(action.user, state)),
  on(UserActions.upsertUser, (state, action) => adapter.upsertOne(action.user, state)),
  on(UserActions.addUsers, (state, action) => adapter.addMany(action.user, state)),
  on(UserActions.upsertUsers, (state, action) => adapter.upsertMany(action.user, state)),
  on(UserActions.updateUser, (state, action) => adapter.updateOne(action.user, state)),
  on(UserActions.updateUsers, (state, action) => adapter.updateMany(action.users, state)),
  on(UserActions.deleteUser, (state, action) => adapter.removeOne(action.id, { ...state, meta: { ...updateMetaState(state.meta, 'delete') } })),
  on(UserActions.deleteUsers, (state, action) => adapter.removeMany(action.ids, state)),
  on(UserActions.loadUsers, (state, action) => adapter.setAll(action.users, { ...state, meta: action.meta, request: { ...requestCompleted } })),
  on(UserActions.clearUsers, (state) => adapter.removeAll(state))
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState),
    meta: createSelector(selectUsersState, (state: UserState) => state.meta),
    selected: createSelector(selectUsersState, (state: UserState) => state.selected),
    request: createSelector(selectUsersState, (state: UserState) => state.request),
    create: createSelector(selectUsersState, (state: UserState) => state.create),
    update: createSelector(selectUsersState, (state: UserState) => state.update),
    entities: createSelector(selectUsersState, (state: UserState) => Object.values(state.entities))
  })
});

export const { selectIds, selectEntities, selectAll, selectTotal, meta, entities, create, selected } = usersFeature;
