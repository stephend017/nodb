import { NDBConfig } from "./config";
import { NDBRecord } from "./record";
export declare function getFile(config: NDBConfig, record: NDBRecord): Promise<string>;
export declare function createFile(config: NDBConfig, record: NDBRecord): void;
export declare function modifyFile(config: NDBConfig, record: NDBRecord): void;
export declare function deleteFile(config: NDBConfig, record: NDBRecord): void;
export declare function getFileSHA(config: NDBConfig, record: NDBRecord): Promise<any>;
