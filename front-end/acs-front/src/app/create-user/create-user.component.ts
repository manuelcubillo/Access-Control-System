import { Component } from '@angular/core';
import { SchemaService } from '../schema.service';
import { Schema } from '../schema';
import { NzMessageService } from 'ng-zorro-antd/message'; 
import { NzModalService } from 'ng-zorro-antd/modal'; 
import {NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { User } from '../user';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent {

  schemaList: Schema[] = []; 
  selectedSchema: Schema = {id: "0", name: "", properties: [["",""]]};;
  showSchemaFields: boolean = false; //show or hide new schema option
  user: User = {id: "0", schema_id: "", public_properties: "", private_properties: "", properties: []};


  //todo review this
  checked = false;
  date = null;
  userPhotoUrl?: string;
  loading = false;



  constructor(
    private schemaService: SchemaService,
    private message: NzMessageService,
    private modal: NzModalService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.schemaList = this.schemaService.getSchemasList();
  }

  getUserProp(prop: string[]): string[]{
    for(let p of this.user.properties){
      if(p[0] == prop[0]){
        return p;
      }
    }
    return ["",""]; //in case of error
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

  // PHOTO FUNCTIONS
  handlePhoto(info: { file: NzUploadFile } ): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.userPhotoUrl = img;
        });
        break;
      case 'error':
        this.message.error('Network error');
        this.loading = false;
        break;
    }
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.message.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.message.error('Image must smaller than 5MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }




  saveUser(): void {
    console.log(this.user);
    //todo redo copilot code
    let res = this.schemaService.saveSchema(this.selectedSchema);
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
