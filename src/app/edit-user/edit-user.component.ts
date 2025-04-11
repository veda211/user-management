import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { customEmailValidator } from '../helpers/validation';
import { User } from '../interface/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  userForm: FormGroup;
  roles: string[] = ['admin', 'user', 'editor'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.userForm = this.fb.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email, customEmailValidator()]], 
      role: [data.user.role, Validators.required]
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
