import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromUser from './store/user.reducer';
import { UserEffects } from './store/user.effect';

import { UserHttpService } from './user-http.service';
import { UserSandbox } from './user.sandbox';

export function provideUserRoot(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
};
  
export function provideUserFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(
      // CommonModule,
      // FormsModule,
      // ReactiveFormsModule,
      // CartesianCommonModule,
    ),
    importProvidersFrom(
      EffectsModule.forFeature([UserEffects]),
      StoreModule.forFeature(fromUser.usersFeatureKey, fromUser.reducer),
    ),
    UserSandbox,
    UserHttpService,
  ]);
}