/**
 * COntentManagementController
 *
 * @description :: Server-side logic for managing Content (Add/Update/Delete by Admin and display for Students/IUsers)
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var DBConnection  = require("../database/DBConnection.js");
var sqlQueries  = require("../database/ContentManagementQueries.js");
var common  = require("../common/generalFunctionality.js");
var statusCode  = require("../common/statusCodes.js");
module.exports = {
	addUpdateSubject: function (req, res) {
		var adminId = req.param("adminId");
		var subjectName = req.param("subjectName");
		//subjectId will be 0 in case f add, other than 0 in case of update
		var subjectId = req.param("subjectId");
		var connection;
		var response = {};
		var subjectQuery = '';
		DBConnection.connect(function(con){
			connection = con;
			if(subjectId == 0){
				//Add subject
				var checkSubjectQuery = sqlQueries.checkSubjectExistsQuery(adminId, subjectName);
				console.log("query: "+checkSubjectQuery);
				connection.query(checkSubjectQuery, function (err, result) {
				    if (err){
				    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
				    }
				    else{
				    	if(result.length > 0){
				    		//Subject doesn't exist
				    		response = common.generateReponse(statusCode.SUBJECT_EXIST, "failure", "Subject Already exists");
				    		res.send(response);
				    	}
				    	else{
				    		subjectQuery = sqlQueries.addSubjectQuery(adminId, subjectName);
				    		connection.query(subjectQuery, function (err, result) {
							    if (err){
							    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
							    }
							    else{
							    	response = common.generateReponse(statusCode.SUCCESS, "success", result.message);
							    }
							    res.send(response);
							});
				    	}
				    }
				});
			}
			else{
				//Update Subject
				subjectQuery = sqlQueries.updateSubjectQuery(subjectId, subjectName);
				connection.query(subjectQuery, function (err, result) {
				    if (err){
				    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
				    }
				    else{
				    	response = common.generateReponse(statusCode.SUCCESS, "success", result.message);
				    }
				    res.send(response);
				});
			}
		});
	},
	deleteSubject: function (req, res) {
		var subjectId = req.query.subjectId;
		var connection;
		var response = {};
		DBConnection.connect(function(con){
			connection = con;
			var query = sqlQueries.deleteSubjectQuery(subjectId);
			connection.query(query, function (err, result) {
			   if (err){
				   response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
			   }
			   else{
				   response = common.generateReponse(statusCode.SUCCESS, "success", result.message);
			   }
			   res.send(response);
			});
		});
	}
};
