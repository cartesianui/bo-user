import { BaseModel, EntityMeta } from '@cartesianui/common';
import { Validators } from '@angular/forms';
import { Role } from '@cartesianui/system-auth';

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

@EntityMeta({
  list: [
    { key: 'name', label: 'Name', opt: { link: true } },
    { key: 'email', label: 'Email', opt: {} },
  ],
  form: [
    { key: 'name', label: 'Name', opt: { validators: [Validators.required, Validators.maxLength(255)] } },
    { key: 'email', label: 'Email', opt: { validators: [Validators.required, Validators.email] } },
    { key: 'gender', label: 'Gender', opt: {} },
    { key: 'birth', label: 'Birth Date', opt: { formatter: { type: 'date' } } },
    { key: 'password', label: 'Password', opt: { validators: [Validators.minLength(8)] } },
    { key: 'confirmPassword', label: 'Confirm Password', opt: {} },
  ],
  search: [
    'name:like',
    'email'
  ]
})
export class User extends BaseModel implements IUser {
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
