export type NDBRecordKeyType = string | number;

export abstract class NDBRecord {
    public abstract key(): NDBRecordKeyType;
    public readonly typeName: string;
    constructor(typeName: string) {
        this.typeName = typeName;
    }
}