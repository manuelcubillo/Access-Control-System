import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersViewComponent } from './components/users-view/users-view.component';
import { SchemaComponent } from './components/schema/schema.component';
import {CreateUserComponent} from './components/create-user/create-user.component';

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
