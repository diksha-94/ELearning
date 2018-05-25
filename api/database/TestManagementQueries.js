module.exports = {
	addTestDetailsQuery: function(adminId, subjectWise, chapterWise, subjectId, chapterId, title, noOfQues, timeLimit, correctAnsMarks, wrongAnsMarks, passPer, shuffleQues, shuffleOptions, attemptMultipleTimes) {
	  var query = "INSERT into testsdb.testdetails (adminid, subjectwise, chapterwise, subjectid, chapterid, title, no_of_ques, time_limit, correct_ans_marks, wrong_ans_marks, passing_percentage, shuffle_ques, shuffle_options, attempt_multiple_times, active) VALUES( "+
	  				+adminId+", '"+subjectWise+"', '"+chapterWise+"', '"+subjectId+"', '"+chapterId+"', '"+title+"', '"+noOfQues+"', '"+timeLimit+"', '"+correctAnsMarks+"', '"+wrongAnsMarks+"', '"+passPer+"', '"+shuffleQues+"', '"+shuffleOptions+"', '"+attemptMultipleTimes+"', 'true');";
	  return query;
	},
	updateTestDetailsQuery: function(id, adminId, subjectWise, chapterWise, subjectId, chapterId, title, noOfQues, timeLimit, correctAnsMarks, wrongAnsMarks, passPer, shuffleQues, shuffleOptions, attemptMultipleTimes) {
		  var query = "UPDATE testsdb.testdetails SET adminid = '"+adminId+"',subjectwise = '"+subjectWise+"',chapterwise = '"+chapterWise+"',subjectid = '"+subjectId+"',chapterid = '"+chapterId+"',title = '"+title+
		  			"',no_of_ques = '"+noOfQues+"',time_limit = '"+timeLimit+"',correct_ans_marks = '"+correctAnsMarks+"',wrong_ans_marks = '"+wrongAnsMarks+"',passing_percentage = '"+passPer+"',shuffle_ques = '"+shuffleQues+
		  			"',shuffle_options = '"+shuffleOptions+"',attempt_multiple_times = '"+attemptMultipleTimes+"',active = 'true' WHERE id = '"+id+"';";
		  return query;
	},
	checkTestExistsQuery: function(testId) {
		var query = "SELECT * from testsdb.testdetails WHERE id = '"+testId+"';";
		return query;
	},
	deleteTestQuery: function(testId) {
		var query = "UPDATE testsdb.testdetails SET active = 'false' WHERE id = '"+testId+"';";
		return query;
	},
	addQuestionToTestQuery: function(testId, questionType, paragraphText, quesText, optionA, optionB, optionC, optionD, correctOption, explanation) {
		var query = "INSERT INTO testsdb.questions (testid, questiontype, paragraphtext, questiontext, optiona, optionb, optionc, optiond, correctoption, explanation, active) "+
		"VALUES ('"+testId+"','"+questionType+"','"+paragraphText+"','"+quesText+"','"+optionA+"','"+optionB+"','"+optionC+"','"+optionD+"','"+correctOption+"','"+explanation+"','true');";
		return query;
	},
	updateQuestionInTestQuery: function(quesId, testId, questionType, paragraphText, quesText, optionA, optionB, optionC, optionD, correctOption, explanation) {
		var query = "UPDATE testsdb.questions SET testid = '"+testId+"',questiontype = '"+questionType+"',paragraphtext = '"+paragraphText+"',questiontext = '"+quesText+"',optiona = '"+optionA+"',optionb = '"+optionB+
			"',optionc = '"+optionC+"',optiond = '"+optionD+"',correctoption = '"+correctOption+"',explanation = '"+explanation+"',active = 'true' WHERE id = '"+quesId+"';";
		return query;
	},
	checkQuestionInTestQuery: function(quesId) {
		var query = "SELECT * from testsdb.questions WHERE id = '"+quesId+"';";
		return query;
	},
	deleteQuestionQuery: function(quesId) {
		var query = "UPDATE testsdb.questions SET active = 'false' WHERE id = '"+quesId+"';";
		return query;
	}
};
