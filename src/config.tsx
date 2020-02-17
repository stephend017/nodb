export class NDBConfig {
    /**
     * github oauth token. see [here](https://github.com/settings/tokens) for more information.
     */
    public readonly github_oauth_token: string;

    /**
     * Github repository owner's username
     */
    public readonly repositoryOwner: string;

    /**
     * Github repository owner's email
     */
    public readonly ownerEmail: string;

    /**
     * Name of the github repository
     */
    public readonly repository: string;

    constructor(github_oauth_token: string, repositoryOwner: string, ownerEmail: string, repository: string) {
        this.github_oauth_token = github_oauth_token;
        this.repositoryOwner = repositoryOwner;
        this.ownerEmail = ownerEmail;
        this.repository = repository;
    }
}