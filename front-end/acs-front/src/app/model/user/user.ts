import {UserIfz } from "./userIfz";

export class User implements UserIfz {
    id: string;
    schema_id: string;
    name: string;
    private_properties: string;
    properties: [string, any][];

    constructor(id: string, schema_id: string, name: string, properties: [string, any][], private_properties: string) {
        this.id = id;
        this.schema_id = schema_id;
        this.name = name;
        this.private_properties = private_properties;
        this.properties = properties;
    }

} 