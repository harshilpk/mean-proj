import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
      console.log(response);
    })
  }
}
