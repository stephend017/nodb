# NoDB
An elegant database solution for frontend developers.

NoDB is a wrapper that allows frontend developers to abuse the GitHub Developer API and use a github repository as a database. By using a private repository, github handles basic security. That also means that this is a completely free solution. With NoDB you can create a full website in pure javascript, html and css. 

## Who & What is this For?
Frontend Developers working on small to midsize projects. Its hard to learn database management, serverless API architectures and its exspensive. Other great uses can be for small business websites, dashboards and any webapp that requires a database.

## Security
NoDB has a focus on simplicity. The same goes for security. Your probably wondering how user authentication might work. It's simple. Keys. In NoDB every record is indexed by its primary key. This is a function defined by the type being saved. For user authentication, you can simply make the key a hash of both the user's username and password. Simple Right? 