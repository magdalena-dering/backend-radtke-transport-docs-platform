## Description

- App build with Nest.js framework.

### Authentication service
- register account (email, password - `passport-jwt`)
- sign in user

### CRUD service
- CRUD available only for signed users
- user can see only their own created cars

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Tools and libraries:
- TypeORM
- nestjs-joi
- passport-jwt
- bcrypt
- class-validator
- class-transformer