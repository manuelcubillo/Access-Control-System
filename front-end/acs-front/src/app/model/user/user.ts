import { AcsProp } from "../schema/acsProp";
import { AcsPropIfz, ACS_PROP_TYPE } from "../schema/acsPropIfz";
import { Schema } from "../schema/schemaIfz";
import { UserIfz } from "./userIfz";

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
        return new User("", "", "", [], '');
    }

    getProperties(): AcsPropIfz[] {
        return this.properties;
    }

    /**
     * check if user has access to the resource
     * @returns void
     * @memberof User
     */
    access(): boolean {
        let isAllowed: boolean =  true;
        let initDate: boolean = true; 
        let endDate: boolean = true; 
        let hasAccesses: boolean = true;

        isAllowed = this.isAllowed();
        initDate = this.isOnDateInit();
        endDate = this.isOnDateEnd();
        hasAccesses = this.hasAccesses();

        return isAllowed && initDate && endDate && hasAccesses;
    }

    /*
    * check ALLOWED acs prop
    */
    isAllowed(): boolean {
        let flag:  boolean = false;
        let found: boolean = false;

        this.properties.forEach(p => {
            if (p.type === ACS_PROP_TYPE.ALLOWED) {
                found = true;
                if(p.getPropValue()){
                    flag = true;
                }
            }
        });

        return flag == found;
    }

    /**
     * check init and end date of user. In case of a temporal user
     * @returns 
     */
    isOnDateInit(): boolean {
        let flag:  boolean = false;
        let found: boolean = false;

        this.properties.forEach(p => {
            if (p.type === ACS_PROP_TYPE.INIT_DATE ) {
                found = true;
                if(p.getPropValue() >= new Date().getTime()){
                    flag = true;
                }
            }
        });

        return flag == found;
    }

    isOnDateEnd(): boolean {
        let flag:  boolean = false;
        let found: boolean = false;

        this.properties.forEach(p => {
            if (p.type === ACS_PROP_TYPE.END_DATE ) {
                found = true;
                if(p.getPropValue() <= new Date().getTime()){
                    flag = true;
                }
            }
        });

        return flag == found;
    }


    /**
     * check if there are enough acceses in the acs prop
     * @returns 
     */
    hasAccesses(): boolean {
        let flag:  boolean = false;
        let found: boolean = false;

        this.properties.forEach(p => {
            if (p.type === ACS_PROP_TYPE.NUMBER_ACCESSES) {
                found = true;
                if(p.getPropValue() > 0){
                    flag = true;
                }
            }
        });

        return flag == found;
    }


} 