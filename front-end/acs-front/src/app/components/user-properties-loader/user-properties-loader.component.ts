import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { UserIfz } from '../../model/user/userIfz';
import { SchemaService } from '../../services/schema.service';
import { Schema } from '../../model/schema/schemaIfz';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Location } from '@angular/common';
import { ACS_PROP_TYPE, AcsPropIfz } from 'src/app/model/schema/acsPropIfz';
import { AcsProp } from 'src/app/model/schema/acsProp';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-properties-loader',
  templateUrl: './user-properties-loader.component.html',
  styleUrls: ['./user-properties-loader.component.css']
})
export class UserPropertiesLoaderComponent {

  //pass this arguments when it is initialized / called
  @Input() selectedSchema!: Schema;
  @Input() user!: UserIfz;

  userPhotoUrl?: string;
  loading = false;
  type = ACS_PROP_TYPE;
  flipo: string = "";


  constructor(
    private schemaService: SchemaService,
    private userService: UserService,
    private message: NzMessageService,
    private modal: NzModalService,
    private location: Location,
  ) { }


/*
* DEPRECATED!
* ATTETION TO USE!
*
  getUserProp(prop: AcsPropIfz): AcsPropIfz {
    //let rv = this.userService.getUserPropOfSchema(this.user, prop);
    //if (rv == null) {
    //  rv = "";
    //}
    for (let p of this.user.properties) {
      if (p.getPropName() == prop.getPropName()) {
        return p;
      }
    }

    return AcsProp.prototype.getDefault();
  }
  */

  // PHOTO FUNCTIONS
  handlePhoto(info: { file: NzUploadFile }): void {
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


}
