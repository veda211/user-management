import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { customEmailValidator } from '../helpers/validation';
import { StorageKeys } from '../interface/const';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {
  userForm: FormGroup;
  roles: string[] = ['admin', 'user'];

  constructor(private fb: FormBuilder,  private dialogRef: MatDialogRef<AddUserComponent> ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, customEmailValidator()]],
      role: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      const existingUsers = JSON.parse(localStorage.getItem(StorageKeys.Users) || '[]');
      existingUsers.push(user);
      localStorage.setItem(StorageKeys.Users, JSON.stringify(existingUsers));

      this.dialogRef.close();

      
      
    }
  }

}
