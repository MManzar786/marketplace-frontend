import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signin(email: string, password: string) {
    return this.http.post(`${environment.backendUrl}auth/login`, {
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
    return this.http.post(`${environment.backendUrl}auth/register`, {
      firstname: firstnamae,
      lastname: lastname,
      email: email,
      password: password,
    });
  }
}
