import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  someModel: any;
  loggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
  }

  onLogin(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(result => {
      this.someModel = result;
      this.loggedIn = true;
      console.log(this.someModel);
    }, error => console.log('Error came:' + error));
  }

  /*
  getCurrentUser() {
    this.authService.currentUser$.subscribe(( user => {
      console.log('sadasdasd' + user);
    }))
  }
  */
}
