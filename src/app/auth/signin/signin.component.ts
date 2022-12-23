import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../shared/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  someModel: any;
  loggedIn: boolean = false;
  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<SigninComponent>,
              private snackbar: MatSnackBar) {
  }

  onLogin(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(result => {
      this.someModel = result;
      this.loggedIn = true;
    }, error => {
      if (error?.status === 401)
        this.snackbar.open("Podano błędną nazwę użytkownika lub hasło", undefined, {duration: 3000});
      else this.snackbar.open("Błąd aplikacji: " + error?.status, undefined, {duration: 3000});
    })
  }

  onClose() {
    this.dialogRef.close();
  }
}

export function openLoginFormDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;

  const dialogRef = dialog.open(SigninComponent, config);
  return dialogRef.afterClosed();
}
