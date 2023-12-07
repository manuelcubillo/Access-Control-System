import { AcsPropIfz } from "./acsPropIfz";

export interface Schema {
    id: string,
    name: string,
    properties: [string,AcsPropIfz][] //list of properties (propertie name / propertie type)
}