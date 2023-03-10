import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});
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
