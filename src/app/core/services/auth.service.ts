import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ROLE_LABEL, TOKEN_LABEL } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient!: HttpClient;
  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }
  signin(email: string, password: string) {
    return this.httpClient.post(`${environment.backendUrl}auth/login`, {
      email,
      password,
    });
  }

  signup(
    firstnamae: string,
    lastname: string,
    email: string,
    password: string
  ) {
    return this.httpClient.post(`${environment.backendUrl}auth/register`, {
      firstname: firstnamae,
      lastname: lastname,
      email: email,
      password: password,
    });
  }
}
