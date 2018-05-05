/**
 * SchoolController
 *
 * @description :: Server-side logic for managing Schools
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var DBConnection  = require("../database/DBConnection.js");
var sqlQueries  = require("../database/SchoolQueries.js");
var common  = require("../common/generalFunctionality.js");
var statusCode  = require("../common/statusCodes.js");
module.exports = {
  /**
   * `SchoolController.registerSchool()`
   */
	loginSchool: function (req, res) {
		var emailId = req.param("emailid");
		var password = req.param("password");
		var connection;
		var response = {};
		DBConnection.connect(function(con){
			connection = con;
			var schoolAuthQuery = sqlQueries.authSchoolQuery(emailId);
			console.log("query: "+schoolAuthQuery);
			connection.query(schoolAuthQuery, function (err, result) {
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
			var checkEmailExistsQuery = sqlQueries.checkEmailExistsQuery(emailId);
			connection.query(checkEmailExistsQuery, function (err, result) {
			    if (err){
			    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
			    }
			    else if(result.length > 0){
			    	response = common.generateReponse(statusCode.EMAIL_ALREADY_EXISTS, "failure", "This email id is already registered");
			    }
			    else{
			    	var checkSchoolCodeExistsQuery = sqlQueries.checkSchoolCodeExistsQuery(schoolCode);
			    	connection.query(checkSchoolCodeExistsQuery, function (err, result) {
					    if (err){
					    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
					    }
					    else if(result.length > 0){
					    	response = common.generateReponse(statusCode.SCHOOLCODE_ALREADY_EXISTS, "failure", "This school is already registered");
					    }
					    else{
					    	var schoolRegisterQuery = sqlQueries.registerSchoolQuery(schoolName, schoolCode, phoneNumber, emailId, common.passwordEncryption(password));
							console.log("query: "+schoolRegisterQuery);
							connection.query(schoolRegisterQuery, function (err, result) {
							    if (err){
							    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
							    }
							    else{
							    	var schoolCodeInsertQuery = sqlQueries.insertSchoolCodeQuery(schoolName, schoolCode);
									console.log("query: "+schoolCodeInsertQuery);
									connection.query(schoolCodeInsertQuery, function (err, result) {
									    if (err){
									    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
									    }
									    else{
									    	response = common.generateReponse(statusCode.SUCCESS, "success", result.message);
									    }
									});
							    }
							});
					    }
			    	});
			    }
			    res.send(response);
			});
		});
	}
};
