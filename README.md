## Install Dependencies

`npm install`

## Run docker container

`docker run -p 5672:5672 rabbitmq`

## What will you need to run the application

- [Postman](https://www.postman.com/downloads/)
- [Node.js](https://nodejs.org/en/)

## Application use process

### Auth Service

1. Run each services port
   `npm run dev`
2. Register a user using the auth service. Make sure to provide the name, email, password
3. Login the user using the auth service. Make sure to provide the email and password
4. Get the token from the logged in user

### Quotes Service

1. Send a GET request to quotes indpoint in the quote service. Make sure to pass along the token return from the login into the authorization header
