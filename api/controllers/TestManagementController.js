/**
 *	TestManagementController
 *
 * @description :: Server-side logic for managing Tests (Add/Update/Delete by Admin and display for Students/Users)
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var DBConnection  = require("../database/DBConnection.js");
var sqlQueries  = require("../database/TestManagementQueries.js");
var common  = require("../common/generalFunctionality.js");
var statusCode  = require("../common/statusCodes.js");
module.exports = {
	addUpdateTestDetails: function (req, res) {
		//In add, testId will be 0, else >0
		var testId = req.param("testId");
		console.log(testId);
		var adminId = req.param("adminId");
		var subjectWise = false;
		if(req.param("subjectWise") != undefined){
			subjectWise = req.param("subjectWise");
		}
		var chapterWise = false;
		if(req.param("chapterWise") != undefined){
			chapterWise = req.param("chapterWise");
		}
		var subjectId = 0;
		if(req.param("subjectId") != undefined){
			subjectId = req.param("subjectId");
		}
		var chapterId = 0;
		if(req.param("chapterId") != undefined){
			chapterId = req.param("chapterId");
		}
		var title = req.param("title");
		var noOfQues = req.param("noOfQues");
		var timeLimit = req.param("timeLimit");
		var correctAnsMarks = req.param("correctAnsMarks");
		var wrongAnsMarks = req.param("wrongAnsMarks");
		var passPercentage = req.param("passPercentage");
		var shuffleQues = false;
		if(req.param("shuffleQuestions") != undefined){
			shuffleQues = req.param("shuffleQuestions");
		}
		var shuffleOptions = false;
		if(req.param("shuffleOptions") != undefined){
			shuffleOptions = req.param("shuffleOptions");
		}
		var attemptMultipleTimes = true;
		if(req.param("attemptMultipleTimes") != undefined){
			attemptMultipleTimes = req.param("attemptMultipleTimes");
		}
		var connection;
		var response = {};
		var testQuery = '';
		DBConnection.connect(function(con){
			connection = con;
			if(testId == 0){
				//Add test
				testQuery = sqlQueries.addTestDetailsQuery(adminId, subjectWise, chapterWise, subjectId, chapterId, title, noOfQues, timeLimit, correctAnsMarks, wrongAnsMarks, passPercentage, shuffleQues, shuffleOptions, attemptMultipleTimes);
				connection.query(testQuery, function (err, result) {
					if (err){
					   	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
					}
					else{
					  	response = common.generateReponse(statusCode.SUCCESS, "success", result.message);
					}
					res.send(response);
				});
			} 
			else{
				//Update test
				testQuery = sqlQueries.updateTestDetailsQuery(testId, adminId, subjectWise, chapterWise, subjectId, chapterId, title, noOfQues, timeLimit, correctAnsMarks, wrongAnsMarks, passPercentage, shuffleQues, shuffleOptions, attemptMultipleTimes);
				connection.query(testQuery, function (err, result) {
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
	deleteTestDetails: function (req, res) {
		var testId = req.query.testId;
		var connection;
		var response = {};
		DBConnection.connect(function(con){
			connection = con;
			var query = sqlQueries.deleteTestQuery(testId);
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
	},
	addUpdateQuestion: function (req, res) {
		//quesId will be 0 for add, >0 for update
		var quesId = req.param("quesId");
		var testId = req.param("testId");
		var questionType = req.param("questionType");
		var paragraphText = req.param("paragraphText");
		var quesText = req.param("quesText");
		var optionA = req.param("optionA");
		var optionB = req.param("optionB");
		var optionC = req.param("optionC");
		var optionD = req.param("optionD");
		var correctOption = req.param("correctOption");
		var explanation = req.param("explanation");
		var connection;
		var response = {};
		var questionQuery = '';
		DBConnection.connect(function(con){
			connection = con;
			if(quesId == 0){
				//Add Question
				var questionQuery = sqlQueries.addQuestionToTestQuery(testId, questionType, paragraphText, quesText, optionA, optionB, optionC, optionD, correctOption, explanation);
				connection.query(questionQuery, function (err, result) {
				    if (err){
				    	response = common.generateReponse(statusCode.DB_ERROR, "failure", err);
				    }
				    else{
				    	response = common.generateReponse(statusCode.SUCCESS, "success", result.message);
				    }
				    res.send(response);
				});
		   	}
			else{
				//Update Question
				questionQuery = sqlQueries.updateQuestionInTestQuery(quesId, testId, questionType, paragraphText, quesText, optionA, optionB, optionC, optionD, correctOption, explanation);
				connection.query(questionQuery, function (err, result) {
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
	deleteQuestion: function (req, res) {
		var quesId = req.query.quesId;
		var connection;
		var response = {};
		DBConnection.connect(function(con){
			connection = con;
			var query = sqlQueries.deleteQuestionQuery(quesId);
			console.log(query);
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
