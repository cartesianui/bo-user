import { Component, inject, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBaseComponent } from '@cartesianui/common';
import { UserSandbox } from '../../user.sandbox';
import { User } from '../../models';
import { FORM_IMPORTS } from '../../user.imports';

@Component({
    selector: 'create-user',
    templateUrl: './create.component.html',
    imports: [...FORM_IMPORTS],
    standalone: true
})
export class CreateUserComponent extends FormBaseComponent<User> implements OnInit {

  protected sb = inject(UserSandbox);

  constructor() {
    super();
    this.formGroup = new FormGroup({
      name: new FormControl('', []),
      email: new FormControl('', []),
      password: new FormControl('', []),
      confirmPassword: new FormControl('', [])
    });
  }

  ngOnInit(): void {
    this.addSubscriptions();
  }

  addSubscriptions() {
    this.subscriptions.push(
      this.sb.createState$.subscribe(({ completed }) => {
        if (completed) {
          this.created.emit(true);
        }
      })
    );
  }

  save() {
    if (this.formGroup.valid) {
      const form = new User({
        name: this.formGroup.controls.name.value,
        email: this.formGroup.controls.email.value,
        password: this.formGroup.controls.password.value
      });
      this.sb.createUser(form);
    }
  }
}
