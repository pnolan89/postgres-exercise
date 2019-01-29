const settings = require("./settings"); // settings.json
const name = process.argv.slice(2)[0];

const knex = require("knex")({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});


const query = knex.select("id", "first_name", "last_name", "birthdate")
  .from('famous_people')
  .where('first_name', '=', name)
  .orWhere('last_name', '=', name)
  .then(function(rows) {
    printResult(rows);
  })
  .finally(function() {
    knex.destroy();
  })
  .catch(function(error) {
    console.error(error);
  });

const printResult = function(rows) {
  console.log(`Found ${rows.length} person(s) by the name '${name}':`);
    rows.forEach(function(person) {
      console.log(`${person.id}: ${person.first_name} ${person.last_name}, born ${person.birthdate.toDateString()}`);
    });
};

