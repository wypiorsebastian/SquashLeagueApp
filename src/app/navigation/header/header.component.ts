import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {User} from "../../auth/models/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  userSubscription: Subscription;
  isAdmin: boolean = false;
  isLogged: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user =>
    {
      this.isLogged = !!user;
    });
    this.isAdmin = (this.authService.getCurrentUserRole('Admin') ? true : false);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
