var express = require('express');
var app = express();
var db=require("./modules/sqlitedb")
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// use res.render to load up an ejs view file

// index page
app.get('/about', function(req, res) {
  var mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/sqleditor', {
    mascots: mascots,
    tagline: tagline
  });
});

// about page
app.get('/', function(req, res) {
    
// Create an instance of DatabaseManager
const dbManager = new db.DatabaseManager('./db/sakila.db'); // Replace with your actual database file path
const tableName = 'your_table_name'; 

 // Call the method to get all data from the specified table
 dbManager.getAllDataFromTable(tableName, (err, data) => {
    if (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
        console.log(data);
        res.render('pages/index',{ tablelist: data});
    }
  });
});


//    var tables= db.fngetAlltables();
//    console.log(tables);
//   res.render('pages/sqleditor',{ tablelist: tables});
// });

app.listen(8080);
console.log('Server is listening on port 8080');