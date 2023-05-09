import { Injectable } from '@angular/core';
import { User } from './user';
import { USERLIST } from './mock-users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor() { }

  getUsers(): User[]{
    return USERLIST;
  }

  /**
   * return a user given a public id
   * @param id 
   * @returns 
   */
  getUser(id: string): Observable<User> {
    const usr = USERLIST.find(u=> u.id === id)!;
    return of(usr);
  }

  /**
   * update user public properties
   * @param usr 
   */
  saveUser(usr : User) : boolean {
    console.log(usr.id)
    let usr_pu = JSON.parse(usr.public_properties);
    console.log("data to save " + Object.values(usr_pu));
    
    let usr_aux = USERLIST.find(u=> u.id === usr.id)!;
    let usr_pu1 = JSON.parse(usr_aux.public_properties);
    console.log("data to update " + Object.values(usr_pu1));


    //update public properties of user list
    USERLIST.forEach(u=> {
      u.id === usr.id ? u.public_properties = usr.public_properties : u = u;
    });

  
    let usr_aux_3 = USERLIST.find(u=> u.id === usr.id)!;
    let usr_pu3 = JSON.parse(usr_aux_3.public_properties);
    console.log("final value: " + Object.values(usr_pu3));
    //TODO SEND UPDATE TO AWS
    return true; //check if there is not any error
  }

  /**
   * remove a user from the system
   * @param usr 
   * @returns 
   */
  deleteUser(usr : User) : boolean{
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
