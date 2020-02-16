"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./src/config");
exports.NDBConfig = config_1.NDBConfig;
var record_1 = require("./src/record");
exports.NDBRecord = record_1.NDBRecord;
var githubFileIO_1 = require("./src/githubFileIO");
var record_2 = require("./src/record");
exports.NDBAttribute = record_2.NDBAttribute;
var NoDB = /** @class */ (function () {
    function NoDB() {
    }
    NoDB.Init = function (config) {
        NoDB.config = config;
    };
    NoDB.Create = function (record) {
        githubFileIO_1.createFile(NoDB.config, record);
    };
    NoDB.Modify = function (newRecord) {
        githubFileIO_1.modifyFile(NoDB.config, newRecord);
    };
    NoDB.Get = function (record) {
        return githubFileIO_1.getFile(NoDB.config, record);
    };
    NoDB.Delete = function (record) {
        githubFileIO_1.deleteFile(NoDB.config, record);
    };
    return NoDB;
}());
exports.default = NoDB;
