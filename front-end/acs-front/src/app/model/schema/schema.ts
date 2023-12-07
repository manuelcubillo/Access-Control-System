import { AcsPropIfz } from "./acsPropIfz";
import { Schema } from "./schemaIfz";

export class SchemaImpl implements Schema{
    id: string;
    name: string;
    properties: [string, AcsPropIfz][];

    constructor(id: string, name: string, properties: [string, AcsPropIfz][]) {
        this.id = id;
        this.name = name;
        this.properties = properties;
    }
}