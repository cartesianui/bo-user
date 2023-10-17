import { ParentModel } from '@cartesianui/common';
import { Role } from '@cartesianui/bo-auth';

export interface IUser {
  id?: string | undefined;
  name: string | undefined;
  nickname?: string | undefined;
  birth?: string | undefined;
  email?: string | undefined;
  gender?: string | undefined;
  confirmed?: boolean | undefined;
  password?: string;
  logged?: boolean | undefined;
}

export class User extends ParentModel implements IUser {
  public id: string;
  public name: string;
  public nickname: string;
  public birth: string;
  public confirmed: boolean;
  public email: string;
  public gender: string;
  public logged: boolean;
  public roles: any; //Role[];
  public permissions: any;

  constructor(data?: IUser) {
    super(data);
  }
}
