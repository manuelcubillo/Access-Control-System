import { Injectable } from '@angular/core';
import { UserIfz } from '../model/user/userIfz';
import { USERLIST } from '../mocks/mock-users';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { User } from '../model/user/user';
import { AcsPropIfz } from '../model/schema/acsPropIfz';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() { }

  getDefaultUser(): UserIfz {
    return User.prototype.getDefaultUser();
  }

  getUsers(): UserIfz[]{
    return USERLIST;
  }

  /**
   * return a user given a public id
   * @param id 
   * @returns 
   */
  getUser(id: string): Observable<UserIfz> {
    const usr = USERLIST.find(u=> u.id === id)!;
    return of(usr);
  }

  /**
   * ATTENTION TO USE!!!!
   * @param usr 
   * @param prop 
   * @returns 
   */
  getUserPropOfSchema(usr: UserIfz, prop: AcsPropIfz): any{
    for (let p of usr.properties) {
      if (p.getPropName() == prop.getPropName()) {
        return p.getPropValue();
      }
    }
    return null; //in case of error
  }
  /**
   * create a new user, add to the array and send to aws
   * @param usr 
   * @returns 
   */
  createNewUser(usr: UserIfz) : boolean{
    usr.id = uuid(); // assing id to user
    USERLIST.push(usr);
    console.log("user created: ");
    console.log(usr); 
    //TODO SEND new user TO AWS
    return true;
  }


  /**
   * update user object
   * @param usr 
   */
  saveUser(usr : UserIfz) : boolean {
    console.log("data to update ");
    console.log(usr);
    
    //update user list
    USERLIST.forEach(u=> {
      u.id === usr.id ? u = usr : u = u;
    });

    //TODO SEND UPDATE TO AWS
    return true; //check if there is not any error
  }

  /**
   * remove a user from the system
   * @param usr 
   * @returns 
   */
  deleteUser(usr : UserIfz) : boolean{
    //remove element from the list    
    const aux = USERLIST.filter( u=> u.id === usr.id)[0]
    const index: number = USERLIST.indexOf(aux);
    if (index !== -1) {
      USERLIST.splice(index, 1);
    }    
    //TODO SEND UPDATE TO AWS
    return true;
  }


}
