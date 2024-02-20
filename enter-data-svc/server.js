require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit-data', (req, res) => {
  const { username, password, data } = req.body;

  // Authenticate user
  axios.post(process.env.AUTH_SERVICE_URL, { username, password })
    .then(authRes => {
      if (authRes.status === 200) {
        // Insert data into MySQL
        db.query('INSERT INTO data_table (data) VALUES (?)', [data], (err, results) => {
          if (err) throw err;
          res.send('Data entered successfully');
        });
      } else {
        res.status(401).send('Authentication failed');
      }
    })
    .catch(err => {
      res.status(500).send('Authentication service error');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`enter-data-svc running on port ${PORT}`);
});
