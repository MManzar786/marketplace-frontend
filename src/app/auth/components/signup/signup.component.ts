import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService
        .signup(
          this.signUpForm.controls['firstName'].value,
          this.signUpForm.controls['lastName'].value,
          this.signUpForm.controls['email'].value,
          this.signUpForm.controls['password'].value
        )
        .subscribe((res: any) => {
          if (res.success) {
            this.toastr.success('Registration Successfull');
          }
          (err: any) => {
            this.toastr.error('Registration Failed!');
          };
        });
    }
  }

  onChangeInput(inputField: string, controlTitle?: string) {
    if (this.fc[inputField].hasError('required')) {
      this.fc[inputField].setErrors({
        error: !controlTitle
          ? `${
              inputField.split('')[0].toUpperCase() +
              inputField.split('').slice(1).join('')
            } is Required `
          : controlTitle + ' is Required ',
      });
    } else if (this.fc[inputField].hasError('email')) {
      this.fc[inputField].setErrors({
        error: !controlTitle
          ? `${
              inputField.split('')[0].toUpperCase() +
              inputField.split('').slice(1).join('')
            } is  Incorrect `
          : controlTitle + ' is Incorrect',
      });
    } else if (this.fc[inputField].hasError('minlength')) {
      this.fc[inputField].setErrors({
        error: !controlTitle
          ? `${
              inputField.split('')[0].toUpperCase() +
              inputField.split('').slice(1).join('')
            } must have min 8 Characters `
          : controlTitle + ' must have min 8 Characters ',
      });
    } else if (this.fc['confirmPassword'].hasError('passwordMismatch')) {
      this.fc[inputField].setErrors({
        error: ` Passwords do not match.`,
      });
    }
  }

  get fc() {
    return this.signUpForm.controls;
  }
}
