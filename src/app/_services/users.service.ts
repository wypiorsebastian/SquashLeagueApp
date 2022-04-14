import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserForList} from "../_models/user-for-list";
import {User} from "../_models/user";

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.apiBaseUrl + 'Users/';

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<UserForList[]>(this.baseUrl);
  }

  getUser(userId: string) {
    return this.httpClient.get<User>(this.baseUrl + userId);
  }
}
