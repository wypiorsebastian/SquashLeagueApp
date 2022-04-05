import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../_services/users.service";
import {UserForList} from "../../_models/user-for-list";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserForList[];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users)
      },
      error => {"Error"}
    )};
}
