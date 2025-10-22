import { Component, Injector } from '@angular/core';
import { BaseComponent } from '@cartesianui/common';

@Component({
    selector: `app-users`,
    template: `<router-outlet></router-outlet>`,
    standalone: false
})
export class UserComponent extends BaseComponent {
  constructor() {
    super();
  }
}
