import { AcsProp } from "../schema/acsProp";
import { AcsPropIfz, ACS_PROP_TYPE } from "../schema/acsPropIfz";
import { Schema } from "../schema/schemaIfz";
import {UserIfz } from "./userIfz";

export class User implements UserIfz {
    id: string;
    schema_id: string;
    name: string;
    private_properties: string;
    properties: AcsPropIfz[];
    //properties: [string, any][];

    constructor(id: string, schema_id: string, name: string, properties: AcsPropIfz[], private_properties: string) {
        this.id = id;
        this.schema_id = schema_id;
        this.name = name;
        this.private_properties = private_properties;
        this.properties = properties;
    }

    getDefaultUser(): UserIfz {
        return new User("","","",[],'');
    }

    getProperties(): AcsPropIfz[] {
        return this.properties;
    }

    /**
     * check if user has access to the resource
     * @returns void
     * @memberof User
     */
    access(schema:Schema):boolean {
        let isAllowed, isOnDate, hasAccesses:boolean =  true;

        isAllowed = this.isAllowed(schema);
        isOnDate = this.isOnDate(schema);
        hasAccesses = this.hasAccesses(schema);

        return isAllowed && isOnDate && hasAccesses;
    }

    /*
    * check ALLOWED acs prop
    */
    isAllowed(schema:Schema):boolean {
        schema.getProperties().forEach(acsProp => {
        });
        return true;
    }

    /**
     * check init and end date of user. In case of a temporal user
     * @returns 
     */
    isOnDate(schema:Schema):boolean {
        return true;
    }

    /**
     * check if there are enough acceses in the acs prop
     * @returns 
     */
    hasAccesses(schema:Schema):boolean {
        return true;
    }


} 