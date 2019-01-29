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


//   const query = "SELECT id, first_name, last_name, to_char(birthdate, 'DD-MM-YYYY') AS date FROM famous_people WHERE first_name=$1 OR last_name=$1;";

knex.select("id", "first_name", "last_name", "to_char(birthdate, 'DD-MM-YYYY') AS date")
  .from('famous_people')
  .where('first_name', '=', name)
  .orWhere('last_name', '=', name)
  .then(function(rows) {
    printResult(rows);
  })
  .catch(function(error) {
    console.error(error);
  });

const printResult = function(rows) {
  console.log(`Found ${rows.length} person(s) by the name '${name}':`);
    rows.forEach(function(person) {
      console.log(`${person.id}: ${person.first_name} ${person.last_name}, born ${person.birthdate.toDateString('DD-MM-YYYY')}`);
    });
};

// const doQuery = function (query, values) {
//   client.query(query, values, (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     printResult(result.rows);
//     client.end();
//   });
// };

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   console.log('Searching ...');
//   const values = [name];
//   doQuery(query, values);
// });
