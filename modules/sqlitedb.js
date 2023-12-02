const sqlite3 = require('sqlite3');


const db = new sqlite3.Database('./db/sakila.db');


function fngetAlltables() {
    
   var tables=[]; 

//Retrieving All Rows
db.all("SELECT name FROM sqlite_master WHERE type = 'table'", (error, rows) => {
    rows.forEach((row) => {
        //console.log(row.name);
        tables.push(row.name)
    })
});
console.log(tables)
return tables;
}

// DatabaseManager class for managing the SQLite database connection
class DatabaseManager {
    constructor(dbFilePath) {
      this.db = new sqlite3.Database(dbFilePath);
    }
  
    getAllDataFromTable(tableName, callback) {
     // const query = `SELECT * FROM ${tableName}`;
     const query ="SELECT name FROM sqlite_master WHERE type = 'table'";
      this.db.all(query, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows);
        }
      });
    }
  
    closeConnection() {
      this.db.close();
    }
  }


module.exports={fngetAlltables,DatabaseManager}