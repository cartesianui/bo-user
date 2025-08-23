import { ParentModel } from '@cartesianui/common';

interface IUserRoles {
  id?: string | undefined;
  userId: string;
  roleIds: string[];
}

export class UserRole extends ParentModel implements IUserRoles {
  id: string;
  userId: string;
  roleIds: string[];

  constructor(data?: IUserRoles) {
    super(data);
  }
}
