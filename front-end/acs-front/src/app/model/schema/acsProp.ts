import { AcsPropIfz, type } from "./acsPropIfz";

export class AcsProp implements AcsPropIfz {
    type: type;
    
    constructor(type: type) {
        this.type = type;
    }

    getDefault(): AcsPropIfz {
        return new AcsProp(type.default);
    }
    
    /**
     * 
     * @returns boolean value depending if there is a special implementation for this type
     */
    isACSprop(): boolean {
        switch(this.type) {
            case type.ALLOWED:
            case type.INIT_DATE:
            case type.END_DATE:
            case type.NUMBER_ACCESSES:
            case type.PHOTO:
                return true;
            default:
                return false;
        }
    }
    
    getType(): type {
        return this.type;
    } 
    
    /**
     * convert value as string 
     **/
    getValue(): string {
        return (this.type as unknown) as string;
    }


}