var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'smartant'
});

connection.connect();

connection.query('SELECT * from nodejs.customer', function(err, rows, fields) {

if (err) throw err;
	for (var i = 0; i < rows.length; i++) {
		console.log('Name:'+ rows[i].name+ " email:"+rows[i].email);
	}
	
});

connection.end();
