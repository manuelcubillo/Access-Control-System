import { AcsPropIfz, ACS_PROP_TYPE } from "./acsPropIfz";

export class AcsProp implements AcsPropIfz {
    propName: string;
    propValue: any;
    type: ACS_PROP_TYPE;
    typeAsString: string;
    defName:string = "";
    defValue:string = "";
    
    constructor(propName:string, propValue:any, type: ACS_PROP_TYPE) {
        this.propName = propName;
        this.propValue = propValue;
        this.type = type;
        this.typeAsString = (type as unknown) as string;
    }


    getPropValue(): any {
        return this.propValue;
    }


    getDefault(): AcsPropIfz {
        return new AcsProp(this.defName, this.defValue, ACS_PROP_TYPE.default);
    }
    
    /**
     * 
     * @returns boolean value depending if there is a special implementation for this type
     */
    isACSprop(): boolean {
        switch(this.type) {
            case ACS_PROP_TYPE.ALLOWED:
            case ACS_PROP_TYPE.INIT_DATE:
            case ACS_PROP_TYPE.END_DATE:
            case ACS_PROP_TYPE.NUMBER_ACCESSES:
            case ACS_PROP_TYPE.PHOTO:
                return true;
            default:
                return false;
        }
    }
    
    getType(): ACS_PROP_TYPE {
        return this.type;
    } 

    
    /**
     * convert value as string 
     **/
    getTypeAsString(): string {
        return (this.type as unknown) as string;
    }

    isThisTypeOfProp(type: ACS_PROP_TYPE): boolean {
        return type === this.type;
    }

    getPropType(): ACS_PROP_TYPE {
        return this.type;
    }
    getPropName(): string {
        return this.propName;
    }


}