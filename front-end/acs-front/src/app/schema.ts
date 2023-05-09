export interface Schema {
    id: string,
    name: string,
    properties: [string,string][] //list of properties (propertie name / propertie type)
}