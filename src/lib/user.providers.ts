import { EnvironmentProviders, importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserSandbox } from './user.sandbox';
import { fromUser, UserEffects } from './store';
import { UserHttpService } from './shared';

export function provideUserRoot(): EnvironmentProviders {
  return makeEnvironmentProviders([
    UserHttpService,
  ]);
}

export function provideUserFeature(): EnvironmentProviders {
  return makeEnvironmentProviders([
    importProvidersFrom(
      StoreModule.forFeature(fromUser.featureKey, fromUser.reducer),
      EffectsModule.forFeature([UserEffects]),
    ),
    UserSandbox,
    UserHttpService,
  ]);
}
