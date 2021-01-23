var mysql = require("mysql");
var db;

function connectDatabase() {
  if (!db) {
    db = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
      dateStrings: "Date",
    });

    db.connect(function (err) {
      if (!err) {
        console.log("Database is connected!");
      } else {
        console.log("Error connecting database!");
      }
    });
  }
  return db;
}

module.exports = connectDatabase();
