export interface User {
    id: string;
    schema_id: string;
    public_properties: string;
    private_properties: string;
    properties: [string,any][] //list of properties (propertie name / propertie value)
  }