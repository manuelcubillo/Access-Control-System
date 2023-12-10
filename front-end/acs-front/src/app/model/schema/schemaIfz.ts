import { AcsPropIfz } from "./acsPropIfz";

export interface Schema {
    id: string,
    name: string,
    properties: AcsPropIfz[] //list of properties 
    getId(): string
    getName(): string
    getProperties(): AcsPropIfz[]
    getDefaultSchema(): Schema;
}