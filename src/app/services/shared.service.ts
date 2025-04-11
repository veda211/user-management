import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddUserComponent } from '../add-user/add-user.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private dialog: MatDialog) {}

  openAddUserDialog(): Observable<User> {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '40%',
      height: '40%',
      panelClass: 'custom-dialog-container'
    });

    return dialogRef.afterClosed();
  }

  openEditUserDialog(user: User): Observable<User> {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      data: user
    });

    return dialogRef.afterClosed();
  }
  openConfirmDeleteDialog(message: string = 'Are you sure you want to delete this user?') {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: message
    });
  
    return dialogRef.afterClosed();
  }
}
