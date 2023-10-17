import { Component, OnInit } from '@angular/core';
import { Injector, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@cartesianui/common';
import { Configuration, ConfigurationSandbox } from '@cartesianui/bo-configuration';

@Component({
  selector: 'user-configuration',
  templateUrl: './user-configuration.component.html'
})
export class UserConfigurationComponent extends BaseComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    timing: new FormGroup({
      timeZoneInfo: new FormGroup({
        iana: new FormGroup({
          timeZoneId: new FormControl('', Validators.required)
        })
      })
    }),
    clock: new FormGroup({
      provider: new FormControl('', Validators.required)
    })
  });

  loading: boolean;
  loaded: boolean;
  failed: boolean;
  configuration: Configuration;

  constructor(
    injector: Injector,
    protected _sandbox: ConfigurationSandbox
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.addSubscriptions();
    this.fetchConfiguration();
  }

  update() {
    const configurations = this.formGroup.value;
    const form = new Configuration({
      id: this.configuration.id,
      key: 'user',
      configuration: configurations
    });

    this._sandbox.updateConfiguration(form);
  }

  addSubscriptions() {
    // this.subscriptions.push(
    //   this._sandbox.configuration$.subscribe((configuration: any) => {
    //     if (configuration) {
    //       this.configuration = configuration;
    //       this.formGroup.reset();
    //       this.formGroup.patchValue(this.configuration.configuration);
    //     }
    //   })
    // );
  }

  fetchConfiguration() {
    this._sandbox.fetchConfigurationByType('user');
  }

  getFormClasses(controlName: string): string {
    const control = this.formGroup.controls[controlName];
    if (control.value === '') {
      return '';
    }
    if (control.valid) {
      return 'is-valid';
    } else if (control.dirty && control.touched) {
      return 'is-invalid';
    }
  }
}
