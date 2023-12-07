import { Schema } from "../model/schema/schemaIfz"
import { AcsProp } from "../model/schema/acsProp"
import { type } from "../model/schema/acsPropIfz"


/*
export const SCHEMA_LIST_MOCK : Schema[] = [ 
    {id : "carnet", name : "carnet", properties: [["Name", "TEXT"], ["Tlf", "NUMBER"], ["Allowed", "CHECKBOX"], ["Img", "PHOTO"], ["Date", "DATE"]]},
    {id : "nietos", name : "nietos", properties: [["Name", "TEXT"], ["Dir", "TEXT"], ["Nieto", "CHECKBOX"], ["Payed", "CHECKBOX"]]},
    {id : "invitados", name : "invitados", properties: [["Name", "TEXT"], ["Num invi", "NUMBER"]]}
]
*/
export const SCHEMA_LIST_MOCK : Schema[] = [ 
    {id : "carnet", name : "carnet", properties: [["Name", new AcsProp(type.TEXT)], ["Tlf",  new AcsProp(type.NUMBER)], ["Allowed",  new AcsProp(type.ALLOWED)], ["Img",  new AcsProp(type.PHOTO)], ["Date",  new AcsProp(type.DATE)]]},
    //{id : "nietos", name : "nietos", properties: [["Name", "TEXT"], ["Dir", "TEXT"], ["Nieto", "CHECKBOX"], ["Payed", "CHECKBOX"]]},
    //{id : "invitados", name : "invitados", properties: [["Name", "TEXT"], ["Num invi", "NUMBER"]]}
]