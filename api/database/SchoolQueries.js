module.exports = {
  registerSchoolQuery: function(schoolName, schoolCode, phoneNumber, emailId, password) {
	  var query = "INSERT into schooldb.schooldetails (schoolname, schoolcode, phonenumber, emailid, password) "+
	  		"VALUES ('"+schoolName+"','"+schoolCode+"','"+phoneNumber+"','"+emailId+"','"+password+"');";
	  return query;
	}
};
