const express = require('express');
const mysql = require('mysql');
const app = express();

// MySQL connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// EJS template engine
app.set('view engine', 'ejs');

// Body parser middleware
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit-data', (req, res) => {
  // Extract data from the form
  const data = req.body;
  
  // Insert data into the MySQL database
  connection.query('INSERT INTO data_table SET ?', data, (error, results, fields) => {
    if (error) throw error;
    res.send('Data submitted successfully!');
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

