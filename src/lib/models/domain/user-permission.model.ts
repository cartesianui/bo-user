import { ParentModel } from '@cartesianui/common';

interface IUserPermission {
  id?: string | undefined;
  userId: string;
  permissionIds: string[];
}

export class UserPermission extends ParentModel implements IUserPermission {
  id: string;
  userId: string;
  permissionIds: string[];

  constructor(data?: IUserPermission) {
    super(data);
  }

  static override get searchForm() {
    return {
      
    };
  }
}
