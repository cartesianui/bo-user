import { entityFeature } from '@cartesianui/common';
import { User } from '../../models';
import { UserActions } from './actions';

export const fromUser = entityFeature<User>('users', UserActions);
