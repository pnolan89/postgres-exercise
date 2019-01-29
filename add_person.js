const settings = require("./settings"); // settings.json
const [first_name, last_name, date] = process.argv.slice(2);

const knex = require("knex")({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});


const query = knex('famous_people').insert({
  first_name: first_name,
  last_name: last_name,
  birthdate: date
})
.then(console.log('Successfully inserted to database'))
.finally(function() {
  knex.destroy();
});

