import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signin(email: string, password: string) {
    return this.http.post(`${environment.backendUrl}api/user/login`, {
      email,
      password,
    });
  }
}
