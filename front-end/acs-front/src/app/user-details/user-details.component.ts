import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { USERLIST } from '../mock-users';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserService } from '../user.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit{

  user : User = USERLIST[0]; //user example
  headers : string[] = [];
  userValues : string[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private message: NzMessageService,
    private modal: NzModalService
  ) {}


  ngOnInit(): void {
    this.getUser();
    
    //get fields to edit
    let obj = JSON.parse(this.user.public_properties);
    this.headers = Object.keys(obj);

    //fill with values
    this.userValues = Object.values(obj);
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
    let usr = this.buildObj();
    let res = this.userService.saveUser(usr);
    if(res){
      this.message.create("success", 'User data saved!');
      this.goBack();
    }else{
      this.message.create("error", 'Ups, something went wrong. Imposible to save');
    }
  }

  deleteUser(): boolean {
    let usr = this.buildObj();
    let res = this.userService.deleteUser(usr);
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
        if(this.deleteUser())
        console.log("nada");
          //this.goBack();
      }
    });
  }


  /**
   * build an User object with the data form
   * @returns 
   */
  buildObj(): User {
    let usr : User = {
      id: this.user.id,
      schema_id: this.user.schema_id, //todo redo this
      properties: this.user.properties,//todo redo this
      public_properties: '',
      private_properties: this.user.private_properties
    };

    type arg = {[key: string] : string}

    let publicProp : arg = {}
    let i = 0;
    for (let header of this.headers){
      publicProp[header] = this.userValues[i];
      i++;
    }
    usr.public_properties = JSON.stringify(publicProp);

    return usr;
  }

}
