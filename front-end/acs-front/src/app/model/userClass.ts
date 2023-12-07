import { User } from "./user";

export class userClass implements User {
    id: string;
    schema_id: string;
    name: string;
    public_properties: string;
    private_properties: string;
    properties: [string, any][];

    constructor(id: string, schema_id: string, name: string, public_properties: string, private_properties: string, properties: [string, any][]) {
        this.id = id;
        this.schema_id = schema_id;
        this.name = name;
        this.public_properties = public_properties;
        this.private_properties = private_properties;
        this.properties = properties;
    }
    
} 