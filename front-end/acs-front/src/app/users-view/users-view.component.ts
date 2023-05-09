import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { User } from '../user';
import { UserService } from '../user.service';
import { USERLIST } from '../mock-users';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})

export class UsersViewComponent implements OnInit{

  headers : string[] = [];
  tableValues : unknown[][] = [];
  usrList : User[] = [];

  searchValue = '';

  constructor(
    private location: Location,
    private userService: UserService,
    public router: Router
  ){}

  ngOnInit(): void {
    //get headers
    this.usrList = this.userService.getUsers();
    let publicProp =  this.usrList[0].public_properties; //get first row as a example to get the headers
    let obj = JSON.parse(publicProp);
    this.headers = Object.keys(obj);

    //get table values
    this.loadTableValues();
  
  }

  loadTableValues(): void {
    this.tableValues.splice(0); //clear arraylist

    //get table values
    for(let usr of this.usrList){
      let obj = JSON.parse(usr.public_properties);
      let usrValues = Object.values(obj);
      this.tableValues.push(usrValues);
    }
  }

  navigate_user_details(i:number):void {
    let id = this.usrList[i].id;
    this.router.navigate(['/detail/'+ id])
  }

  search() : void {
    if(this.searchValue === ''){
      this.restoreSearch()
    } else {
      // for each row, try to find the value
      // search value must match with the table value
      this.tableValues = this.tableValues.filter(i => {
        if(i.find(v => this.comparator(v, this.searchValue)) !== undefined){
          return true;
        }
        return false;
      });
    }
  }

  // define the condition to confirm that the table value match with the search value
  comparator(value : any, key : String) : boolean {
    let flag : boolean = false;
    
    // if it's the exact value, true
    if(value === key)
      flag = true;

    // transform the value to try to match with search value
    let valueString = (value as unknown) as String;

    if(valueString !== undefined){ //if casting success
      flag = value.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    
    return flag;
  }

  restoreSearch(): void {
    this.searchValue = '';
    this.loadTableValues();
  }

}
