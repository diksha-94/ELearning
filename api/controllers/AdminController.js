/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fileSystem = require('fs');

module.exports = {



  /**
   * `AdminController.getCourseResults()`
   */
  getCourseResults: function (req, res) {
    var courseId = req.param("courseId");
    res.send(getResultsForCourse(courseId));
  }
};

function getResultsForCourse(courseId) {
  var retVal = [];
  var files = fileSystem.readdirSync("repo");

  files
    .forEach(function (file) {
      if(file.startsWith(courseId)) {
        var progress = fileSystem.readFileSync("repo/" + file);
        progress = JSON.parse(progress);

        retVal.push({
          userId: getUserId(file),
          quizAttempts: progress.metadata.quizAttempts,
          quizPassed: progress.metadata.quizPassed !== null ? progress.metadata.quizPassed ? "Yes" : "No" : "N.A.",
          quizPercentage: progress.metadata.quizPassed !== null ? progress.metadata.quizPercentage + "%" : "N.A."
        });
      }
    });

  return retVal;
}

function getUserId(file) {
  var primarySplit = file.split('_');
  return primarySplit[primarySplit.length-1].split('.')[0];
}

