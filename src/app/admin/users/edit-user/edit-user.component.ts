import { Component, OnInit } from '@angular/core';
import {User} from "../../../_models/user";
import {UsersService} from "../../../_services/users.service";
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Role} from "../../../_models/role";
import {AuthService} from "../../../_services/auth.service";
import {filter, tap} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  userId: string;
  userEditForm: FormGroup;
  appRoles: Role[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getRoles();
    this.initForm();

    this.activatedRoute.params
      .subscribe((
        (params: Params) => {
          this.userId = params['id'];
          this.GetUser();
        }
      ))
  }

  getRoles() {
    this.authService.getRoles()
      .subscribe(data => {
      this.appRoles = data;
    });
  }

  private GetUser() {
    this.userService.getUser(this.userId).subscribe(
      data => {
        this.user = data;
        this.checkInUserRole();
        this.initForm();
      },
      error => console.log(error));
  }

  private initForm() {
    let wholeRoles = new FormArray([]);
    let username = this.user ? this.user.username : '';
    let firstName = this.user ? this.user.firstName : '';
    let lastName = this.user ? this.user.lastName : '';
    let email = this.user ? this.user.email : '';
    let phone = this.user ? this.user.phoneNumber : '';

    this.userEditForm = new FormGroup({
      'username': new FormControl(username),
      'firstName': new FormControl(firstName),
      'lastName': new FormControl(lastName),
      'email': new FormControl(email),
      'phone': new FormControl(phone),
      'userRoles': wholeRoles
    });

    for (let appRole in this.appRoles) {
      wholeRoles.push(
        new FormGroup({
          'appRole': new FormControl(this.checkRole(this.appRoles[appRole].id)),
          'appRoleId': new FormControl(this.appRoles[appRole].id)
        })
      );
    }
  }
  saveChanges() {
    //console.log(this.userEditForm.value);
    this.userService.updateUser(this.userEditForm.value).subscribe();
  }

  checkInUserRole() {
    this.appRoles.forEach(x => {
      console.log(this.user.roles.find(y => y.roleId == x.id));
    });
  }

  checkRole(roleId: string) {
    return !!this.user.roles.find(y => y.roleId == roleId)
  }

  get controls() { // a getter!
    return (<FormArray>this.userEditForm.get('userRoles')).controls;
  }

}
