import { Component } from '@angular/core';
import { SchemaService } from '../../services/schema.service';
import { Schema } from '../../model/schema';
import { NzMessageService } from 'ng-zorro-antd/message'; 
import { NzModalService } from 'ng-zorro-antd/modal'; 
import {NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { User } from '../../model/user';
import { Location } from '@angular/common';
import { UserPropertiesLoaderComponent } from '../user-properties-loader/user-properties-loader.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

/**
 * allow create new users. Uses a common component call user propertie loader to show and allow edit user properties.
 * This component send to user service the user object created.
 */
export class CreateUserComponent {

  schemaList: Schema[] = []; 
  selectedSchema: Schema = {id: "0", name: "", properties: [["",""]]};;
  showSchemaFields: boolean = false; //show or hide new schema option
  user: User = {id: "0", name:"", schema_id: "", private_properties: "", properties: []};


  constructor(
    private schemaService: SchemaService,
    private userService: UserService,
    private message: NzMessageService,
    private modal: NzModalService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.schemaList = this.schemaService.getSchemasList();
  }


  showSchema(): void {
    console.log("selected schema: " + (this.selectedSchema as Schema).name);
    // create user object empty
    this.user.schema_id = (this.selectedSchema as Schema).id;
    for(let prop of (this.selectedSchema as Schema).properties){
      this.user.properties.push([prop[0],""]);
    }
    this.showSchemaFields = true;  
  }

  
  saveUser(): void {
    console.log(this.user);
    let res = this.userService.createNewUser(this.user);
    if(res){
      this.message.create("success", 'User created!');
    }else{
      this.message.create("error", 'Error creating new user!');
    }
  }
  
  goBack(): void {
    this.location.back();
  }

}
