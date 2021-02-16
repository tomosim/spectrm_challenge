# 🗣 Spectrm Code Challenge

_A RESTful API built using Express with a PostgreSQL database._

## 🥁 Lasst Uns Beginnen

### 🗝 Prerequisites

To get this project running on your machine you're gonna need a few things.

- [The Git CLI](https://git-scm.com/downloads)
- [Node Package Manager](https://www.npmjs.com/get-npm)
- [Node.js](https://nodejs.org/en/download/)
- [PostgreSQL](https://www.postgresql.org/download/)

### 🚧 Installing and Running

1. First things first, open up a terminal and, using the Git CLI, clone this repo to you machine:

```sh
git clone https://github.com/tomosim/spectrm_challenge
```

2. Change directories to the project:

```sh
cd spectrm_challenge
```

3. Install the dependencies using Node Package Manager:

```sh
npm install
```

4. Start the server using the following script:

```sh
npm start
```

5. The server will now be running locally and is listening on port 9090. Head on over to `localhost:9090` in your browser or a development tool like [Postman](https://www.postman.com/downloads/) of [Insomnia](https://insomnia.rest/). Here you will see a list of available endpoints you can query with examples of inputs and outputs.

6. Have fun!

## ✅ Tests

This project was built using TDD and you might want to run the tests to check that everything is working. You can do so by running the command:

```sh
npm test
```

## 🧱 Built With

- [Express](http://expressjs.com/)
- [Knex](https://knexjs.org/)
- [Node Postgres](https://node-postgres.com/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Chai](chaijs.com)
- [Mocha](mochajs.org/)
- [Nodemon](nodemon.io)
