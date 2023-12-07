export interface User {
    id: string;
    schema_id: string;
    name: string;
    private_properties: string;
    properties: [string,any][] //list of properties (propertie name / propertie value)

  }

