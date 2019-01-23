# api-jwt-demo
> Express API using JWT

## Installation
1. `npm install`
2. `npm start`
3. open http://localhost:3000

## Configure
1. copy `.env.example` to `.env`
2. setup mongodb connection
3. change JWT secret 

## Endpoints

| URL            | Description      | Headers                          | Body                                                           |
| -------------- | ---------------- | -------------------------------- | -------------------------------------------------------------- |
| /auth/register | Create new users |                                  | {<br>"email": "demo@company.com",<br>"password": "123456"<br>} |
| /auth/login    | Get user token   |                                  | {<br>"email": "demo@company.com",<br>"password": "123456"<br>} |
| /sample        | Create new users | `{ Authorization: JWT <token> }` | {<br>"msg": "ok",<br>"random": "0.7318395018761625"<br>"date": "2019-01-23T14:30:18.033Z"<br>} |

## Testing
`npm run test` 
