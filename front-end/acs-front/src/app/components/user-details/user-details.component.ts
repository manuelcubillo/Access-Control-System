import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { USERLIST } from '../../mocks/mock-users';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Schema } from 'src/app/model/schema';
import { SchemaService } from 'src/app/services/schema.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit{

  user : User = {id: "0", name:"", schema_id: "", private_properties: "", properties: []};; //user example
  selectedSchema!: Schema;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private message: NzMessageService,
    private modal: NzModalService,
    private schemaService: SchemaService
  ) {}


  ngOnInit(): void {
    this.getUser();
    this.getUserSchema();
    //init user properties empty
    for(let prop of (this.selectedSchema as Schema).properties){
      this.user.properties.push([prop[0],""]);
    }

  }

  getUserSchema(): void {
    this.selectedSchema = this.schemaService.getUserSchema(this.user.schema_id);
  }

  getUser(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    //let usr = this.buildObj();
    let res = this.userService.saveUser(this.user);
    if(res){
      this.message.create("success", 'User data saved!');
      this.goBack();
    }else{
      this.message.create("error", 'Ups, something went wrong. Imposible to save');
    }
  }

  deleteUser(): boolean {
    //let usr = this.buildObj();
    let res = this.userService.deleteUser(this.user);
    if(res){
      this.message.create("success", 'User removed!');
      this.goBack();
    }else{
      this.message.create("error", 'Ups, something went wrong. Imposible to delete');
    }
    return res;
  }

  deleteAction(): void {
    //ask for confirmation
    this.modal.confirm({
      nzTitle: 'Do you want to delete this user?',
      nzOnOk: () =>{
        this.deleteUser();
      }
    });
  }

}
