export interface AcsPropIfz {
    propName:string;
    propValue:any;
    type: ACS_PROP_TYPE;
    typeAsString: string;
    isACSprop(): boolean;
    getType(): ACS_PROP_TYPE;
    getTypeAsString(): string;
    getDefault(): AcsPropIfz;
    isThisTypeOfProp(type:ACS_PROP_TYPE):boolean;
    getPropName(): string;
    getPropValue(): any;
    getType(): ACS_PROP_TYPE;
}




export enum ACS_PROP_TYPE {
    INIT_DATE,
    END_DATE,
    PHOTO,
    NUMBER_ACCESSES,
    ALLOWED,
    DATE,
    TEXT,
    NUMBER,
    CHECKBOX,
    default
}
