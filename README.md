# NoDB
An elegant database solution for frontend developers.

NoDB is a wrapper that allows frontend developers to abuse the GitHub Developer API and use a github repository as a database. By using a private repository, github handles basic security. That also means that this is a completely free solution. With NoDB you can create a full website in pure javascript, html and css. 

## Quick Start
NoDB is currently an npm package. you can add it to your project by running the following command
```
$ npm install nodb-js
```

Next in you programs startup file (for web projects this is probably `index.js`), we need to create a configuration for your project and initialize NoDB. This takes in some sensitive information. So we recommend you take the proper steps to secure it properly. 

```typescript
import NoDB, { NDBConfig } from 'nodb-js';

const nodbConfig: NDBConfig = new NDBConfig(
    // NOTE: the next 3 values should corespond to the same 
    // github account.

    // see https://github.com/settings/tokens for information on how 
    // to generate, use and secure this. 
    '{GITHUB_OAUTH_TOKEN}', 
    // The github username of the owner of the repository you are
    // using.
    '{repositoryOwner}',  
    // The email address of the repository owner.   
    '{ownerEmail}',   
    // The name of the repository to use as a database.      
    '{repository}'          
)

// Initialize your configurations in the database
NoDB.Init(nodbConfig);

// Run your app ...
```

And thats it. Now you can use NoDB in your project. 

## Defining a New Record
NoDB is designed to easily integrate on top of your existing web project. Here's an example user struct as a `NDBRecord`

```typescript
import { NDBRecord, NDBKeyType } from 'nodb-js';

class UserRecord extends NDBRecord {
    
    public username: string = '';
    public password: string = '';

    constructor(username: string, password?: string) {
        // This is for NDB to correctly type your record 
        super('user-type');

        // username is our key so its a required field
        this.username = username;

        if (password) {
            this.password = password;
        }
    }

    // This is the primary key of your type. It should be derived from 
    // existing fields.
    public key(): NDBKeyType {
        return this.username;
    }
}
```

Now we can store `UserRecord` in our database.

## Storing Records
Once you have defined an `NDBRecord` you can both create and modify it using the following commands.

```typescript
import NoDB, { NDBRecord } from 'nodb-js';

// Define a new instance of UserRecord
let userRecord: UserRecord = new UserRecord('myusername', 'mypassword');

// Create the record in the database
NoDB.Create<UserRecord>(userRecord);

```

Now if we have to modify `userRecord` we can save its new state to the database by calling `Modify`

```typescript
// change the state of new record
userRecord.password = 'newpassword';

// Rewrite an existing record in the database
NoDB.Modify<UserRecord>(userRecord);
```

## Accessing Records
After a record has been saved to the database we can access it with the records key.

```typescript
// Note here how UserRecord forces us to add a username (the key 
// attribute when creating an instance)
let userRecord: UserRecord = new UserRecord('myusername');

// Get returns a promise of the record type so we can access it like so
NoDB.Get<UserRecord>(userRecord).then((savedRecord: UserRecord) => {
    // Do stuff with savedRecord ...
});
```

## Deleting Records
Like accessing we need a blank record with the `key` attribute set to delete a record from the database.

```typescript
// Note here how UserRecord forces us to add a username (the key 
// attribute when creating an instance)
let userRecord: UserRecord = new UserRecord('myusername');

// A record in the database with the same key  as userRecord 
// will be removed.
NoDB.Delete<UserRecord>(userRecord);
```

## Securing Records
Fromt the above example our user isn't very secure. Anyone who knows the user's username can access their information. NoDB doesn't encrypt any data natively. Thats your job. However, it's still possible to achieve user authentication. 

All records in NoDB are indexed by their key. Since you as a developer defines the key for a record, we can use some creative workarounds to achieve authentication.

```typescript
import { NDBRecord, NDBKeyType } from 'nodb-js';
// you'll have to add this to your project
import CryptoJS from 'crypto-js'; 

// The UserRecord class from above, with some modifications.
class UserRecord extends NDBRecord {
    
    public username: string = '';
    public password: string = '';

    constructor(username: string, password: string) {
        // This is for NDB to correctly type your record 
        super('user-type');

        // username and password are part of our key so they are 
        // required fields
        this.username = username;
        // We encrypt the password to keep it safe
        this.password = CryptoJS.AES.encrypt(
            this.password, 'secret-passphrase').toString();
    }

    // This is the primary key of your type. It should be derived from 
    // existing fields.
    public key(): NDBKeyType {
        return this.username + this.password;
    }
}

```

Now to access a user from the database we need to enter both their username and their password. 
