/**
 * TeacherController
 *
 * @description :: Server-side logic for managing Teacher as Admin
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var DBConnection  = require("../database/DBConnection.js");
var sqlQueries  = require("../database/TeacherQueries.js");
var common  = require("../common/generalFunctionality.js");
var statusCode  = require("../common/statusCodes.js");
module.exports = {
  /**
   * `SchoolController.registerSchool()`
   */
	loginTeacher: function (req, res) {
		var emailId = req.param("emailid");
		var password = req.param("password");
		var connection;
		var response = {};
		DBConnection.connect(function(con){
			connection = con;
			var teacherAuthQuery = sqlQueries.authTeacherQuery(emailId);
			console.log("query: "+teacherAuthQuery);
			connection.query(teacherAuthQuery, function (err, result) {
			    if (err){
			    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
			    }
			    else{
			    	if(result.length == 0){
			    		//User doesn't exist
			    		response = common.generateReponse(statusCode.NOT_REGISTERED, "failure", "You are not yet registered");
			    	}
			    	else{
			    		//console.log()
			    		if(result[0].password == common.passwordEncryption(password)){
			    			response = common.generateReponse(statusCode.SUCCESS, "success", "Login successful");
			    		}
			    		else{
			    			response = common.generateReponse(statusCode.INVALID_EMAIL_PASSWORD, "failure", "Invalid email id/password");
			    		}
			    	}
			    }
			    res.send(response);
			});
		});
	},
	
	registerTeacher: function (req, res) {
		var schoolId = req.param("schoolid");
		var className = req.param("classname");
		var username = req.param("username");
		var emailId = req.param("emailid");
		var password = req.param("password");
		var mobileNo = req.param("mobileno");
		var name = req.param("name");
		var connection;
		var response = {};
		DBConnection.connect(function(con){
			connection = con;
			var checkEmailExistsQuery = sqlQueries.checkEmailExistsQuery(emailId);
			connection.query(checkEmailExistsQuery, function (err, result) {
			    if (err){
			    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
			    }
			    else if(result.length > 0){
			    	response = common.generateReponse(statusCode.EMAIL_ALREADY_EXISTS, "failure", "This email id is already registered");
			    }
			    else{
			    	var teacherRegisterQuery = sqlQueries.registerTeacherQuery(schoolId, className, username, emailId, mobileNo, common.passwordEncryption(password), name);
					console.log("query: "+teacherRegisterQuery);
					connection.query(teacherRegisterQuery, function (err, result) {
						if (err){
							response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
						}
						else{
							response = common.generateReponse(statusCode.SUCCESS, "success", result.message);
						}
					});
			    }
				res.send(response);
			});
		});
	}
};
