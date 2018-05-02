/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var DBConnection  = require("../database/DBConnection.js");
var sqlQueries  = require("../database/SchoolQueries.js");
var common  = require("../common/generalFunctionality.js");
module.exports = {
  /**
   * `SchoolController.registerSchool()`
   */
	registerSchool: function (req, res) {
		var schoolName = req.param("schoolname");
		var schoolCode = req.param("schoolcode");
		var phoneNumber = req.param("phonenumber");
		var emailId = req.param("emailid");
		var password = req.param("password");
		var connection;
		var response = {};
		DBConnection.connect(function(con){
			connection = con;
			var schoolRegisterQuery = sqlQueries.registerSchoolQuery(schoolName, schoolCode, phoneNumber, emailId, common.passwordEncryption(password));
			console.log("query: "+schoolRegisterQuery);
			connection.query(schoolRegisterQuery, function (err, result) {
			    if (err){
			    	response.status = "failure";
			    	response.message = err;
			    }
			    else{
			    	response.status = "success";
			    	response.message = result.message;
			    	response.affectedRows = result.affectedRows;
			    	response.insertId = result.insertId;
			    }
			    res.send(response);
			});
		});
	}
};
