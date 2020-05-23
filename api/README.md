# api

Boilerplate to start Node applications.

## Setup

### Development

`npm install`

Install a Prettier or EditorConfig plugin for your preferred IDE.

Setup .env with the variables: DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_DIALECT, ORIGIN, and JWT_SECRET.

Install PM2:

`npm install -g pm2`

To start the server in PM2 and restart on code changes:

`npm start`

To fix linting issues:

`npm run lint`

### Production

`npm run prod`
