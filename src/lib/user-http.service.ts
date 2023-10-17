import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, POST, GET, Body, Criteria, DefaultHeaders, RequestCriteria, Path, DELETE, PATCH } from '@cartesianui/core';
import { User, UserSearch, UserPermission, UserRole } from './models';

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
  public users(@Criteria criteria: RequestCriteria<UserSearch>): Observable<any> {
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

  @POST('/roles/assign?include=roles,permissions')
  public assignRole(@Body body: UserRole): Observable<any> {
    return null;
  }

  @POST('/roles/revoke?include=roles,permissions')
  public revokeRole(@Body body: UserRole): Observable<any> {
    return null;
  }

  @PATCH('/users/{id}/permissions?include=roles,permissions')
  public attachPermissions(@Path('id') id: string, @Body body: UserPermission): Observable<any> {
    return null;
  }

  @DELETE('/users/{id}/permissions?include=roles,permissions')
  public revokePermissions(@Path('id') id: string, @Body body: UserPermission): Observable<any> {
    return null;
  }

  @POST('/roles/sync')
  public syncRole(@Body body: UserPermission): Observable<any> {
    return null;
  }
}
