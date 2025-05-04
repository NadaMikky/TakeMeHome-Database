const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql-edcf05-take-me-home.l.aivencloud.com',
  port: 15398,
  user: 'avnadmin',
  password: 'AVNS_CPA5OmNrKwBD2xMko_a',
  database: 'defaultdb',
  ssl: {
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;