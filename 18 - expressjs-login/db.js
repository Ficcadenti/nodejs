const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "nodejs",
  database: "expresstodolist",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: "nodejs",
});

module.exports = pool;
