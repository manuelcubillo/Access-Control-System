import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Schema } from 'src/app/model/schema';
import { User } from 'src/app/model/user';
import { SchemaService } from 'src/app/services/schema.service';
import { UserService } from 'src/app/services/user.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-access-control-view',
  templateUrl: './access-control-view.component.html',
  styleUrls: ['./access-control-view.component.css']
})
export class AccessControlViewComponent implements OnInit, AfterViewInit {

  user: User = { id: "0", name: "", schema_id: "", private_properties: "", properties: [] };; //user example
  defaultPicture: string = 'https://www.w3schools.com/howto/img_avatar.png'; //user picture example
  selectedSchema!: Schema;
  schemaList: Schema[] = [];
  usrObs: Observable<User> | undefined;
  searchValue: string = '';
  @ViewChild("searchElement")
  searchElement!: ElementRef;
  idNotFound: String = '';
  showUserDetails: boolean = false;
  lastUsers: User[] = [];
  lastUsersSchema: Schema[] = [];

  constructor(
    private userService: UserService,
    private schemaService: SchemaService,
    private router: Router,
    private modal: NzModalService,
    private message: NzMessageService,
  ) {

  }

  ngOnInit(): void {
    this.schemaList = this.schemaService.getSchemasList();
  }

  // gives focus to search field
  ngAfterViewInit() {
    this.searchElement.nativeElement.focus();
  }

  /**
   * use userservice to find the user and return true if it is found otherwise false
   */
  search(): boolean {
    let allowed = false;
    let found = false;
    this.usrObs = this.userService.getUser(this.searchValue);

    this.usrObs.subscribe(usr => {
      this.user = usr;
    });

    if (this.user !== undefined) {
      found = true;
      allowed = this.checkAccess();
      if(allowed){
        this.accessAllowed();
        this.message.create("success", 'User accepted!');
      }
    } else {
      allowed = false;
      this.userNotFound();
    }

    if (!allowed && found) {
      this.accessDenied();
    }

    return allowed;
  }



  /**
   * check that the user is allowed
   * @returns 
   */
  private checkAccess() {
    let flag = true;
    return flag;
  }

  /**
     * thing to do when there is not user on db
     */
  userNotFound() {
    this.modal.error({
      nzTitle: 'User not found',
      nzContent: 'Please contact administrator. ID: ' + this.searchValue
    });
    this.setDefaultUser();
    this.idNotFound = this.searchValue;
  }
  /**
   * thing to do if the user is denied
   */
  private accessDenied() {
    this.showUserDetails = true;
    this.modal.warning({
      nzTitle: 'User not allowed',
      nzContent: 'Please contact administrator. ID: ' + this.searchValue
    });
    this.setDefaultUser();
  }

  /**
   * things to do if the user is allowed 
   */
  private accessAllowed() {
    this.searchValue = '';
    this.selectedSchema = this.getSchemaFromList(this.user.schema_id);
    this.lastUsers.push(this.user);
    this.lastUsersSchema.push(this.selectedSchema);
    this.showUserDetails = true;
  }

  setDefaultUser(): void {
    this.user = { id: "0", name: "", schema_id: "", private_properties: "", properties: [] };
    this.searchValue = '';
    this.searchElement.nativeElement.focus();
  }

  /**
   * return schema given an schema ID
   * @param schemaId 
   * @returns 
   */
  getSchemaFromList(schemaId: string): Schema {
    let schema: Schema = this.schemaList.find(s => s.id === schemaId)!;
    return schema;
  }

  /**
   * action called when user is clicked
   * details are showed
   * @param user 
   */
  displayUser(user: User): void {
    this.user = user;
    this.selectedSchema = this.getSchemaFromList(this.user.schema_id);
  }

}
