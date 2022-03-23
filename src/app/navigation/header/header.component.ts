import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {User} from "../../auth/models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAdmin: boolean = false;



  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = (this.authService.getCurrentUserRole('Admin') ? true : false);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
