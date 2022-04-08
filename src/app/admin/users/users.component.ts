import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../_services/users.service";
import {UserForList} from "../../_models/user-for-list";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: UserForList[];
  dataSource = new MatTableDataSource<UserForList>();
  displayedColumns = ['username', 'firstName', 'lastName', 'phone'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
    this.dataSource.data = this.users;
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource.data = this.users;
        this.dataSource.sort = this.sort;
      },
      error => {"Error"}
    )};

  filterTable(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
