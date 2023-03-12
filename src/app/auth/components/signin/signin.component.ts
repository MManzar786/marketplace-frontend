import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      let credentials: CredentialI = {
        email: this.fc['email'].value,
        password: this.fc['password'].value,
      };
      this.store.dispatch(AuthActions.loginRequest({ credentials }));
    }
  }

  onChangeInput(inputField: string) {
    if (this.fc[inputField].hasError('required')) {
      this.fc[inputField].setErrors({
        error: `${
          inputField.split('')[0].toUpperCase() +
          inputField.split('').slice(1).join('')
        } is Required `,
      });
    } else if (this.fc[inputField].hasError('email')) {
      this.fc[inputField].setErrors({
        error: `${
          inputField.split('')[0].toUpperCase() +
          inputField.split('').slice(1).join('')
        } is  Incorrect `,
      });
    } else if (this.fc[inputField].hasError('minlength')) {
      this.fc[inputField].setErrors({
        error: `${
          inputField.split('')[0].toUpperCase() +
          inputField.split('').slice(1).join('')
        } must have min 8 Characters `,
      });
    }
  }

  get fc() {
    return this.signInForm.controls;
  }
}

interface CredentialI {
  email: string;
  password: string;
}
