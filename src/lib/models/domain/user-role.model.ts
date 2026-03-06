import { BaseModel, EntityMeta } from '@cartesianui/common';

interface IUserRoles {
  id?: string | undefined;
  userId: string;
  roleIds: string[];
}

@EntityMeta({
  search: {
    id: { column: 'id', operator: '=', value: null },
    name: { column: 'name', operator: '=', value: null }
  }
})
export class UserRole extends BaseModel implements IUserRoles {
  id: string;
  userId: string;
  roleIds: string[];

  constructor(data?: IUserRoles) {
    super(data);
  }

}
