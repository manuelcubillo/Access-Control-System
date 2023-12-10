import { AcsProp } from "./acsProp";
import { AcsPropIfz } from "./acsPropIfz";
import { Schema } from "./schemaIfz";

export class SchemaImpl implements Schema{
    id: string;
    name: string;
    properties: AcsPropIfz[];

    constructor(id: string, name: string, properties: AcsPropIfz[]) {
        this.id = id;
        this.name = name;
        this.properties = properties;
    }
    
    getDefaultSchema(): Schema {
        return new SchemaImpl("","",[AcsProp.prototype.getDefault()]);
    }

    getId(): string {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getProperties(): AcsPropIfz[] {
        return this.properties;
    }
}