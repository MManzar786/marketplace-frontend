import { ValidatorFn, AbstractControl } from '@angular/forms';
import { PASSWORD_MISMATCH_LABEL } from 'src/app/utils/constants';

export function passwordMatchValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const password = control.get(controlName)?.value;
    const confirmPassword = control.get(matchingControlName)?.value;

    if (password !== confirmPassword) {
      return { error: PASSWORD_MISMATCH_LABEL };
    }

    return null;
  };
}
