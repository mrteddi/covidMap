const express = require('express');
const app = express();
const mysql = require('mysql');
const dbConfig = require('./config.json');

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

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
