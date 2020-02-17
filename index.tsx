import { NDBConfig } from "./src/config";
import { NDBRecord } from "./src/record";
import { createFile, modifyFile, getFile, deleteFile } from "./src/githubFileIO";

export { NDBRecord, NDBConfig };
export { NDBRecordKeyType, NDBAttribute } from './src/record';

/**
 * JS Wrapper for NoDB
 */
export default class NoDB {

    private static config: NDBConfig;

    /**
     * Sets the settings used for NoDB
     * @param config settings to use for NoDB
     */
    public static Init(config: NDBConfig) {
        NoDB.config = config;
    }

    /**
     * Stores a new record in the database
     * @param record new record to store in the database. 
     */
    public static Create<RecordType extends NDBRecord>(record: RecordType): void {
        createFile(NoDB.config, record);
    }

    /**
     * Overwrites a record with the same key in the database
     * @param record new record to store in the database
     */
    public static Modify<RecordType extends NDBRecord>(record: RecordType): void {
        modifyFile(NoDB.config, record);
    }

    /**
     * Returns the JSON object of the record being returned
     * @param record type and key of record to get from the database
     */
    public static async Get(record: NDBRecord): Promise<any> {
        return JSON.parse(await getFile(NoDB.config, record));
    }

    /**
     * Deletes a record from the database
     * @param record type and key of the record to delete from the database
     */
    public static Delete(record: NDBRecord): void {
        deleteFile(NoDB.config, record)
    }

}
