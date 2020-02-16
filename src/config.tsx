export class NDBConfig {
    public readonly github_oauth_token: string;
    public readonly repositoryOwner: string;
    public readonly ownerEmail: string;
    public readonly repository: string;

    constructor(github_oauth_token: string, repositoryOwner: string, ownerEmail: string, repository: string) {
        this.github_oauth_token = github_oauth_token;
        this.repositoryOwner = repositoryOwner;
        this.ownerEmail = ownerEmail;
        this.repository = repository;
    }
}