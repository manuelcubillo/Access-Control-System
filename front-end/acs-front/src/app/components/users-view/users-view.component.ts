import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserIfz } from '../../model/user/userIfz';
import { UserService } from '../../services/user.service';
import { USERLIST } from '../../mocks/mock-users';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Schema } from 'src/app/model/schema/schemaIfz';
import { SchemaService } from '../../services/schema.service';
import { AcsProp } from 'src/app/model/schema/acsProp';
import { type } from 'src/app/model/schema/acsPropIfz';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})

export class UsersViewComponent implements OnInit {

  usrList: UserIfz[] = [];
  usrListOriginal: UserIfz[] = [];
  mainSchema: Schema = { id: "0", name: "", properties: [["", new AcsProp(type.default)]] };
  schemaList: Schema[] = [];
  schemaListNames: string[] = [];
  searchValue = '';
  visible: boolean = false;
  type = type;

  constructor(
    private location: Location,
    private userService: UserService,
    private schemaService: SchemaService,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.usrList = this.userService.getUsers();
    this.usrListOriginal = this.usrList;
    this.schemaList = this.schemaService.getSchemasList();
    this.mainSchema = this.schemaService.getUniversalSchema(this.schemaList);
    this.loadSchemaListNames()

  }

  /**
   * return the propertie value of a user for a given column
   * @param usr 
   * @param prop 
   * @returns 
   */
  getUserProp(usr: UserIfz, prop: [string, AcsProp]): any {
    for (let p of usr.properties) {
      if (p[0] == prop[0]) {
        return p[1];
      }
    }
    return "-"; //in case of error
  }

  /**
   * return true if the user is from the main schema or if the main schema is the universal schema
   * @param user 
   * @returns 
   */
  isMySchema(user: UserIfz): boolean {
    return user.schema_id == this.mainSchema.id || this.mainSchema.id == "0";
  }




  navigate_user_details(usr: UserIfz): void {
    console.log("navigate to user details");
    console.log(usr);
    this.router.navigate(['/detail/' + usr.id])
  }


  search(): void {
    console.log("in search method. search value: " + this.searchValue);
    this.usrList = this.usrListOriginal; //reset the list to original
    if (this.searchValue === '') {
      this.restoreSearch()
    } else {
      // for each row, try to find the value
      // search value must match with the table value
      this.usrList = this.usrList.filter(i => {
        let flag = false;
        for (let v of i.properties) {
          if (this.comparator(v[1], this.searchValue)) {
            flag = true;
          }
        }
        console.log("rv: " + flag);
        return flag;
      });
    }

  }

  // define the condition to confirm that the table value match with the search value
  comparator(value: any, key: String): boolean {
    let flag: boolean = false;

    // if it's the exact value, true
    if (value === key)
      flag = true;

    // transform the value to try to match with search value
    let valueString: String = (value as unknown) as String;

    try {
      if (valueString !== undefined) { //if casting success
        flag = valueString.toLowerCase().includes(this.searchValue.toLowerCase())
      }
    }catch{
      //nothin to do
    }

      return flag;
  }

  restoreSearch(): void {
    this.searchValue = '';
    this.usrList = this.usrListOriginal;
  }

  schemaChangeEvent(index: number): void {
    console.log(this.schemaList[index]);
    this.mainSchema = this.schemaList[index];
  }


  /**
   * load the schemaListNames with all unique values from all schemas
   * and also a "All" option to select all schemas
   */
  loadSchemaListNames(): void {
    //add all options to the schemaListNames

    //remove schema with All as name. And reload it again
    this.schemaList = this.schemaList.filter(s => s.name != "All");

    let completeSchema = this.schemaService.getUniversalSchema(this.schemaList);
    this.schemaList.reverse();
    this.schemaList.push(completeSchema);
    this.schemaList.reverse();

    let schemaNames = this.schemaList.map(s => s.name);
    for (let name of schemaNames) {
      if (!this.schemaListNames.includes(name)) {
        this.schemaListNames.push(name);
      }
    }
  }


}
