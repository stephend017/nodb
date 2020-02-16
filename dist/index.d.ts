import { NDBConfig } from "./src/config";
import { NDBRecord } from "./src/record";
export { NDBRecord, NDBConfig };
export { NDBRecordKeyType, NDBAttribute } from './src/record';
export default class NoDB {
    static config: NDBConfig;
    static Init(config: NDBConfig): void;
    static Create<RecordType extends NDBRecord>(record: RecordType): void;
    static Modify<RecordType extends NDBRecord>(newRecord: RecordType): void;
    static Get(record: NDBRecord): Promise<string>;
    static Delete(record: NDBRecord): void;
}
