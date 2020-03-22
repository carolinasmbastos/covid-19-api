const mysql = require('mysql');
require('dotenv').config();

const connectionPool = mysql.createPool({
  
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
  connectionLimit: 10,
  multipleStatements: true
});

exports.cp = connectionPool;
