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
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    if (user) {
      user.roles = [];
      const roles = this.getDecodedToken(user.token).roles;
      Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.currentUserSource.next(user);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  getCurrentUserRole(roleName: string): boolean {
    let roleExists;
    this.currentUser$.subscribe(( user => {
      roleExists = user?.roles.find(x => x === roleName);
    }))
    return !!roleExists;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
