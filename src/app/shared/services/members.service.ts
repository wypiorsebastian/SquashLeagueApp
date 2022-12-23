import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserForList} from "../models/user-for-list";
import {UserForUpdate} from "../models/user-for-update";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiBaseUrl + 'Members/';

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<UserForList[]>(this.baseUrl);
  }

  getUser(userId: string) {
    return this.httpClient.get<User>(this.baseUrl + userId);
  }

  updateUser(user: UserForUpdate, userId: string) {
    return this.httpClient.put(this.baseUrl + userId, user);
  }
}
