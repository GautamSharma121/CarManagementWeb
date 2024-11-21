// src/app/directives/custom-validator.directive.ts
import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appCustomValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CustomValidatorDirective,
      multi: true,
    },
  ],
})
export class CustomValidatorDirective implements Validator {
  @Input('appCustomValidator') validationType!: string;

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.validationType === 'noSpecialChars') {
      const valid = /^[a-zA-Z0-9 ]*$/.test(control.value);
      return valid ? null : { noSpecialChars: true };
    }
    return null;
  }
}
