import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "./auth/models/user";
import {AuthService} from "./_services/auth.service";
import {AdminGuard} from "./_guards/admin.guard";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SquashLeagueApp';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  //ładuje usera z localstorage i ustawia ReplySubject tak
  //aby kazdy kto sie na niego subskrybuje mogl zauwazyc zmiane usera
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.authService.setCurrentUser(user);
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe(( user => {
      console.log(user);
    }))
  }
}
