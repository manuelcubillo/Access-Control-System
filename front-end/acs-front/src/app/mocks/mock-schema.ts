import { Schema } from "../model/schema/schemaIfz"
import { AcsProp } from "../model/schema/acsProp"
import { ACS_PROP_TYPE } from "../model/schema/acsPropIfz"
import { SchemaImpl } from "../model/schema/schema"


export const SCHEMA_LIST_MOCK : Schema[] = [ 
    new SchemaImpl("carnet", "carnet", [new AcsProp("Name", null, ACS_PROP_TYPE.TEXT), new AcsProp("Tlf",null, ACS_PROP_TYPE.NUMBER), new AcsProp("Allowed",null, ACS_PROP_TYPE.ALLOWED), new AcsProp("Img",null, ACS_PROP_TYPE.PHOTO), new AcsProp("Date",null, ACS_PROP_TYPE.DATE)]),
    new SchemaImpl("nietos", "nietos", [new AcsProp("Name", null,ACS_PROP_TYPE.TEXT), new AcsProp("Dir",null, ACS_PROP_TYPE.TEXT), new AcsProp("Nieto",null, ACS_PROP_TYPE.CHECKBOX), new AcsProp("Payed",null, ACS_PROP_TYPE.CHECKBOX)]),
    new SchemaImpl("invitados", "invitados", [new AcsProp("Name", null,ACS_PROP_TYPE.TEXT), new AcsProp("Num invi", null,ACS_PROP_TYPE.NUMBER_ACCESSES)])
]