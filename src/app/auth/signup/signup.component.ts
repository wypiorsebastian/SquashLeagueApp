import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<SignupComponent>,
              private breakpointObserver: BreakpointObserver) {
  }
  ngOnInit(): void {

    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Web
    ])
      .subscribe(console.log);

    this.initForm();
  }

  onClose() {
    this.dialogRef.close();
  }

  onSignup() {

  }

  initForm() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email),
      'phoneNumber': new FormControl(null, Validators.minLength(9)),
      'password': new FormControl(null, Validators.required),
      'passwordConfirm': new FormControl(null, [Validators.required, this.matchValues('password')]),
      'agree': new FormControl(null, Validators.requiredTrue)
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : {isMatching: true}
    }
  }
}

export function openRegisterFormDialog(dialog: MatDialog) {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;

  const dialogRef = dialog.open(SignupComponent, config);
  return dialogRef.afterClosed();
}
