var mysql = require('mysql');

module.exports = {
  connect: function(callback) {
	  var con = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  port: 3306
		});

		con.connect(function(err){
			if(err)
				throw err;
			return callback(con);
		});
	}
};
