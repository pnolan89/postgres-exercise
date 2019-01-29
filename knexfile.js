const settings = require("./settings"); // settings.json

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: settings.user,
      password: settings.password,
      database: settings.database,
      hostname: settings.hostname,
      post: settings.port,
      ssl: settings.ssl
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
