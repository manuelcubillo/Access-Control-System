import { Schema } from "../model/schema"

export const SCHEMA_LIST_MOCK : Schema[] = [ 
    {id : "carnet", name : "carnet", properties: [["Name", "Text"], ["Tlf", "Number"], ["Allowed", "Check"], ["Img", "Photo"], ["Date", "Date"]]},
    {id : "nietos", name : "nietos", properties: [["Name", "Text"], ["Dir", "Text"], ["Nieto", "Check"], ["Payed", "Check"]]},
    {id : "invitados", name : "invitados", properties: [["Name", "Text"], ["Num invi", "Number"]]}
]