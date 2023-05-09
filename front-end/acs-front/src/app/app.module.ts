import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UsersViewComponent } from './users-view/users-view.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerI18nInterface } from 'ng-zorro-antd/i18n';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { SchemaComponent } from './schema/schema.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserPropertiesLoaderComponent } from './user-properties-loader/user-properties-loader.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    UsersViewComponent,
    UserDetailsComponent,
    SchemaComponent,
    CreateUserComponent,
    UserPropertiesLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzFormModule,
    NzButtonModule,
    NzTypographyModule,
    NzSpaceModule,
    NzDividerModule,
    NzMessageModule,
    NzModalModule,
    NzSelectModule,
    NzUploadModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzCheckboxModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
