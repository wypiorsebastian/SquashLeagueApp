import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import {MaterialModule} from "../shared/material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        FormsModule
    ]
})
export class AuthModule { }
