import { AcsProp } from "../model/schema/acsProp";
import { ACS_PROP_TYPE } from "../model/schema/acsPropIfz";
import { User } from "../model/user/user";
import { UserIfz} from "../model/user/userIfz";

/*
export const USERLIST: User[] = [
{id: '1', schema_id: "carnet",   name:"Manu",  properties:[["Name","Manu"],["Tlf",123456789], ["Allowed",true], ["Img",""], ["Date", 1685122369000]], private_properties:''},
{id: '2', schema_id: "carnet",   name:"Cris",  properties:[["Name","Cris"],["Tlf",123456789], ["Allowed",false], ["Img",""], ["Date",1685122369000 ]], private_properties:''},
{id: '3', schema_id: "carnet",   name:"Pepe",  properties:[["Name","Pepe"],["Tlf",123456789], ["Allowed",true], ["Img",""], ["Date", 1685122369000]],  private_properties:''},
{id: '4', schema_id: "carnet",   name:"Pepa",  properties:[["Name","Pepa"],["Tlf",123456789], ["Allowed",false], ["Img",""], ["Date", 1685122369000]], private_properties:''},
{id: '5', schema_id: "nietos",   name:"Nietooo",  properties:[["Name","Nietooooo"],["Dir","Calle la piruleta"],["Nieto",true], ["Payed",false]], private_properties:''},
{id: '6', schema_id: "invitados",name:"nothing",  properties:[["Name","Solo soy un invi"],["Num invi",15]], private_properties:''},

]*/

export const USERLIST: UserIfz[] = [
new User('1',  "carnet",   "Manu",  [new AcsProp("Name","Manu", ACS_PROP_TYPE.TEXT), new AcsProp("Tlf",123456789, ACS_PROP_TYPE.NUMBER), new AcsProp("Allowed",true, ACS_PROP_TYPE.ALLOWED), new AcsProp("Img","", ACS_PROP_TYPE.PHOTO), new AcsProp("Date", 1685122369000, ACS_PROP_TYPE.DATE)], ''),
new User('2', "carnet", "Cris",       [new AcsProp("Name","Cris", ACS_PROP_TYPE.TEXT), new AcsProp("Tlf",123456789, ACS_PROP_TYPE.NUMBER), new AcsProp("Allowed",false, ACS_PROP_TYPE.ALLOWED), new AcsProp("Img","", ACS_PROP_TYPE.PHOTO), new AcsProp("Date", 1685122369000, ACS_PROP_TYPE.DATE)], ''),
new User('3', "carnet",   "Pepe",     [new AcsProp("Name","Pepe", ACS_PROP_TYPE.TEXT), new AcsProp("Tlf",123456789, ACS_PROP_TYPE.NUMBER), new AcsProp("Allowed",true, ACS_PROP_TYPE.ALLOWED),  new AcsProp("Img","", ACS_PROP_TYPE.PHOTO), new AcsProp("Date", 1685122369000, ACS_PROP_TYPE.DATE)],  ''),
new User('4', "carnet",   "Pepa",     [new AcsProp("Name","Pepa", ACS_PROP_TYPE.TEXT), new AcsProp("Tlf",123456789, ACS_PROP_TYPE.NUMBER), new AcsProp("Allowed",false, ACS_PROP_TYPE.ALLOWED), new AcsProp("Img","", ACS_PROP_TYPE.PHOTO), new AcsProp("Date", 1685122369000, ACS_PROP_TYPE.DATE)], ''),
new User('5', "nietos",   "Nietooo",  [new AcsProp("Name","Nietooooo", ACS_PROP_TYPE.TEXT), new AcsProp("Dir","Calle la piruleta", ACS_PROP_TYPE.TEXT), new AcsProp("Nieto",true, ACS_PROP_TYPE.CHECKBOX), new AcsProp("Payed",false, ACS_PROP_TYPE.CHECKBOX)], ''),
new User('6', "invitados","nothing",  [new AcsProp("Name","Solo soy un invi",  ACS_PROP_TYPE.TEXT), new AcsProp("Num invi",15,ACS_PROP_TYPE.NUMBER_ACCESSES)], ''),

]