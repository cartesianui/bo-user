import { Injectable } from '@angular/core';
import { WhereItem } from '@cartesianui/core';

@Injectable()
export class RoleSearch {
  id: WhereItem = { column: 'id', operator: '=', value: null };
  name: WhereItem = { column: 'name', operator: '=', value: null };
}
