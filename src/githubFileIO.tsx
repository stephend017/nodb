import { NDBConfig } from "./config";
import { NDBRecord } from "./record";

export function getFile(config: NDBConfig, record: NDBRecord) {
    return fetch(getURL(config, record), {
        method: 'GET',
        headers: {
            'Authorization': 'token ' + config.github_oauth_token,
            'Content-type': 'application/json'
        },
    }).then(response => response.json().then(responseJson => window.atob(responseJson['content'])));
}

export function createFile(config: NDBConfig, record: NDBRecord) {
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
    })
}

export function modifyFile(config: NDBConfig, record: NDBRecord) {
    getFileSHA(config, record).then(sha => {
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
        })
    })
}

export function deleteFile(config: NDBConfig, record: NDBRecord) {
    getFileSHA(config, record).then(sha => {
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
        })
    })

}

export function getFileSHA(config: NDBConfig, record: NDBRecord) {
    return fetch(getURL(config, record), {
        method: 'GET',
        headers: {
            'Authorization': 'token ' + config.github_oauth_token,
            'Content-type': 'application/json'
        },
    }).then(response => response.json().then(responseJson => responseJson['sha']));
}

function getURL(config: NDBConfig, record: NDBRecord): string {
    return 'https://api.github.com/repos/' + config.repositoryOwner + '/' + config.repository + '/contents/' + record.typeName + '/' + record.key() + '.json';
}