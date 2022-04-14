import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminGuard} from "./_guards/admin.guard";
import {UsersComponent} from "./admin/users/users.component";
import {EditUserComponent} from "./admin/users/edit-user/edit-user.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      {path: 'users', component: UsersComponent},
      {path: 'users/:id/edit', component: EditUserComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
