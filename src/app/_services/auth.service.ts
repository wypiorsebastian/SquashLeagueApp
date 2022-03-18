  import { Injectable } from '@angular/core';
  import {HttpClient} from "@angular/common/http";
  import {LoginRequest} from "../auth/models/login-request";
  import {map} from "rxjs/operators";
  import {User} from "../auth/models/user";
  import {ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/Identity/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  login(loginRequest: LoginRequest) {
    return this.httpClient.post<User>(this.baseUrl + 'Signin', loginRequest).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
