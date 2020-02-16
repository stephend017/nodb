export type NDBRecordKeyType = string | number;

export class NDBAttribute {
    value: any;
    constructor(value: any) {
        this.value = value;
    }
}

export abstract class NDBRecord {
    public abstract key(): NDBRecordKeyType;
    public readonly typeName: string;
    constructor(typeName: string) {
        this.typeName = typeName;
    }

    private attributes: Map<string, NDBAttribute> = new Map();

    public DefineAttribute(name: string, value: any) {
        this.attributes.set(name, new NDBAttribute(value));
    }

    public GetAttribute(name: string): any {
        if (this.attributes.get(name) !== undefined) {
            return (this.attributes.get(name) as NDBAttribute).value;
        }
        return undefined;
    }

    public SetAttribute(name: string, value: any): void {
        this.attributes.set(name, {... this.attributes.get(name), value: value});
    }

    public ToJSON(): string {
        let filteredMap: any = {};
        this.attributes.forEach(function(value: NDBAttribute, key: string) {            
            filteredMap[key] = value.value;
        });
        console.log(filteredMap);
        return JSON.stringify(filteredMap);
    }
}