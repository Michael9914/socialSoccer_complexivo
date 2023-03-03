import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private URL = 'http://localhost:3500';

user : User;
private isUserLoggedIn;
public usserLogged:User;
token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.isUserLoggedIn = false;

  }

  signUpUser(user: any) {
    return this.http.post<any>(this.URL + '/signup', user)
    .pipe(map((res) => res));

  }

  signInUser(user: {}) {
    return this.http.post<any>(this.URL + '/signin', user)
    .pipe(map((res) => res));

  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  setUserLoggedIn(user:User) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));

  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }



}
