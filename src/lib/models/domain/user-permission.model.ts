import { ParentModel } from '@cartesianui/common';

interface IUserPermission {
  id?: string | undefined;
  userId: string;
  permissionsIds: string[];
}

export class UserPermission extends ParentModel implements IUserPermission {
  id: string;
  userId: string;
  permissionsIds: string[];

  constructor(data?: IUserPermission) {
    super(data);
  }
}
