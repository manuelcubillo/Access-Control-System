export interface AcsPropIfz {
    type: type;
    isACSprop(): boolean;
    getType(): type;
    getValue(): string;
    getDefault(): AcsPropIfz;

}

export enum type {
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
