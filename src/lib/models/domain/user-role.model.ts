import { ParentModel } from '@cartesianui/common';

interface IUserRoles {
  id?: string | undefined;
  userId: string;
  rolesIds: string[];
}

export class UserRole extends ParentModel implements IUserRoles {
  id: string;
  userId: string;
  rolesIds: string[];

  constructor(data?: IUserRoles) {
    super(data);
  }
}
