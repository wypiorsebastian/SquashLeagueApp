import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {User} from "../../auth/models/user";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  userSubscription: Subscription;
  isAdmin: boolean = false;
  isLogged: boolean = false;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user =>
    {
      this.isLogged = !!user;
      this.isAdmin = (this.authService.getCurrentUserRole('Admin') ? true : false);
    });

  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logoutUser() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  navigateToAdminUsers() {
    this.router.navigate(['/admin/users']);
  }
}
