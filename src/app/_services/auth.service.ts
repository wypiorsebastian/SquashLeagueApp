  import { Injectable } from '@angular/core';
  import {HttpClient} from "@angular/common/http";
  import {LoginRequest} from "../auth/models/login-request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/Identity/'

  constructor(private httpClient: HttpClient) {
  }

  login(loginRequest: LoginRequest) {
    return this.httpClient.post(this.baseUrl + 'Signin', loginRequest);
  }
}
