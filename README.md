## Description

- App build with Nest.js framework.

### Authentication service
- registration of account (email, password - `passport-jwt`)
- logging

### CRUD service
- CREATE: user can add car with data like:
```
  name
  numberPlate
  date
  distance
  note
```
* the `numberPlate` must be unique.

- READ: user can see only their owns cars.
- UPDATE: user can find a car by providing `numberPlate` and change the displayed data.
- DELETE: user can delete car by providing `numberPlate`.

### Search: 
- user can search cars by providing text in params.

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
- Prisma
- nestjs-joi
- passport-jwt
- bcrypt
- class-validator
- class-transformer

## Bugs to fix:
- decrypt user password when user details has been changed

## Docker
- create service from docker-compose.yml file - `docker compose up {name of the service} -d`
- check running containers - `docker ps`