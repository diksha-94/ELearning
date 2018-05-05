module.exports = {
  registerTeacherQuery: function(schoolId, className, username, emailId, mobileNo, password, name) {
	  var query = "INSERT into admindb.admindetails (schoolid, class, username, emailid, mobileno, password, name) "+
	  		"VALUES ('"+schoolId+"','"+className+"','"+username+"','"+emailId+"','"+mobileNo+"','"+password+"','"+name+"');";
	  return query;
	},
	authTeacherQuery: function(emailId) {
		var query = "SELECT * from admindb.admindetails WHERE emailid = '"+emailId+"';";
		return query;
	},
	checkEmailExistsQuery: function(emailId) {
		var query = "SELECT * from admindb.admindetails WHERE emailid = '"+emailId+"';";
		return query;
	}
};
