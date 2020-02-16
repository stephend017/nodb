export declare type NDBRecordKeyType = string | number;
export declare class NDBAttribute {
    value: any;
    constructor(value: any);
}
export declare abstract class NDBRecord {
    abstract key(): NDBRecordKeyType;
    readonly typeName: string;
    constructor(typeName: string);
    private attributes;
    DefineAttribute(name: string, value: any): void;
    GetAttribute(name: string): any;
    SetAttribute(name: string, value: any): void;
    ToJSON(): string;
}
