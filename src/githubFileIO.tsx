import { NDBConfig } from "./config";
import { NDBRecord } from "./record";

export async function getFile(config: NDBConfig, record: NDBRecord) {
    const response = await fetch(getURL(config, record), {
        method: 'GET',
        headers: {
            'Authorization': 'token ' + config.github_oauth_token,
            'Content-type': 'application/json'
        },
    });
    const responseJson = await response.json();
    return window.atob(responseJson['content']);
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
            "content": window.btoa(JSON.stringify(record))
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
                "content": window.btoa(JSON.stringify(record))
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

export async function getFileSHA(config: NDBConfig, record: NDBRecord) {
    const response = await fetch(getURL(config, record), {
        method: 'GET',
        headers: {
            'Authorization': 'token ' + config.github_oauth_token,
            'Content-type': 'application/json'
        },
    });
    const responseJson = await response.json();
    return responseJson['sha'];
}

function getURL(config: NDBConfig, record: NDBRecord): string {
    return 'https://api.github.com/repos/' + config.repositoryOwner + '/' + config.repository + '/contents/' + record.typeName + '/' + record.key() + '.json';
}