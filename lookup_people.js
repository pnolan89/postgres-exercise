const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv.slice(2)[0];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const printResult = function(rows) {
  console.log(`Found ${rows.length} person(s) by the name '${name}':`);
    rows.forEach(function(person) {
      console.log(`${person.id}: ${person.first_name} ${person.last_name}, born ${person.date}`);
    });
};

const doQuery = function (query, values) {
  client.query(query, values, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    printResult(result.rows);
    client.end();
  });
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching ...');
  const query = "SELECT id, first_name, last_name, to_char(birthdate, 'DD-MM-YYYY') AS date FROM famous_people WHERE first_name=$1 OR last_name=$1;";
  const values = [name];
  doQuery(query, values);
});
