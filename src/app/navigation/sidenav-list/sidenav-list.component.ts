import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
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
    });
    this.isAdmin = (this.authService.getCurrentUserRole('admin/users') ? true : false);
  }

  logoutUser() {
    this.authService.logout();
  }

  onCloseNavbar() {
    this.sidenavToggle.emit();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  navigateToAdminUsers() {
    this.router.navigate(['']);
  }
}
