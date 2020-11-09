const express = require('express');
const app = express();
const mysql = require('mysql');
const dbConfig = require('./config.json');
const covidAPI = require('novelcovid');

app.use(express.json());

const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected.');
});

/**
 * Runs at server startup to download all historical Covid data
 * @return {void}
 */
app.get(`/api/downloadData`, (req, res) => {
  covidAPI.nyt.states()
      .then((data) => {
        // const keys = Object.keys(data[0]);
        data.forEach((stateData) => {
          let query = `insert into caseData set `;
          query += `date = "${stateData['date']}",`;
          query += `location = "${stateData['state']}",`;
          query += `fips = "${stateData['fips']}",`;
          query += `cases = "${stateData['cases']}",`;
          query += `deaths = "${stateData['deaths']}",`;
          query += `updated = "${stateData['updated']}";`;
          //   keys.forEach((key) => {
          //     query += `${key} = "${stateData[key]}", `;
          //   });
          //   query = query.slice(0, -2) + ';';
          db.query(query, (err, result) => {
            console.log(err);
          });
        });
      });
});

app.get(`/api/getStateData`, (req, res) => {
  if (req.query.location) {
    const query = `select * from caseData 
        where location="${req.query.location}";`;
    db.query( query, (err, result) => {
      res.send( result );
    });
  } else {
    const query = `select caseData.*, l.lat, l.lng from caseData right join 
        latLng l on (caseData.location=l.location) where date="2020-11-07";`;
    db.query( query, (err, result) => {
      res.send( result );
    });
  }
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
