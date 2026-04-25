import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@cartesianui/common';
import { Configuration, ConfigurationSandbox } from '@cartesianui/system-configuration';
import { FORM_IMPORTS } from '../../user.imports';

@Component({
    selector: 'user-configuration',
    templateUrl: './user-configuration.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [...FORM_IMPORTS],
    standalone: true
})
export class UserConfigurationComponent extends BaseComponent implements OnInit, OnDestroy {

  protected _sandbox = inject(ConfigurationSandbox);
  private _cdr = inject(ChangeDetectorRef);

  @Input() entityId?: string;

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

  configuration: Configuration | null = null;

  ngOnInit(): void {
    this.addSubscriptions();
    const id = this.entityId ?? cartesian.session?.userId?.toString();
    if (!id) return;
    this._sandbox.clear();
    this._sandbox.loadForEntity('users', id);
  }

  update(): void {
    if (!this.configuration?.id) return;
    this._sandbox.save(this.configuration.id, this.formGroup.value);
  }

  addSubscriptions(): void {
    this.subscriptions.push(
      this._sandbox.current$.subscribe((configuration) => {
        if (configuration) {
          this.configuration = configuration;
          this.formGroup.reset();
          this.formGroup.patchValue(configuration.configuration || {});
          this._cdr.markForCheck();
        }
      })
    );
  }

  // getFormClasses(controlName: string): string {
  //   const control = this.formGroup.controls[controlName];
  //   if (control.value === '') {
  //     return '';
  //   }
  //   if (control.valid) {
  //     return 'is-valid';
  //   } else if (control.dirty && control.touched) {
  //     return 'is-invalid';
  //   }
  // }
}
