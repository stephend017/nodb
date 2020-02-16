"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NDBConfig = /** @class */ (function () {
    function NDBConfig(github_oauth_token, repositoryOwner, ownerEmail, repository) {
        this.github_oauth_token = github_oauth_token;
        this.repositoryOwner = repositoryOwner;
        this.ownerEmail = ownerEmail;
        this.repository = repository;
    }
    return NDBConfig;
}());
exports.NDBConfig = NDBConfig;
