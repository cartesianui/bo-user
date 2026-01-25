import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, POST, GET, Body, Criteria, DefaultHeaders, RequestCriteriaOuput, Path, DELETE, PATCH, PUT } from '@cartesianui/core';
import { User, UserPermission, UserRole } from './models';

@Injectable()
@DefaultHeaders({
  Accept: 'application/json',
  'Content-Type': 'application/json'
})
export class UserHttpService extends HttpService {
  /**
   * Fetch users list
   *
   * @param SearchForm form to filter api response
   */
  @GET('/users')
  public users(@Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @GET('/cartesian/users?roles[]=vendor')
  public vendors(@Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @GET('/cartesian/users?roles[]=customer')
  public customers(@Criteria criteria: RequestCriteriaOuput): Observable<any> {
    return null;
  }

  @GET('/users/{id}')
  public user(@Path('id') id: string): Observable<any> {
    return null;
  }

  @POST('/register')
  public createUser(@Body body: User): Observable<any> {
    return null;
  }

  @PATCH('/users/{id}?include=roles,permissions')
  public updateUser(@Path('id') id: string, @Body body: Partial<User>): Observable<any> {
    return null;
  }

  @PATCH('/users/{id}/password')
  public updateUserCredentials(@Path('id') id: string, @Body body: { currentPassword: string; newPassword: string }): Observable<any> {
    return null;
  }

  @DELETE('/users/{id}')
  public deleteUser(@Path('id') id: string): Observable<any> {
    return null;
  }

  @GET('/user/profile')
  public profile(@Body token: string): Observable<any> {
    return null;
  }

  @PATCH('/users/{id}/roles?include=roles,permissions')
  public assignRole(@Path('id') id: string, @Body body: UserRole): Observable<any> {
    return null;
  }

  @PUT('/users/{id}/roles?include=roles,permissions')
  public syncRole(@Path('id') id: string, @Body body: UserRole): Observable<any> {
    return null;
  }

  @DELETE('/users/{id}/roles?include=roles,permissions')
  public revokeRole(@Path('id') id: string, @Body body: UserRole): Observable<any> {
    return null;
  }

  @POST('/users/{id}/permissions?include=roles,permissions')
  public attachPermissions(@Path('id') id: string, @Body body: UserPermission): Observable<any> {
    return null;
  }

  @DELETE('/users/{id}/permissions?include=roles,permissions')
  public revokePermissions(@Path('id') id: string, @Body body: UserPermission): Observable<any> {
    return null;
  }
}
