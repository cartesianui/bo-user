import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBaseComponent } from '@cartesianui/common';
import { UserSandbox } from '../../user.sandbox';
import { User } from '../../models';

@Component({
  selector: 'create-user',
  templateUrl: './create.component.html'
})
export class CreateUserComponent extends FormBaseComponent<User> implements OnInit {
  constructor(
    injector: Injector,
    protected sb: UserSandbox
  ) {
    super(injector);
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
      this.sb.creationState$.subscribe(({ compeleted }) => {
        if (compeleted) {
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
