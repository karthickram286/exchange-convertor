# Exchange Convertor [![Build Status](https://travis-ci.com/karthickram286/exchange-convertor.svg?branch=master)](https://travis-ci.com/karthickram286/exchange-convertor)

An exchange convertor application which converts the value from base currency to multiple currencies.

## Features
- User Authentication and Authorization
- Add countries (using https://restcountries.eu) and convert currencies (using https://fixer.io) to base currency
- Rate limiting using redis
- Caching the response of external API calls

## Requirements
- Node.js `v12.16.1` or above
- PostgreSQL `12.2` or above
- Redis `v5.0.7` or above

## Configuration
- Change the default configs to your needs by changing the `lib/config/config.json` file.

## Testing the endpoints
Use this postman collection to test the server endpoints
https://www.getpostman.com/collections/b02cbee204c78e2b6c36

## Running the application (with default configs)
- clone the project locally
- Run `npm install` in the main folder to install server side dependencies
- `cd client` and then again run `npm install` to install client side dependencies
- Start Postgres and Redis
- Execute the SQL statements in `migrations/migrate-db.sql` file to create the required databases for Dev, Test and Prod.
- Execute the SQL statements in `migrations/migrate-tables.sql` file to create the required tables. This must be executed seperately in all the environment databases.
- Set up the value for jwt private key by typing the following command in shell `export JWT_PRIVATE_KEY={Put your jwt private key here}`
- Now you can any of the following,
  1. `npm run build` - To compile the ts files
  2. `npm run server` - To compile and start the server
  3. `npm run client` - To start the only the client
  4. `npm run dev` - To start both the client and server in `Development` mode
  5. `npm run client-build` - To build the client files
  6. `npm run prod` - To build both client and server files and start both concurrently
  7. `npm run unit-test` - To run the unit tests
  8. `npm run unit-test-report` - To run the unit tests and generate a html report
  9. `npm run integ-test` - To run the integration tests
  10. `npm run integ-test-report` - To run the integration tests and generate a html report

## Don't want to follow these steps?
You can pull the docker image from the hub and you can easily start the application in a container
- `docker pull karthickram286/exchange-convertor:latest` to pull the image
- `docker run karthickram286/exchange-convertor:latest` to run the image in a container in dev mode

---

**Note**: The client binds with server on port 5000(the port on which the server runs on dev mode). So, while running both the server and client in production mode(using `npm run prod`), change the port in `client/package.json` in `proxy` field to 7000.

## Issue reporting
https://github.com/karthickram286/exchange-convertor/issues

## Contributing
- Run the project locally in Development mode
- Make changes
- Raise a PR
