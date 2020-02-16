"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var NDBAttribute = /** @class */ (function () {
    function NDBAttribute(value) {
        this.value = value;
    }
    return NDBAttribute;
}());
exports.NDBAttribute = NDBAttribute;
var NDBRecord = /** @class */ (function () {
    function NDBRecord(typeName) {
        this.attributes = new Map();
        this.typeName = typeName;
    }
    NDBRecord.prototype.DefineAttribute = function (name, value) {
        this.attributes.set(name, new NDBAttribute(value));
    };
    NDBRecord.prototype.GetAttribute = function (name) {
        if (this.attributes.get(name) !== undefined) {
            return this.attributes.get(name).value;
        }
        return undefined;
    };
    NDBRecord.prototype.SetAttribute = function (name, value) {
        this.attributes.set(name, __assign({}, this.attributes.get(name), { value: value }));
    };
    NDBRecord.prototype.ToJSON = function () {
        var filteredMap = {};
        this.attributes.forEach(function (value, key) {
            filteredMap[key] = value.value;
        });
        console.log(filteredMap);
        return JSON.stringify(filteredMap);
    };
    return NDBRecord;
}());
exports.NDBRecord = NDBRecord;
