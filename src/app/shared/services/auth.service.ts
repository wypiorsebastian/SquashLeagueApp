import { Injectable } from '@angular/core';
import {map, ReplaySubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginRequest} from "../../auth/models/login-request";
import {SignupModel} from "../../auth/models/signup-model";
import {User} from "../../auth/models/user";
import {Role} from "../models/role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/Identity/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient,
              private router: Router) {
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

  signup(signupModel: SignupModel) {
    return this.httpClient.post<SignupModel>(this.baseUrl + 'Signup', signupModel);
  }

  setCurrentUser(user: User) {
    if (user) {
      user.roles = [];
      //const roles = this.getDecodedToken(user.token).roles;
      const roles = this.getDecodedToken(user.token).Role;
      Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.currentUserSource.next(user);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  getRoles() {
    return this.httpClient.get<Role[]>(this.baseUrl + "roles");
  }

  getCurrentUserRole(roleName: string): boolean {
    let roleExists;
    this.currentUser$.subscribe((user => {
      roleExists = user?.roles.find(x => x === roleName);
    }))
    return !!roleExists;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate(['/login']);

  }
}
