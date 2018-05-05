module.exports = {
  registerSchoolQuery: function(schoolName, schoolCode, phoneNumber, emailId, password) {
	  var query = "INSERT into schooldb.schooldetails (schoolname, schoolcode, phonenumber, emailid, password) "+
	  		"VALUES ('"+schoolName+"','"+schoolCode+"','"+phoneNumber+"','"+emailId+"','"+password+"');";
	  return query;
	},
	insertSchoolCodeQuery: function(schoolName, schoolCode) {
	  var query = "INSERT into schooldb.schoolcode (schoolname, schoolcode) "+
	  		"VALUES ('"+schoolName+"','"+schoolCode+"');";
	  return query;
	},
	authSchoolQuery: function(emailId) {
		var query = "SELECT * from schooldb.schooldetails WHERE emailid = '"+emailId+"';";
		return query;
	},
	checkEmailExistsQuery: function(emailId) {
		var query = "SELECT * from schooldb.schooldetails WHERE emailid = '"+emailId+"';";
		return query;
	},
	checkSchoolCodeExistsQuery: function(schoolCode) {
		var query = "SELECT * from schooldb.schooldetails WHERE schoolcode = '"+schoolCode+"';";
		return query;
	},
	getAllSchoolsQuery: function() {
		var query = "SELECT * from schooldb.schoolcode;";
		return query;
	}
};
