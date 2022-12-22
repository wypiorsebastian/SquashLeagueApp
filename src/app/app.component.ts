import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {openRegisterFormDialog} from "./auth/signup/signup.component";
import {openLoginFormDialog} from "./auth/signin/signin.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  @ViewChild('sidenav') sidenav;
  isHandset: boolean = false;

  constructor(private observer: BreakpointObserver,
              private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.sidenav.close();
    this.observer.observe(Breakpoints.Handset).subscribe((res) => {
      if (res.matches) {
        this.isHandset = true;
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.isHandset = false;
        this.sidenav.mode = 'side';
        this.sidenav.close();
      }
    })
  }
  title = 'SquashLeagueApp';

  registerOpen() {
    openRegisterFormDialog(this.dialog);
  }

  loginOpen() {
    openLoginFormDialog(this.dialog);
  }

  onToggle() {
    this.sidenav.toggle();
  }
}
