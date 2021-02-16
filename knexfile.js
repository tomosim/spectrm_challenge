const ENV = process.env.NODE_ENV || "development";

const dbConfig = {
  development: {
    client: "pg",
    connection: {
      database: "messages",
      // on Linux you will probably need to fill these in
      // user:     'username',
      // password: 'password'
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  test: {
    client: "pg",
    connection: {
      database: "messages_test",
      // on Linux you will probably need to fill these in
      // user:     'username',
      // password: 'password'
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};

module.exports = dbConfig[ENV];
