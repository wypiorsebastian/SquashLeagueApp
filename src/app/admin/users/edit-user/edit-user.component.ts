import { Component, OnInit } from '@angular/core';
import {User} from "../../../_models/user";
import {UsersService} from "../../../_services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  userId: string;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'],
    this.userService.getUser(this.userId).subscribe(
      data => this.user = data,
      error => console.log(error));
  }

}
