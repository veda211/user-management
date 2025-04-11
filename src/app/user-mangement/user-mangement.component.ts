import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../interface/user';
import { SharedService } from '../services/shared.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatPaginator } from '@angular/material/paginator';
import { StorageKeys } from '../interface/const';

@Component({
  selector: 'app-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.css']
})
export class UserMangementComponent implements OnInit {
  users: { name: string; email: string; role: string }[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  displayedColumns: string[] = ['name', 'email', 'role','edit', 'action'];
  editing: { rowIndex: number, field: 'name' | 'email' } | null = null;

  constructor(private router:Router,private sharedservice:SharedService, private dialog: MatDialog,
  ) {}

  ngOnInit() {
   this.loadUsers();
   this.dataSource.filterPredicate = (data, filter) => {
    const search = filter.trim().toLowerCase();
    return data.name.toLowerCase().includes(search) || data.email.toLowerCase().includes(search);
  };
  }
  sortOptions = [
    { value: 'nameAsc', label: 'Name (A-Z)' },
    { value: 'nameDesc', label: 'Name (Z-A)' },
    { value: 'emailAsc', label: 'Email (A-Z)' },
    { value: 'emailDesc', label: 'Email (Z-A)' }
  ];
  // applyFilter is called whenever a user types into the search input.
  // It updates the filter of the dataSource based on the search input.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  deleteUser(index: number) {
    this.sharedservice.openConfirmDeleteDialog().subscribe(result => {
      if (result === true) {
        this.users.splice(index, 1);
        localStorage.setItem(StorageKeys.Users, JSON.stringify(this.users));
        this.dataSource.data = [...this.users];
      }
    });
  }
  
  loadUsers() {
  const users = JSON.parse(localStorage.getItem(StorageKeys.Users) || '[]');
    this.users = users;
    this.dataSource.data = users; 
    }
 
  openAddUserDialog(): void {
    this.sharedservice.openAddUserDialog().subscribe(result => {
      this.loadUsers();
       });
  }
   sortUsers(option: string) {
    const compareFn = (a: User, b: User, key: keyof User, asc: boolean): number => {
      const valueA = a[key].toLowerCase();
      const valueB = b[key].toLowerCase();
      return asc ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    };
  
    switch (option) {
      case 'nameAsc':
        this.users.sort((a, b) => compareFn(a, b, 'name', true));
        break;
      case 'nameDesc':
        this.users.sort((a, b) => compareFn(a, b, 'name', false));
        break;
      case 'emailAsc':
        this.users.sort((a, b) => compareFn(a, b, 'email', true));
        break;
      case 'emailDesc':
        this.users.sort((a, b) => compareFn(a, b, 'email', false));
        break;
    }
  
    this.dataSource.data = [...this.users];
  }
  openEditDialog(user: User, index: number): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.users[index] = result;

        localStorage.setItem(StorageKeys.Users, JSON.stringify(this.users));

        this.loadUsers();
      }
    });
}
}