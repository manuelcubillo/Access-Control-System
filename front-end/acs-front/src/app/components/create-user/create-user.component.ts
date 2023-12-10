import { Component } from '@angular/core';
import { SchemaService } from '../../services/schema.service';
import { Schema } from '../../model/schema/schemaIfz';
import { NzMessageService } from 'ng-zorro-antd/message'; 
import { NzModalService } from 'ng-zorro-antd/modal'; 
import {NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { UserIfz } from '../../model/user/userIfz';
import { Location } from '@angular/common';
import { UserPropertiesLoaderComponent } from '../user-properties-loader/user-properties-loader.component';
import { UserService } from '../../services/user.service';
import { AcsProp } from 'src/app/model/schema/acsProp';
import { ACS_PROP_TYPE } from 'src/app/model/schema/acsPropIfz';

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
  selectedSchema: Schema = this.schemaService.getDefaultSchema();
  showSchemaFields: boolean = false; //show or hide new schema option
  user: UserIfz = this.userService.getDefaultUser();


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
    // create user object empty
    this.user.schema_id = (this.selectedSchema as Schema).id;
    this.user.properties = [];
    for(let prop of (this.selectedSchema as Schema).properties){
      this.user.properties.push(new AcsProp(prop.getPropName(),"", prop.getType()));
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
