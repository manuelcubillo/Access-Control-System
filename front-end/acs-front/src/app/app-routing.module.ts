import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersViewComponent } from './users-view/users-view.component';
import { SchemaComponent } from './schema/schema.component';
import {CreateUserComponent} from './create-user/create-user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'users-view', component : UsersViewComponent },
  { path: 'create-user', component : CreateUserComponent },
  { path: 'schema', component : SchemaComponent },
  { path: 'detail/:id', component : UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
