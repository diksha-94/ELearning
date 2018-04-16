/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboardcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fileSystem = require("fs");

module.exports = {

  /**
   * Gets the recently viewed courses
   */
  find: function (req, res) {
    var dashboard = {};

    try {
      var user = req.param("user");
      var coursesUrl = "repo/courses/courses.json";
      var recentCoursesUrl = "repo/dashboard/recent_"+user+".json";
      var coursesFileExists = fileSystem.existsSync(coursesUrl);
      var recentFileExists = fileSystem.existsSync(recentCoursesUrl);

      if(coursesFileExists) {
        if(recentFileExists) {
          var recentCourses = fileSystem.readFileSync(recentCoursesUrl);
          recentCourses = JSON.parse(recentCourses.toString());
        }

        var courses = fileSystem.readFileSync(coursesUrl);
        courses = JSON.parse(courses.toString());

        var passedCourseCount = 0;
        var coursesCount = courses.length;
        var course = null;
        for(var i=0; i < coursesCount; i++) {
          course = courses[i];

          var fileExists = fileSystem.existsSync("repo/"+course.id+"_"+user+".json");

          if(fileExists) {
            var progress = fileSystem.readFileSync("repo/"+course.id+"_"+user+".json");
            progress = JSON.parse(progress);
            course.metadata = {};
            course.metadata.status = progress.metadata.status;
            course.metadata.testAttempts = progress.metadata.quizAttempts;

            if(progress.metadata.quizPassed) {
              passedCourseCount++;
              course.metadata.testStatus = 2;
            }
            else if(course.metadata.testAttempts !== 0) {
              course.metadata.testStatus = 1;
            }
            else {
              course.metadata.testStatus = 0;
            }

            if(recentCourses.indexOf(course.id) !== -1) {
              course.recent = progress.dateTime;
            }
          }
          else {
            course.metadata = {
              status: 0,
              testAttempts: 0,
              testStatus: 0
            }
          }
        }
      }
    }
    catch(ex) {
      console.log(ex);
    }

    if(passedCourseCount >= 4 && passedCourseCount < 8) {
      dashboard.medal = "bronze";
    }
    else if(passedCourseCount >= 8 && passedCourseCount < 12) {
      dashboard.medal = "silver";
    }
    else if(passedCourseCount >= 12) {
      dashboard.medal = "gold";
    }
    else {
      dashboard.medal = "default";
    }

    dashboard.courses = courses;
    return res.send(dashboard);
  },
  getFurtherReading: function (req, res) {
    var reading = null;

    try {
      var readingUrl = "repo/reading/furtherReading.json";
      var readingFileExists = fileSystem.existsSync(readingUrl);

      if (readingFileExists) {
        reading = JSON.parse(fileSystem.readFileSync(readingUrl));
      }
    }
    catch(ex) {
      console.log(ex);
    }

    return res.send(reading);
  },
  saveFurtherReading: function (req, res) {
  }
};

