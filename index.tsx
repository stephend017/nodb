import { NDBConfig } from "./src/config";
import { NDBRecord } from "./src/record";
import { createFile, modifyFile, getFile, deleteFile } from "./src/githubFileIO";

export { NDBRecord, NDBConfig};
export { NDBRecordKeyType, NDBAttribute }from './src/record';

export default class NoDB {
    private static config: NDBConfig;

    public static Init(config: NDBConfig) {
        NoDB.config = config;
    }

    public static Create<RecordType extends NDBRecord>(record: RecordType) {
        createFile(NoDB.config, record);
    }

    public static Modify<RecordType extends NDBRecord>(newRecord: RecordType) {
        modifyFile(NoDB.config, newRecord);
    }

    public static Get(record: NDBRecord) {
        return getFile(NoDB.config, record);
    }

    public static Delete(record: NDBRecord) {
        deleteFile(NoDB.config, record)
    }

}
