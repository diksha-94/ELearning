module.exports = {
  addSubjectQuery: function(adminId, subjectName) {
	  var query = "INSERT into contentdb.subjects (adminid, subjectname) "+
	  		"VALUES ('"+adminId+"','"+subjectName+"');";
	  return query;
	},
	checkSubjectExistsQuery: function(adminId, subjectName) {
		var query = "SELECT * from contentdb.subjects WHERE adminid = '"+adminId+"' AND subjectname = '"+subjectName+"';";
		return query;
	},
	updateSubjectQuery: function(subjectId, subjectName) {
		var query = "UPDATE contentdb.subjects SET subjectname = '"+subjectName+"' WHERE id = '"+subjectId+"';";
		return query;
	},
	checkSubjectExistsByIdQuery: function(subjectId) {
		var query = "SELECT * from contentdb.subjects WHERE id = '"+subjectId+"';";
		return query;
	},
	deleteSubjectQuery: function(subjectId) {
		var query = "UPDATE contentdb.subjects SET deleted = 1 WHERE id = '"+subjectId+"';";
		return query;
	},
	addChapterQuery: function(adminId, subjectId, chapterName, chapterDescription, parent=-1) {
		var query = "INSERT into contentdb.chapters (adminid, subjectid, chaptername, chapterdescription, parent) "+
	  		"VALUES ('"+adminId+"','"+subjectId+"','"+chapterName+"','"+chapterDescription+"','"+parent+"');";
		return query;
	},
	checkChapterExistsQuery: function(adminId, subjectId, chapterName) {
		var query = "SELECT * from contentdb.chapters WHERE adminid = '"+adminId+"' AND subjectid = '"+subjectId+
		 			"' AND chaptername = '"+chapterName+"';";
		return query;
	},
	updateChapterQuery: function(chapterId, chapterName, chapterDesc) {
		var query = "UPDATE contentdb.chapters SET chaptername = '"+chapterName+"', chapterdescription = '"+
					chapterDesc+"' WHERE id = '"+chapterId+"';";
		return query;
	},
	checkChapterExistsByIdQuery: function(chapterId) {
		var query = "SELECT * from contentdb.chapters WHERE id = '"+chapterId+"';";
		return query;
	},
	deleteChapterQuery: function(chapterId) {
		var query = "UPDATE contentdb.chapters SET deleted = 1 WHERE id = '"+chapterId+"';";
		return query;
	}
};
