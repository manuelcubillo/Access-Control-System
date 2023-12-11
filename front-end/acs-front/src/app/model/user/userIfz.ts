import { AcsPropIfz } from "../schema/acsPropIfz";
import { Schema } from "../schema/schemaIfz";

export interface UserIfz {
    id: string;
    schema_id: string;
    name: string;
    private_properties: string;
    properties: AcsPropIfz[] //list of properties (propertie name / propertie value)
    //properties: [string, any][] //list of properties (propertie name / propertie value)
    access():boolean;
    getProperties():AcsPropIfz[];
    getDefaultUser():UserIfz;
  }

