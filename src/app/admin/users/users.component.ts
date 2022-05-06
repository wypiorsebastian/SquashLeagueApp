import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../_services/users.service";
import {UserForList} from "../../_models/user-for-list";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: UserForList[];
  dataSource = new MatTableDataSource<UserForList>();
  displayedColumns = ['username', 'firstName', 'lastName', 'phone', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource.data = this.users;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {console.log(error)}
    )};

  filterTable(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(element: UserForList) {
    this.router.navigate(['/admin/users', element.id, 'edit']);
  }
}
