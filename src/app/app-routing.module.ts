import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserMangementComponent } from './user-mangement/user-mangement.component';

const routes: Routes = [
  { path: '', component: UserMangementComponent },

  { path: 'adduser', component: AddUserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
