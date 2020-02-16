"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFile(config, record) {
    return fetch(getURL(config, record), {
        method: 'GET',
        headers: {
            'Authorization': 'token ' + config.github_oauth_token,
            'Content-type': 'application/json'
        },
    }).then(function (response) { return response.json().then(function (responseJson) { return window.atob(responseJson['content']); }); });
}
exports.getFile = getFile;
function createFile(config, record) {
    fetch(getURL(config, record), {
        method: 'PUT',
        headers: {
            'Authorization': 'token ' + config.github_oauth_token,
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'message': 'created new record',
            "committer": {
                "name": config.repositoryOwner,
                "email": config.ownerEmail
            },
            "content": window.btoa(record.ToJSON())
        }),
    });
}
exports.createFile = createFile;
function modifyFile(config, record) {
    getFileSHA(config, record).then(function (sha) {
        fetch(getURL(config, record), {
            method: 'PUT',
            headers: {
                'Authorization': 'token ' + config.github_oauth_token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'message': 'modified record',
                "committer": {
                    "name": config.repositoryOwner,
                    "email": config.ownerEmail
                },
                "sha": sha,
                "content": window.btoa(record.ToJSON())
            }),
        });
    });
}
exports.modifyFile = modifyFile;
function deleteFile(config, record) {
    getFileSHA(config, record).then(function (sha) {
        fetch(getURL(config, record), {
            method: 'DELETE',
            headers: {
                'Authorization': 'token ' + config.github_oauth_token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'message': 'deleted record',
                "committer": {
                    "name": config.repositoryOwner,
                    "email": config.ownerEmail
                },
                "sha": sha
            }),
        });
    });
}
exports.deleteFile = deleteFile;
function getFileSHA(config, record) {
    return fetch(getURL(config, record), {
        method: 'GET',
        headers: {
            'Authorization': 'token ' + config.github_oauth_token,
            'Content-type': 'application/json'
        },
    }).then(function (response) { return response.json().then(function (responseJson) { return responseJson['sha']; }); });
}
exports.getFileSHA = getFileSHA;
function getURL(config, record) {
    return 'https://api.github.com/repos/' + config.repositoryOwner + '/' + config.repository + '/contents/' + record.typeName + '/' + record.key() + '.json';
}
