// Update with your config settings.

module.exports = {
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
  },
};
