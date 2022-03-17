import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  someModel: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(result => {
      this.someModel = result;
      console.log(this.someModel);
    })

  }
}
